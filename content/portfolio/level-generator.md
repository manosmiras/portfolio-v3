---
title: 'Level Generator'
description: "Procedural generation of levels using genetic algorithms in Unity."
headerImg: '/img/level-generator/header.png'
previewImg: '/img/level-generator/header.png'
tags: [Unity, C#, Genetic Algorithms, Procedural Generation]
repositoryUrl: https://github.com/manosmiras/Level-Generator
order: 2
outline: 'deep'
---

## About
This was a research project as part of my honours degree where I implemented and evaluated the performance of 5 genetic algorithms, using a rigorous experimental approach, which involved running each genetic algorithm with variations to it's parameters multiple times and performing T-tests on each data set.

## Features
### Genetic Algorithms
- Simple Genetic Algorithm (SGA)
- Feasible Infeasible two Population Genetic Algorithm (FI-2Pop GA)
- Novelty Search (NS)
- Minimal Criteria Novelty Search (MCNS)
- Feasible Infeasible Novelty Search (FINS)

### A* Pathfinding
I worked on a custom implementation of the A* pathfinding algorithm, which was used as part of the level evaluation process. The genetic algorithms were not specifically guided to create levels which have a path between the start and end of the level, so an important aspect of the evaluation process was to determine if each level can be completed.

### Custom Editor Windows
I made two custom editor windows to help visualize the levels being generated from the genetic algorithms.
#### Fitness Visualizer Editor
The fitness visualizer editor window is a chart that is used to visualize the current fitness of each level that is being evaluated.
![Fitness Visualizer Editor](/img/level-generator/fitness-visualizer.png)
#### Graph Editor
The graph editor window is used to display each section of a level and the connections it has to other sections.
![Graph Editor](/img/level-generator/graph-editor.png)

## How it works

### Genetic Represantation
When using genetic algorithms to solve a problem, it is important to determine the genetic representation of the individual solutions, in my case this is the data structure(s) I will be using to represent the generated levels. The levels being generated are based on a grid, with each piece in the level taking up approximately the same amount of space, allowing for them to be easilly attached with each other. The generated levels consist only of one floor, so there is no verticality involved. This information is enough to figure out how to represent each level.

As far as the genetic algorithms are concerned, each level in the project is a list of objects which have a position, rotation and piece type.

```
public class LevelPiece 
{
    public Type type;
    public Vector2 position;
    public float rotation;
}
```
Since each level piece will be placed at the same height, we only need to keep track of the X and Z values, so a Vector2 is enough. The rotation is in euler angles and is restricted to values of: 0, 90, 180, 270.

The level piece types are:
```
public enum Type 
{
    Cross,
    T_Junction,
    Hall,
    Corner,
    Room1,
    Room2,
    Room3,
    Room4,
    Cross_Trap,
    T_Junction_Trap,
    Hall_Trap,
    Corner_Trap,
    Room1_Trap,
    Room2_Trap,
    Room3_Trap,
    Room4_Trap
}
```
Each level can then be represented as:
```
public class Individual 
{
    public List<LevelPiece> levelPieces;
}

```
Level Pieces in their 3D form:
![Level Pieces](/img/level-generator/level-pieces.webp)
Level Pieces with Traps in their 3D form:
![Level Pieces With Traps](/img/level-generator/level-pieces-traps.webp)

### Genetic Algorithm Breakdown
Each genetic algorithm goes through the following phases when generating levels:

1. [Generating The Population](#generating-the-population)
2. [Evaluating Levels](#evaluating-levels)
3. [Selection](#selection)
4. [Crossover](#crossover)
5. [Mutation](#mutation)

These steps are repeated in a loop, until either the user terminates the genetic algorithm manually, or a predetermined number of generations have passed.

#### Generating The Population
The population is a list of all the individuals (levels) which have been generated.

```
public class Population
{
    public List<Individual> individuals;
}
```

Initially, the population is populated with random individuals, what this means is that for each level, we generate a specified number of level pieces with a random type and rotation, at each position of the grid.

Once the starting population has been generated, we can advance the generation of individuals by 1, so we can then start performing operations which combine the existing population of levels into new ones.

#### Evaluating Levels
Once the genetic algorithm has an Individual ready to be evaluated, the genetic representation of each level needs to be translated into a series of GameObjects, so it can be displayed in Unity. This process is quite straight forward, the code I have written iterates through all of the level pieces in an individual and spawns the corresponding prefab as a GameObject, with the appropriate position and rotation.

After an individual has been converted to a 3D level in Unity, it's ready to be evaluated. Each level is evaluated using a fitness function, which takes into account 3 factors:

- **Path Fitness**: The shortest path cost of moving a unit from the start of the level to the end of the level, using the A* Implementation.
- **Connectivity Fitness**: The number of level pieces which have a connection to other level pieces.
- **2-Vertex Connectivity Fitness**: The number of level pieces which have 2 connections to other level pieces.

These 3 values are calculated, normalized, and combined into a single value, which is used as the fitness for each level.

#### Selection
Selection is the stage of the genetic algorithm where individuals are selected from a population, in order to be assigned as parents for the generation of a new individual. I have implemented a selection strategy called **Tournament Selection**.

Tournament selection involves running several "tournaments" among a few individuals, chosen at random from the population. The winner of each tournament, which is determined based on it's fitness value, is then selected for the crossover process.

```
    Individual TournamentSelection(Population pop)
    {
        // Create a tournament population
        Population tournamentPopulation = new Population();

        // For each place in the tournament get a random individual
        for (int i = 0; i < tournamentSize; i++)
        {
            int randomId = Random.Range(0, pop.Size());
            tournamentPopulation.Add(Utility.DeepClone(pop.individuals[randomId]));
        }
        // Get the fittest
        Individual fittest = tournamentPopulation.GetFittest();

        return fittest;
    }
```

#### Crossover
Crossover is a genetic operator used to combine the genetic information of two parents to generate new offspring, in my case this means taking two levels and combining them into a new one, this is done by instantiating a new **Individual** object and copying over level pieces from the two parent individuals. I have implemented three types of crossover operations:

- **Single Point**: Creates a new level by copying 50% of the level pieces from parent A and then the remaining 50% from parent B.
- **Uniform**: Creates a new level by iterating through the level pieces from both parents and selecting one at random each time, with a slight bias that favors pieces from the fitter individual.
- **Hybrid**: Single point crossover but switching to uniform crossover every 3 generations.

#### Mutation
Mutation is a genetic operator used to maintain genetic diversity of the individuals of the population. Each individual has a chance to be mutated each generation, which in practice would mean having a level piece rotated or it's type changed. 

```
    void MutateRotation(LevelPiece levelPiece)
    {
        // Select a random rotation between 0, 90, 180, 270 degrees
        float rotation = Random.Range(0, 4);
        // Keep rotating until value is different
        while (rotation * 90f == levelPiece.rotation)
        {
            rotation = Random.Range(0, 4);
        }
        rotation *= 90f;
        levelPiece.rotation = rotation;
    }

    void MutateLevelPiece(LevelPiece levelPiece, int i)
    {
        // Select random room type
        int roomType = Random.Range(0, 16);
        // Keep changing piece until it's different
        while ((LevelPiece.Type)roomType == levelPiece.type)
        {
            roomType = Random.Range(0, 16);
        }
        // No traps allowed on start and end of level
        if (i == 0 || i == genomeLength - 1)
            roomType = Random.Range(0, 8);

        levelPiece.type = (LevelPiece.Type)roomType;
    }
```

## Project Conclusion
I found that the SGA implementation is capable of producing better overall levels than the other techniques, while the FI-2Pop GA is the technique that manages to produce high quality levels more consistently.