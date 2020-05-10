namespace TaskBeadandoXKQCNV

open WebSharper
open WebSharper.Sitelets
open WebSharper.UI
open WebSharper.UI.Server

type EndPoint =
    | [<EndPoint "/">] Home

module Templating =
    open WebSharper.UI.Html

    type MainTemplate = Templating.Template<"Main.html">


    let Main ctx action (title: string) (body: Doc list) =
        Content.Page(
            MainTemplate()
                .Title(title)
                .Body(body)
                .Doc()
        )

module Site =
    open WebSharper.UI.Html

    let HomePage ctx =
        Templating.Main ctx EndPoint.Home "Home" [
            h1 [] [text "Say Hi to the server!"]
            table [] [
                tr [] [
                    td [] [
                        div [] [client <@ Client.Canvas() @>]
                    ]
                    td [] [
                        div [] [client <@ Client.Main() @>]]
                    ]
                ]
            ]

    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            match endpoint with
            | EndPoint.Home -> HomePage ctx
        )
