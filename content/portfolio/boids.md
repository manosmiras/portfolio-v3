---
title: 'Boids'
description: 'A 3D boids simulation utilising an octree, built with Godot and C#.'
headerImg: '/img/boids/header.webp'
previewImg: '/img/boids/header.webp'
tags: [Godot, C#, Spatial Partitioning, Multithreading]
repositoryUrl: https://github.com/manosmiras/Boids
order: 2
outline: 'deep'
---

## About
A 3D Boids simulation I built over the course of a few weeks, exploring emergent behavior through simple agent rules like cohesion, separation, and alignment.

## Boids
I began by studying Craig Reynolds’ boids and several implementations, I found this
<a href="https://processing.org/examples/flocking.html" target="_blank">processing</a> example especially easy to read, which I then translated into C#.

The processing implementation used a "wraparound", where boids leaving one edge of the screen would appear on the opposite side, I didn't want that effect
as I wanted the simulation to look like an aquarium with fish, so I defined a 3D bounding box. When boids reach the edges of the bounding box, 
their velocity is negated, keeping them within bounds.

After getting the boids simulation to work, I wasn't happy with the performance, as the simulation could barely handle 500 boids with a stable frame rate, 
so my first instinct was to make the code multithreaded. Luckily, the code was mostly driven by a for loop, 
so it was simply a case of replacing that with a `Parallel.For`.

## Octree
Neighbour queries are the main bottleneck of the simulation, for each boid, you need nearby boids to compute cohesion, separation, and alignment.

I introduced an octree to spatially partition the simulation volume. By recursively subdividing the simulation space into eight smaller regions (octants), 
the octree allows for efficient spatial queries. Instead of comparing every boid against every other boid, each boid can now query only the nearby nodes of the octree, 
significantly reducing the number of distance checks.

To find neighbouring boids, I perform a box-shaped range search: the octree traverses only nodes that intersect the query AABB and returns nearby candidates.
This greatly reduces unnecessary distance checks, turning global comparisons into localized queries that scale much more efficiently.

## Showcase
<iframe class="w-full aspect-video" width="960" height="540" src="https://www.youtube.com/embed/ElUlgvekJLQ?si=1rkn6iKPuMTbU6bG" title="Godot Boids" allowfullscreen></iframe>

## Conclusion
In the end, the boids simulation can comfortably handle 1000 boids, running at a stable 9ms on average ~(111 FPS) on my machine.
You can find an executable of the simulation <a href="https://github.com/manosmiras/Boids/releases/tag/v1.0.0" _target="blank">here</a>.

If I were to pick up this project again, I would like to move the simulation into a 
<a href="https://docs.godotengine.org/en/latest/tutorials/shaders/compute_shaders.html" _target="blank">compute shader</a>.