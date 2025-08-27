---
title: 'Alien Marsh'
description: 'A 3D scene built using C++ and OpenGL.'
headerImg: '/img/alien-marsh/header.webp'
previewImg: '/img/alien-marsh/header.webp'
tags: [Graphics Programming, C++, OpenGL, GLSL]
repositoryUrl: https://github.com/manosmiras/Alien-Marsh
order: 4
outline: 'deep'
---

## About
The purpose of this project was to create a scene using C++, OpenGL and GLSL, that demonstrates the fundamental understanding of graphical concepts such as: creating geometry, lighting, applying transformations, texturing, cameras and post processing effects.

## Features
- Cameras (Free, Target)
- Lighting (Directional, Spot, Point)
- Procedural Terrain Generation
- Procedural Grass Generation
- Skybox
- Fog
- Water
- Scene Graph
- Normal Maps
- Post Processing

## Lighting
Every mesh in the scene is lit using a phong shading model except for a single mesh, that uses gouraud shading, in order to demonstrate the difference between the two. The combined lighting of the scene is calculated using the Ambient, Diffuse and Specular values.
![Combined Lighting](/img/alien-marsh/combined-lighting.webp)

I implemented three different types of light:
- Directional light, which is used to represent light emitting from a far away direction (i.e. the sun).
- Spot light, which represents light that has a specific source and is coming from a specific direction.
- Point light, which represents a light emitting from a single point, expanding in every direction.

## Procedural Terrain Generation
The terrain in the scene is generated using a heightmap.
![Heightmap](/img/alien-marsh/heightmap.webp)

The heightmap image is read and the following values are generated:
- Position geometry
- Normals
- Texture Coordinates
- Texture Weights

## Procedural Grass Generation
![Grass](/img/alien-marsh/grass.webp)
I used a billboarded quad mesh to fill the scene with grass, each quad is placed above a certain threshold on the terrain. Each quad mesh is processed in the fragment shader, and calculates if the grass texture will be applied or discarded on the current pixel, according to a blend map.
![Grass Textures](/img/alien-marsh/grass-textures.webp)

## Skybox
The skybox is made up of a cube with flipped faces, it requires 6 textures, one for each face. It's scaled by a value of 100 so it appears far away and it's position is updated to follow the camera in the scene.
![Skybox](/img/alien-marsh/skybox.webp)

## Fog
I used fog to enhance the perception of distance by shading distant objects differently. I implemented three different types of Fog:
- Linear Fog
- Exponential Fog
- Exponential Squared Fog

## Water
The water is a sub-divided plane, which uses a shader with the following functionality: simple texturing, normal mapping, transparency and sine based vertex position offset.
![Water](/img/alien-marsh/water.webp)

## Scene Graph
A scene graph is a data structure commonly used to arrange the logical and spatial representation of a graphical scene. In my case it is a collection of nodes, each node consists of the following attributes:
- Local Transformation Matrix
- World Transformation Matrix
- Mesh
- Texture
- Children Nodes

## Normal Maps
Normal mapping is a texture mapping technique used for faking the lighting of bumps and dents, which adds more details without the use of extra polygons. I used Normal maps in some of the objects in the scene in order to simulate extra surface detail.
![Normal Map](/img/alien-marsh/normal-map.webp)

## Post Processing
### Greyscale
The greyscale effect is produced in the fragment shader, it's a simple calculation consisting of the current pixel's color multiplied by a Vector3 constant.
```
greyscale = Vector3(0.299, 0.587, 0.184) * color;
```
![Greyscale](/img/alien-marsh/greyscale.webp)
### Vignette
The vignette effect is achieved by mixing the frame buffer's current frame with a mask texture, the mask texture is a faded transparent circle surrounded by a plain black color.
![Vignette](/img/alien-marsh/vignette.webp)
### Depth of Field
The depth of field effect uses a depth sample in order to calculate distances between the camera and objects in the scene, any object over a certain threshold gets blurred.
### Motion Blur
The motion blur effect uses two different frame buffers, which contain the previous and the current frame. An interpolation value is used to mix the two, with the result being rendered on screen.
```
color = mix(sample1, sample2, blendFactor);
```


<!-- ## Video
Video goes here

## Screenshots
Screenshots go here -->