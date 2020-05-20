# Final Project - A* Canvas Pathfinder
Szabó Attila - XKQCNV

Course: ***DUEN-ISR-010***

# Application type:

![Application type](https://dl.dropboxusercontent.com/s/i2cmrf2ftrzin0d/devenv_xcjWH2Q8Fs.png)

A Pathfinder algorithm that creates a path between the start/ending point

# Steps to install:
1. Download the latest [Microsoft Visual Studio](https://visualstudio.microsoft.com/)
2. (optionally) use [TortoiseGit](https://tortoisegit.org/) to download the repository.
Or just simply download all the files in this repo.
4. Open the project **TaskBeadandoXKQCNV.sln** with Visual Studio
5. Build the project

![](https://dl.dropboxusercontent.com/s/6xz3ti5bajzmq06/firefox_ptcSggMW8e.png)

# Usage:
Draw on the map, create a maze, press *Create path* to calculate a path between the start and end point.

# Known bugs/problems:
1. Canvas scale is small, because It is per-pixel based.
2. Default map scale is small, because larger maps doesn't have good preformance.
3. Lots of usage of F# mutable.
