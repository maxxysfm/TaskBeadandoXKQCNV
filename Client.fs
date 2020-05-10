namespace TaskBeadandoXKQCNV

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html
open WebSharper.Html.Client


module CanvasExtra =
    type CanvasNode =
        {
            mutable Red: int
            mutable Green: int
            mutable Blue: int
            mutable Alpha: int
        }

module Pathfinder =
    type Node =
        {
            mutable AxisX: int
            mutable AxisY: int
            mutable HCost: int
            mutable GCost: int
            mutable FCost: int
        }

[<JavaScript>]
module Client =
    
    open CanvasExtra
    open Pathfinder

    // Pálya beállítások
    let initialSize = 500
    let initialOffset = 25
    let BorderSize = 12.0
    let mutable startX: int = initialOffset
    let mutable startY: int = initialOffset
    let mutable endX:int = initialSize - initialOffset
    let mutable endY:int = initialSize - initialOffset
    
    // Brush beállítások
    let brushSize = Var.Create (string 15)
    let mutable brushMode = 0

    // Beállítások
    let autoPathfind = Var.Create false
    
    // Mentés
    // https://stackoverflow.com/questions/11086368/declaring-a-variable-without-assigning
    
    // Ide kerül mentésre a vászon eredeti adatai, a kirajzolt útvonal nélkül
    let mutable CachedCanvas : ImageData = Unchecked.defaultof<ImageData>

    // https://try.websharper.com/snippet/WebSharper/00000f
    // Vászonhoz szükséges adatok.
    let MapSize = Var.Create (string initialSize) // Default méret

    let element = Tags.Canvas []
    let lastX, lastY, inLine = ref 0, ref 0, ref false
    let labelPos = Span [Text "Position:"]
    let updatePos (x, y) =
        labelPos.Clear()
        labelPos.Append ("X=" + string x + ", Y=" + string y)
    let getXYFromMouseEvent (el: Element) (args: Events.MouseEvent) =
        let pos = JQuery.JQuery.Of(el.Body).Position()
        args.X - (int pos.Left), args.Y - (int pos.Top)
    let canvas = As<CanvasElement> element.Dom
    
    // A slider alapján bevitt szélesség érték
    canvas.Height <- int MapSize.Value
    canvas.Width <- int MapSize.Value
    
    // Vászon adatai amire sokszor hivatkozunk később
    let ctx = canvas.GetContext("2d")
    
    // A vászonra való rajzoláskor használt módszer, kerekítés
    // Vászon frissítésekor újra kell beállítani
    ctx.LineCap <- LineCap.Round
    
    let drawStart() = 
        
        // Green
        ctx.FillStyle <- "#00ff00"
        ctx.FillRect(float startX, float startY, BorderSize, BorderSize)
        
    let clearStart() = 
        
        ctx.ClearRect(float startX, float startY, BorderSize, BorderSize)
    
    let drawEnd() = 
        
        // Blue
        ctx.FillStyle <- "#0000ff"
        ctx.FillRect(float endX, float endY, BorderSize, BorderSize)
        
    let clearEnd() = 
        
        ctx.ClearRect(float endX, float endY, BorderSize, BorderSize)
    
    let draw() =
        drawStart()
        drawEnd()

    // https://stackoverflow.com/questions/667045/getpixel-from-html-canvas
    [<SPAEntryPoint>]
    let Canvas () =
        
        draw()
        ctx.Scale(1.0,1.0)
        
        Div [Attr.Style "
        text-align: center; 
        -ms-interpolation-mode: nearest-neighbor;
        image-rendering: pixelated;
        cursor: crosshair"] -< [
            labelPos
            Br []
            element -< [Attr.Style "border: 1px solid gray"]
            |>! OnMouseDown (fun el args ->
                
                let x, y = getXYFromMouseEvent el args
                updatePos (x, y)
                lastX := x
                lastY := y
                inLine := true
                ctx.BeginPath()
                
                // Újdonság, első lenyomáskor is rajzolunk
                ctx.StrokeStyle <- "#000000"
                ctx.FillStyle <- "#000000"
                
                // Képernyő frissítése
                draw()
            )
            |>! OnMouseUp (fun el args ->
                
                inLine := false
                updatePos <| getXYFromMouseEvent el args
            )
            |>! OnMouseMove (fun el args ->
                
                let x, y = getXYFromMouseEvent el args
                updatePos (x, y)
                if !inLine then
                    ctx.MoveTo (float !lastX, float !lastY)
                    
                    //ctx.StrokeStyle <- "#cc0000";
                    ctx.LineTo (float x, float y)
                    ctx.LineWidth <- float brushSize.Value;

                    // Rajzolás mód
                    if brushMode = 0 then
                        ctx.Stroke()
                    
                    // Törlés brush
                    if brushMode = 1 then
                        
                        // ctx.StrokeStyle <- "rgba(0,0,0,0)" // Nem írja felül ilyen módon a Stroke funkciót
                        
                        // Törlő ecset mérete kicsit nagyobb a brush méretéhez képest 
                        let increasedSize = 20.0
                        
                        let xConverted = float x + increasedSize
                        let yConverted = float y + increasedSize
                        let sizeConverted = float brushSize.Value + increasedSize
                        
                        ctx.ClearRect(xConverted - sizeConverted, yConverted - sizeConverted, sizeConverted, sizeConverted)

                    // Kezdőpont
                    if brushMode = 2 then
                        clearStart()
                        startX <- x
                        startY <- y
                        
                    // Végpont kirajzolás
                    if brushMode = 3 then
                        clearEnd()
                        endX <- x
                        endY <- y
                    
                    lastX := x
                    lastY := y
                    draw()
            )
            |>! OnMouseEnter (fun el args -> updatePos <| getXYFromMouseEvent el args)
            |>! OnMouseLeave (fun _ _ ->inLine := false)
            P [B [Text "Draw with your mouse"]]
        ]

    let Main () =

        div [attr.``style`` "text-align: center; "] [
            
            // https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing            
            Doc.Button "Pick Start" [attr.``style`` "background: #a8ffa8;color:black;"] (fun _ -> brushMode <- 2)
            Doc.Button "Pick End" [attr.``style`` "background: #aba8ff;color:black;"] (fun _ -> brushMode <- 3)
            
            table [] [
                    th [] [
                    tr [] [
                        h3 [] [text "Brush size:"]
                        Doc.Input [
                        attr.``style`` "width:75px"
                        attr.``type`` "range"
                        attr.``min`` "3"
                        attr.``max`` "40"
                        attr.``class`` "slider"] brushSize
                    ]
                    tr [] [
                        h2 [] [text "Toggle brush types:"]
                    
                        Doc.Button "" [
                        attr.``style`` "color:#a434b3;"
                        attr.``class`` "fa fa-eraser"
                        ] (fun _ -> brushMode <- 1)
                    
                        Doc.Button "" [
                        attr.``style`` "color:#b35034;"
                        attr.``class`` "fa fa-edit"
                        ] (fun _ -> brushMode <- 0)
                    ]
                    tr [] [
                    
                    // Útvonal generálása gomb
                    Doc.Button "Create path!" [] (fun _ -> 
                        
                        // Elmentjük a canvas állapotát a kirajzolt útvonal előtt, így a következő kirajzoláskor nemkell bajlódni az útvonal által rajzolt vonalak eltüntetésével
                        CachedCanvas <- ctx.GetImageData(0.0,0.0,float canvas.Width,float canvas.Height)

                        // Csak ilyen módon tudtam visszajuttatni a Canvas értékeit, egy string listában. Ezt fel kell radabolni hogy értelmezni is lehessen.
                        // A következő alapján működik: Első 4 elem: Első pixel R, G, B, Alpha értéke, így folytatva folyamatosan
                        let imgd = CachedCanvas.Data

                        // https://www.dotnetperls.com/split-fs
                        let result = (string imgd).Split ','
                        
                        // https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/arrays
                        // Cél: Feldaraboljuk a string értékeit könnyebben értelmezhető 2 dimenziós listába
                        let CanvasResult = Array2D.init canvas.Width canvas.Height (fun _ _ -> 
                            
                            // Mindegyik értéknek egy új instancenak kell lennie
                            let x : CanvasNode = 
                                { 
                                    Red = 0;
                                    Green = 0;
                                    Blue = 0;
                                    Alpha = 0
                                }
                            x
                            )

                        // String elemeinek lebontása
                        let CanvasFilled = 
                            
                            // Számláló
                            let mutable counter = 0
                            let Next() = counter <- counter + 1
                            
                            for x in  0 .. 1 .. (canvas.Width-1)  do
                                for y in 0 .. 1 .. (canvas.Height-1)  do
                                    
                                    // 4 elemenként: a sorrend: R, G, B, Alpha
                                    CanvasResult.[x,y].Red <- (int result.[counter])
                                    Next()
                                    CanvasResult.[x,y].Green <- (int result.[counter])
                                    Next()
                                    CanvasResult.[x,y].Blue <- (int result.[counter])
                                    Next()
                                    CanvasResult.[x,y].Alpha <- (int result.[counter])
                                    Next()
                        
                        CanvasFilled

                        // Konzolos kirajzoláshoz, böngésző debug funkcióhoz
                        let DebugDisplay (a:int,b:int)= 
                            let p1 = string a + " "+ string b+ " "
                            let p2 = "Red: " + (string CanvasResult.[a,b].Red) + " "
                            let p3 = "Green: " + (string CanvasResult.[a,b].Green) + " "
                            let p4 = "Blue: " + (string CanvasResult.[a,b].Blue) + " "
                            let p5 = "Alpha: " + (string CanvasResult.[a,b].Alpha) + " "
                            p1+p2+p3+p4+p5 + "\n"

                        // Teszteléskor használva volt
                        // JS.Alert(DebugDisplay(0,0)+ DebugDisplay(2,2) + DebugDisplay(5,5))
                        Console.Log(string imgd) // String
                        Console.Log(CanvasResult) // Böngészőben vizsgálható így (Console, array stb)

                        // Tömb kiírása
                        let Debug() =
                            canvas.Height <- canvas.Height
                            canvas.Width <- canvas.Width
                            for x in 0 .. 1 .. (canvas.Width-1) do
                                for y in 0  .. 1 .. (canvas.Height-1) do
                                    (*
                                    if CanvasResult.[x,y].Alpha > 0 then
                                        ctx.FillStyle <- "#000000"
                                        ctx.FillRect(float y, float x, float 1, float 1)
                                        *)
                                    //(*
                                    ctx.FillStyle <- "rgba(
                                    "+(string CanvasResult.[x,y].Red)+",
                                    "+(string CanvasResult.[x,y].Green)+",
                                    "+(string CanvasResult.[x,y].Blue)+",
                                    "+(string CanvasResult.[x,y].Alpha)+")"
                                    ctx.FillRect(float y, float x, float 1, float 1)
                                    //*)
                            ctx.LineCap <- LineCap.Round

                        // Tesztelés, hogy jó helyen vannak-e a pixelek.
                        //Debug()

                        Console.Log(autoPathfind.Value)
                    )
                    ]
                    tr [] [
                    h3 [attr.``style`` "text-align: center;"] [text "Auto pathfind:"]
                    Doc.CheckBox [attr.``style`` "text-align: center;
                    vertical-align: middle;
                    margin-left: 50px;"] autoPathfind
                    ]
                ]
            ]

            br [] []

            (*
            Doc.Button "Debug" [] (fun _ -> 
            ctx.PutImageData(CachedCanvas,0.0,0.0)
            )
            *)

            // Alsó rész, 5x5 méret a minimum, maximum 500x500
            div [] [
                
                h1 [] [text "Edit map"]
                
                table [] [
                    
                    tr [] [
                    
                    td [] [
                        
                        h3 [] [text "Map Size:"]
                        
                        Doc.Input [
                        attr.``style`` "width:100px"
                        attr.``type`` "range"
                        attr.``min`` "100"
                        attr.``max`` "800"
                        attr.``class`` "slider"] MapSize
                    ]
                    
                    td [] [
                        
                        Doc.Button "Reset/Clear" [attr.``style`` "background: red;color:white;"] (fun _ -> 

                            // https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
                            canvas.Height <- int MapSize.Value
                            canvas.Width <- int MapSize.Value
                            ctx.LineCap <- LineCap.Round
                            draw()
                            )
                        ]
                    ]
                ]
            ]
        ]
