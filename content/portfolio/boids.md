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
To handle large numbers of agents efficiently, I implemented an octree-based spatial partitioning system that accelerates neighbor lookups and allows the flock to scale smoothly without major performance drops.