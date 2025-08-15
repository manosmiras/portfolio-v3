---
title: 'Bridge Physics'
description: 'A physics driven bridge simulation.'
headerImg: '/img/bridge-physics/header.webp'
previewImg: '/img/bridge-physics/header.webp'
tags: [Physics Based Animation, C++, OpenGL, GLSL]
repositoryUrl: https://github.com/manosmiras/Bridge-Physics
order: 4
outline: 'deep'
---

## About
The purpose of this project was to develop a scene that demonstrates my understanding of physics based animation systems. I decided I was going to simulate a rope bridge, using a mass-spring system, where a collection of particles are interconnected, applying forces to each other. The user can interact with the bridge physics via a GUI or a controllable 'player' sphere.

## Features
- [Entity Component Architecture](#entity-component-architecture)
- [Mass Spring System](#mass-spring-system)
- [Verlet integration](#verlet-integration)
- [Collision Detection](#collision-detection)
- [Collision Resolution](#collision-resolution)
- [Bridge](#bridge)
- [GUI](#gui)

## Entity Component Architecture
I used a type of entity component architecture to represent all the objects in the scene. Entities contain only some basic information about the object.

```
class Entity {
protected:
  bool visible_;
  std::string name_;
  bool changed_;
  glm::vec3 scale_;
  glm::vec3 position_;
  glm::quat rotation_;
  glm::mat4 transform_;
  std::vector<std::unique_ptr<Component>> components_;
  ...
}
```

Each entity can have various components attached to them in order to expand their behaviour.

```
class Component {
protected:
  Entity *Ent_;
  bool active_;

public:
  std::string token_;
  Component(const std::string &token);
  virtual ~Component();
  virtual void Update(double delta){};
  virtual void Render(){};
  bool IsActive();
  void SetActive(bool b);
  virtual void SetParent(Entity *p);
  Entity *GetParent() const;
};
```

This architecture is similar to an Entity Component System, however there are no systems here, each component provides it's own behaviour, and each entity keeps track of attached components, updating them when necessary.

The simulation has the following components:
- **ShapeRenderer**, which will render entities as either Spheres or Cubes.
- **Physics**, which allows for physics-based behaviour on entities, keeping track and calculating forces, velocity etc.
- **Particle**, which represents a particle in the mass spring system.
- **Plank**, which is used to render a plank between interconnected particles.

## Mass Spring System
I used a Mass Spring System, to create a system of interconnected particles, the **ParticleSpring** class represents a particle in the mass spring system. 

```
class ParticleSpring
{
	/** The particle at the other end of the spring. */
	cPhysics *other;
	float springConstant;
	float restLength;
public:
	ParticleSpring(cPhysics *other, float springConstant, float restLength);
	ParticleSpring();
	/** Applies the spring force to the given particle. */
	virtual void updateForce(cPhysics *particle, float duration);
};
```

## Bridge
![Bridge Diagram](/img/bridge-physics/bridge-diagram.webp)

### Initialization
The particles are initialized in 2 straight lines, forming the basis of the bridge.

```
// Left rope entity list
static vector<unique_ptr<Entity>> rope1;
// Right rope entity list
static vector<unique_ptr<Entity>> rope2;


// Create 2 straight lines of particles, with their respective physics, render and collider components
	for (int i = 0; i < theSize; i++)
	{
		rope1.push_back(move(rope::CreateParticle(i, 30, 0, true, 2)));
		rope2.push_back(move(rope::CreateParticle(i, 30, 10, true, 2)));
	}
```
Then, the particles from each rope are connected to the other side, forming pairs.

```
for (int i = 0; i < rope1.size(); i++)
	{
		// RIGHT ROPE
		auto b = rope1[i].get()->GetComponents("Physics");
		auto p = static_cast<cPhysics *>(b[0]); // Get physics component

		ps = ParticleSpring(p, 60.0f, 5.5f);

		springs.push_back(ps);

		// ROPES INBETWEEN
		ps = ParticleSpring(p, 0.5f, 10.0f);
		springsInbetween.push_back(ps);

		// LEFT ROPE
		auto b2 = rope2[i].get()->GetComponents("Physics");
		auto p2 = static_cast<cPhysics *>(b2[0]); // Get physics component

		ps = ParticleSpring(p2, 60.0f, 5.5f);
		springs2.push_back(ps);
	}
```

### Update Loop

```
for (int i = 0; i < springs.size() - 1; i++)
{
    // Get physics component for each particle on left rope
    auto b = rope1[i].get()->GetComponents("Physics");
    auto p = static_cast<cPhysics *>(b[0]);

    // Update spring force
    springs[i + 1].updateForce(p, 1.0f);

    // Get physics component for each particle on right rope
    auto b2 = rope2[i].get()->GetComponents("Physics");
    auto p2 = static_cast<cPhysics *>(b2[0]);

    // Update spring force
    springs2[i + 1].updateForce(p2, 1.0f);
    // Update spring force
    springsInbetween[i+1].updateForce(p2, 1.0f);
}
```

## Verlet Integration
I used Verlet Integration to simulate all the forces in the simulation. Verlet Integration performs very well when compared to alternatives, such as RK4 Integration, however the main drawback is that it can be far less accurate and unstable when it comes to simulating mass spring systems. Due to time constraints, I was unable to implement and compare the two.

## Collision Detection
The simulation uses only primitives, these are: planes, spheres and cubes, with this information I decided I only needed the following collision types:
- Plane Colliders
- Sphere Colliders
- AABB Colliders

All the colliders inherit from the **cCollider** class, which is a type of Component.

### Collider Component
```
class cCollider : public Component {
public:
  cCollider(const std::string &tag);
  ~cCollider();
  void Update(double delta);
};
```

### Plane Collider Component
```
class cPlaneCollider : public cCollider {
public:
  glm::dvec3 normal;
  cPlaneCollider();
  ~cPlaneCollider();
};
```

### Sphere Collider Component
```
class cSphereCollider : public cCollider {

public:
  double radius;
  cSphereCollider();
  ~cSphereCollider();
};
```
### AABB Collider Component
```
class cAABB: public cCollider {
public:
    glm::dvec3 centerPoint;
    double radius[3]; // Halfwidth extents (dx, dy, dz)
    cAABB();
    cAABB(glm::dvec3 centerPoint, double radius[3]);
    ~cAABB();
}
```
AABB colliders were chosen over OBB colliders, as the simulation does not support rigid body dynamics, meaning objects wouldn't have a way to rotate as a reaction to a collision.

## Collision Resolution
When the simulation has detected a collision, it's resolved by applying forces to the entities that collided, using information from the **collisionInfo** struct.
```
struct collisionInfo {
  const cCollider *c1;
  const cCollider *c2;
  const glm::dvec3 position;
  const glm::dvec3 normal;
  const double depth;
};
```

## GUI
I used ImGui to develop a simple user interface so the user can control some aspects of the scene and simulation.

![ImGui](/img/bridge-physics/imgui.webp)

### GUI Functionality
- FPS: Displays the frames per second.
- Switch scenes: Switches between the bridge and the rope scene.
- Change camera position: Changes the camera to a different pre-determined position.
- Draw lines: Toggle that draws lines between connected particles in the mass spring system.
- Draw particles: Toggle that draws particles in the mass spring system.
- Rope damping force: Slider that allows control of the damping force value in the simulation.
- Player mass: The mass of the player controlled sphere that interacts with the bridge.
- Enable/Disable Collisions: Toggle that enables and disables collisions in the simulation.
- Reset Player: Resets the player controlled sphere's position.
