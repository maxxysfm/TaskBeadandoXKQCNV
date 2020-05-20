namespace TaskBeadandoXKQCNV

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html
open WebSharper.Html.Client
open CanvasExtra
open Radius

[<JavaScript>]
module Pathfind =
    
    type Node =
        {
            mutable AxisX: int
            mutable AxisY: int
            mutable HCost: int
            mutable GCost: int
            mutable FCost: int
            mutable OpenList: bool
            mutable ClosedList: bool
            mutable Walkable: bool
        }

        // https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/members/explicit-fields-the-val-keyword
        member this.CalculateFCost() = 
            this.FCost <- this.GCost + this.HCost
    
    //
    let mutable ReachedEnd = false
    
    //
    let MovementCost = 10

    let mutable lengthX = 0
    let mutable lengthY = 0
    
    // 
    let mutable Nodes:Node[,] = Unchecked.defaultof<Node[,]>
    
    let NeighborNodesFound(inputX:int,inputY:int,diagonal:bool,prevX:int,prevY:int,destinyX:int,destinyY:int) =
        Console.Log("Calculating neighbors")
        Nodes.[inputX, inputY].OpenList <- true
        
        if Nodes.[inputX, inputY].GCost = 0 then
            if diagonal = true then
                Nodes.[inputX, inputY].GCost <- Nodes.[prevX, prevY].GCost + MovementCost + 4
            else
                Nodes.[inputX, inputY].GCost <- Nodes.[prevX, prevY].GCost + MovementCost
        
        Nodes.[inputX, inputY].CalculateFCost()
        
        let result = Nodes.[inputX, inputY]
        
        if (inputX = destinyX) && (inputY = destinyY) then
            ReachedEnd <- true
        Console.Log("Returning")
        result
    
    // Szomszédos elemek vizsgálata, ciklusban fog majd kelleni
    let NeighborNodes(x:int, y:int, ignoreAll:bool, destinyX:int, destinyY:int) =
        
        let result = new ResizeArray<_>()
    
        // Visual Studio 2017-ben újítás, a sima void használata metóduson belül.
        // Diagonal azért van paraméterként, mivel ki és be lehet kapcsolni az oldalas mozgást.
        let Check(axisX:int, axisY:int, diagonal:bool) = 
            if (ignoreAll = false && Nodes.[axisX, axisY].Walkable = true && Nodes.[axisX, axisY].ClosedList <> true) then

                result.Add(NeighborNodesFound(axisX, axisY, diagonal, x, y, destinyX, destinyY))
            
            else if (Nodes.[axisX, axisY].Walkable = true) then

                result.Add(NeighborNodesFound(axisX, axisY, diagonal, x, y, destinyX, destinyY))

        // Szabad-e ezekbe az irányokba mozogni?
        let Up:bool = not ((x + 1) >= lengthX)
        let Down:bool = (x - 1) >= 0
        let Left:bool = not ((y + 1) >= lengthY)
        let Right:bool = (y - 1) >= 0

        // Felfele
        if (Up) then
            Check(x + 1, y, false)
    
        // Lefele
        if (Down) then
            Check(x - 1, y, false)
    
        // Balra
        if (Left) then
            Check(x, y + 1, false)
    
        // Jobbra
        if (Right) then
            Check(x, y - 1, false)
    
        // Oldalas mozgás
    
        // Felfele + Jobbra
        if (Up && Right) then
            Check(x + 1, y - 1, true)
    
        // Felfele + Balra
        if (Up && Left) then
            Check(x + 1, y + 1, true)

        // Lefele + Jobbra
        if (Down && Right) then
            Check(x - 1, y - 1, true)
    
        // Lefele + Balra
        if (Down && Left) then
            Check(x - 1, y + 1, true)
        
        result

    let InputValid( startX:int,  startY:int,  destX:int,  destY:int) =
        
        // Muszáj más helyen lennie a célpontnak.
        Console.Log("Calculating Valid Path")
        if (startX = destX && startY = destY) then
            Console.Log("Calculated")
            false
        else
            Console.Log("Calculated")
            true



    // Végeredménye a függvénynek azok a képpontok lesznek, ahova rajzolni kell majd
    let CreatePath(canvasPixels:CanvasNode[,],lengthx:int,lengthy:int,startX:int,startY:int,destinyX:int,destinyY:int,width:int) =
        
        lengthX <- lengthx
        lengthY <- lengthy

        let mutable Result:int[,] = Array2D.init lengthX lengthY (fun _ _ -> 0)
        let mutable DoReturn = false

        ReachedEnd <- false
        Console.Log("Start of Pathfind")
        // Külső tárolóba raktam a számokat hogy ne kelljen passzolgatni a változót paraméterként
        // Ronda

        // https://stackoverflow.com/questions/34252606/array-create-and-jagged-array%EF%BC%89
        // lol, ha getLength()-et használom akkor elszáll a program... ezért kell lengthX és lengthY
        
        // A*
        Console.Log("Validation check")
        if (InputValid(startX,startY,destinyX,destinyY) = true) then
            // H cost kiszámolása, konstruktor meghívása
            Console.Log("Node stuff starts")
            Nodes <- Array2D.init lengthX lengthY (fun _ _ ->
                        let x : Node = 
                            { 
                                AxisX = 0
                                AxisY = 0
                                HCost = 0
                                GCost = 0
                                FCost = 0
                                OpenList = false
                                ClosedList = false
                                Walkable = true
                            }
                        x
                        )
            
            Console.Log("Node stuff ended")
            
            // Kiszámoljuk hogy mi akadály + width érték hozzáadása
            for x in  0 .. (lengthX)-1  do
                for y in 0 .. (lengthY)-1  do
                    
                    // https://www.dotnetperls.com/math-fs
                    // Abszolút értékét. Végeredmény: Megkapjuk a mező távolságát a végponttól.
                    Nodes.[x,y].HCost <- ((abs (x - destinyX)) - (abs (y - destinyY)))
                    Nodes.[x,y].AxisX <- x
                    Nodes.[x,y].AxisY <- y
                    if canvasPixels.[x,y].Alpha > 0 then
                    
                        //(*
                        let extendRadius = RadiusCheck(x,y,lengthX,lengthY,width)

                        // lehetett volna foreach módon is
                        for j in 0 .. extendRadius.Count-1 do
                            
                            // https://stackoverflow.com/questions/35889993/f-int-int-confusion
                            Nodes.[fst (extendRadius.Item(j)),snd (extendRadius.Item(j))].Walkable <- false

                        //*)
                        Nodes.[x,y].Walkable <- false

            // Kezdő node
            Console.Log("Calculations ended for HCost, time for first node")
            Nodes.[startX,startY].GCost <- MovementCost
            Nodes.[startX,startY].CalculateFCost()
            Nodes.[startX,startY].OpenList <- true
        
            Console.Log("First node calculate:")
            // Első elem szomszédainak vizsgálása
            let asd = NeighborNodes(startX, startY, true, destinyX, destinyY)
            Console.Log(asd)

            let mutable PathNotFound = false
            let mutable Counter = 0

            // Ciklus
            while DoReturn = false do
                
                Console.Log("We started the maz, this should only appear once")
                while (not ReachedEnd) && (not PathNotFound) do

                    let mutable LowestFCostX = 0
                    let mutable LowestFCostY = 0

                    // Legnagyobb érték amit nem lehet amúgy se elérni
                    let mutable MinFcost = lengthX * lengthY * 10

                    for x in  0 .. (lengthX)-1  do
                        for y in 0 .. (lengthY)-1  do
                            if ((Nodes.[x,y].FCost <> 0) && (Nodes.[x,y].FCost < MinFcost) && (Nodes.[x,y].OpenList = true) && (Nodes.[x,y].ClosedList = false)) then
                                MinFcost <- Nodes.[x,y].FCost
                                LowestFCostX <- x
                                LowestFCostY <- y

                    Nodes.[LowestFCostX, LowestFCostY].ClosedList <- true

                    NeighborNodes(Nodes.[LowestFCostX,LowestFCostY].AxisX, Nodes.[LowestFCostX,LowestFCostY].AxisY, false, destinyX, destinyY)
                    |> ignore

                    if Counter = (lengthX*lengthY) then
                        JS.Alert("Couldn't generate path!")
                        ReachedEnd <- true
                        PathNotFound <- true
                        DoReturn <- true

                    Counter <- Counter + 1

                if PathNotFound = false then
                    
                    // Ha megtaláltuk a célpontot, de még nem tudjuk hogy milyen úton jutunk el oda.
                    // Útvonal készítése.
                    let mutable ReachedStart = false

                    // Útvonalt alkotó mezők.
                    let buffer = new ResizeArray<_>()
            
                    // Szomszédos mezői az első lépés végpontjától.
                    let mutable search = NeighborNodes(destinyX, destinyY, true, destinyX, destinyY)

                    // Számláló felhasználása
                    Counter <- 0

                    while ReachedStart = false do
                
                        let mutable minNode = Unchecked.defaultof<Node>

                        let mutable min = (lengthX * lengthY * 9999)
                        
                        //JS.Alert(string (search.Count))
                        for j in 0 .. search.Count-1 do
                            
                            //JS.Alert("Fcost: "+string search.[j].FCost + " X:"+ string search.[j].AxisX+ " Y:"+ string search.[j].AxisY)
                            if min > search.[j].FCost then
                                min <- search.[j].FCost
                                minNode <- search.[j]

                        buffer.Add(minNode)
                        search <- NeighborNodes(minNode.AxisX, minNode.AxisY, true, destinyX, destinyY)
                
                        if (minNode.AxisX = startX && minNode.AxisY = startY) then
                        
                            ReachedStart <- true
                
                        else if (Counter = (lengthX * lengthY)) then
                    
                            // Különleges esetben ha az egység első mozdulatát se tudja megtenni, akkor egyhelyben kell maradnia
                            DoReturn <- true
                
                        Counter <- Counter + 1

                    for i in 0 .. buffer.Count-1 do

                        Result.[buffer.[i].AxisX,buffer.[i].AxisY] <- (buffer.Count - i - 1)
                    
                    DoReturn <- true
                else
                    DoReturn <- true
        Console.Log("Returning stuff")
        Result
            

