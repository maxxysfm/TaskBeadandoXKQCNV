namespace TaskBeadandoXKQCNV

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html
open WebSharper.Html.Client

[<JavaScript>]
module Radius =
       

    // Végeredménye a függvénynek azok a képpontok lesznek, ahova rajzolni kell majd
    let RadiusCheck(locX:int,locY:int,lengthX:int,lengthY:int,radius:int) =
        
        // oof
        let mutable minX = 0
        let mutable minY = 0
        let mutable maxX = 0
        let mutable maxY = 0

        if (locX - radius) < 0 then
            
            minX <- 0

        else
            
            minX <- (locX - radius)

        if (locY - radius < 0) then

            minY <- 0

        else

            minY <- (locY - radius)

        if (locX + radius >= lengthX) then

            maxX <- (lengthX - 1)

        else

            maxX <- locX + radius

        if (locY + radius >= lengthY) then

            maxY <- (lengthY - 1)

        else

            maxY <- (locY + radius)

        let resize = new ResizeArray<_>()

        for x in  minX .. 1 .. maxX  do
            for y in minY .. 1 .. maxY  do
                
                // oof 2#, azt hittem van Append listákhoz :D
                // https://www.dotnetperls.com/list-fs
                resize.Add(x,y)
        resize
