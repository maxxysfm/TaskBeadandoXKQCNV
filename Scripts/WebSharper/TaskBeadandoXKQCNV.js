(function()
{
 "use strict";
 var Global,TaskBeadandoXKQCNV,Path,CanvasNode,Client,SC$1,WebSharper,UI,Doc,AttrProxy,Arrays,Strings,Arrays2D,Operators,Enumerator,console,Html,Client$1,Operators$1,Attr,Tags,EventsPervasives,Var$1,IntelliFactory,Runtime;
 Global=self;
 TaskBeadandoXKQCNV=Global.TaskBeadandoXKQCNV=Global.TaskBeadandoXKQCNV||{};
 Path=TaskBeadandoXKQCNV.Path=TaskBeadandoXKQCNV.Path||{};
 CanvasNode=Path.CanvasNode=Path.CanvasNode||{};
 Client=TaskBeadandoXKQCNV.Client=TaskBeadandoXKQCNV.Client||{};
 SC$1=Global.StartupCode$TaskBeadandoXKQCNV$Client=Global.StartupCode$TaskBeadandoXKQCNV$Client||{};
 WebSharper=Global.WebSharper;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
 AttrProxy=UI&&UI.AttrProxy;
 Arrays=WebSharper&&WebSharper.Arrays;
 Strings=WebSharper&&WebSharper.Strings;
 Arrays2D=WebSharper&&WebSharper.Arrays2D;
 Operators=WebSharper&&WebSharper.Operators;
 Enumerator=WebSharper&&WebSharper.Enumerator;
 console=Global.console;
 Html=WebSharper&&WebSharper.Html;
 Client$1=Html&&Html.Client;
 Operators$1=Client$1&&Client$1.Operators;
 Attr=Client$1&&Client$1.Attr;
 Tags=Client$1&&Client$1.Tags;
 EventsPervasives=Client$1&&Client$1.EventsPervasives;
 Var$1=UI&&UI.Var$1;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 CanvasNode.New=function(Red,Green,Blue,Alpha)
 {
  return{
   Red:Red,
   Green:Green,
   Blue:Blue,
   Alpha:Alpha
  };
 };
 Client.Main=function()
 {
  return Doc.Element("div",[AttrProxy.Create("style","\n        text-align: center; ")],[Doc.Button("Pick Start",[AttrProxy.Create("style","background: #a8ffa8;color:black;")],function()
  {
   Global.alert("");
  }),Doc.Button("Pick End",[AttrProxy.Create("style","background: #aba8ff;color:black;")],function()
  {
   Global.alert("");
  }),Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[],[Doc.Element("h3",[],[Doc.TextNode("Brush size:")]),Doc.Input([AttrProxy.Create("style","width:75px"),AttrProxy.Create("type","range"),AttrProxy.Create("min","3"),AttrProxy.Create("max","40"),AttrProxy.Create("class","slider")],Client.brushSize())]),Doc.Element("td",[],[Doc.Element("h2",[],[Doc.TextNode("Toggle brush types:")]),Doc.Button("",[AttrProxy.Create("style","color:#a434b3;"),AttrProxy.Create("class","fa fa-eraser")],function()
  {
   Client.set_brushMode(1);
  }),Doc.Button("",[AttrProxy.Create("style","color:#b35034;"),AttrProxy.Create("class","fa fa-edit")],function()
  {
   Client.set_brushMode(0);
  })])])]),Doc.Element("br",[],[]),Doc.Button("Create path!",[],function()
  {
   var counter,imgd,result,CanvasResult,i,e,x,i$1,e$1,y,i$2,e$2,x$1,i$3,e$3,y$1;
   function Next()
   {
    counter=counter+1;
   }
   function DebugDisplay(a,b)
   {
    return Global.String(a)+" "+Global.String(b)+" "+("Red: "+Global.String(Arrays.get2D(CanvasResult,a,b).Red)+" ")+("Green: "+Global.String(Arrays.get2D(CanvasResult,a,b).Green)+" ")+("Blue: "+Global.String(Arrays.get2D(CanvasResult,a,b).Blue)+" ")+("Alpha: "+Global.String(Arrays.get2D(CanvasResult,a,b).Alpha)+" ")+"\n";
   }
   imgd=Client.ctx().getImageData(0,0,Client.canvas().width,Client.canvas().height).data;
   result=Strings.SplitChars(Global.String(imgd),[","],0);
   CanvasResult=Arrays2D.init(Client.canvas().width,Client.canvas().height,function()
   {
    return CanvasNode.New(0,0,0,0);
   });
   counter=0;
   i=Operators.step(0,1,Client.canvas().width-1);
   e=Enumerator.Get(i);
   try
   {
    while(e.MoveNext())
     {
      x=e.Current();
      i$1=Operators.step(0,1,Client.canvas().height-1);
      e$1=Enumerator.Get(i$1);
      try
      {
       while(e$1.MoveNext())
        {
         y=e$1.Current();
         Arrays.get2D(CanvasResult,x,y).Red=Operators.toInt(Global.Number(Arrays.get(result,counter)));
         Next();
         Arrays.get2D(CanvasResult,x,y).Green=Operators.toInt(Global.Number(Arrays.get(result,counter)));
         Next();
         Arrays.get2D(CanvasResult,x,y).Blue=Operators.toInt(Global.Number(Arrays.get(result,counter)));
         Next();
         Arrays.get2D(CanvasResult,x,y).Alpha=Operators.toInt(Global.Number(Arrays.get(result,counter)));
         Next();
        }
      }
      finally
      {
       if(typeof e$1=="object"&&"Dispose"in e$1)
        e$1.Dispose();
      }
     }
   }
   finally
   {
    if(typeof e=="object"&&"Dispose"in e)
     e.Dispose();
   }
   Global.alert(DebugDisplay(0,0)+DebugDisplay(2,2)+DebugDisplay(5,5));
   console.log(Global.String(imgd));
   console.log(CanvasResult);
   Client.canvas().height=Client.canvas().height;
   Client.canvas().width=Client.canvas().width;
   i$2=Operators.step(0,1,Client.canvas().width-1);
   e$2=Enumerator.Get(i$2);
   try
   {
    while(e$2.MoveNext())
     {
      x$1=e$2.Current();
      i$3=Operators.step(0,1,Client.canvas().height-1);
      e$3=Enumerator.Get(i$3);
      try
      {
       while(e$3.MoveNext())
        {
         y$1=e$3.Current();
         Arrays.get2D(CanvasResult,x$1,y$1).Alpha>0?(Client.ctx().fillStyle="#000000",Client.ctx().fillRect(y$1,x$1,1,1)):void 0;
        }
      }
      finally
      {
       if(typeof e$3=="object"&&"Dispose"in e$3)
        e$3.Dispose();
      }
     }
   }
   finally
   {
    if(typeof e$2=="object"&&"Dispose"in e$2)
     e$2.Dispose();
   }
  }),Doc.Element("div",[],[Doc.Element("h1",[],[Doc.TextNode("Edit map")]),Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[],[Doc.Element("h3",[],[Doc.TextNode("Map Size:")]),Doc.Input([AttrProxy.Create("style","width:100px"),AttrProxy.Create("type","range"),AttrProxy.Create("min","100"),AttrProxy.Create("max","800"),AttrProxy.Create("class","slider")],Client.MapSize())]),Doc.Element("td",[],[Doc.Button("Reset/Clear",[AttrProxy.Create("style","background: red;color:white;")],function()
  {
   Client.canvas().height=Operators.toInt(Global.Number(Client.MapSize().Get()));
   Client.canvas().width=Operators.toInt(Global.Number(Client.MapSize().Get()));
   Client.ctx().lineCap="round";
  })])])])])]);
 };
 Client.Canvas=function()
 {
  var a,x,x$1,x$2,x$3,x$4,a$1,a$2;
  function a$3(el,args)
  {
   var p,y,x$5;
   p=Client.getXYFromMouseEvent(el,args);
   y=p[1];
   x$5=p[0];
   Client.updatePos(x$5,y);
   (Client.lastX())[0]=x$5;
   (Client.lastY())[0]=y;
   (Client.inLine())[0]=true;
   Client.ctx().beginPath();
   Client.ctx().strokeStyle="#000000";
   Client.ctx().fillStyle="#000000";
   return Client.drawFixedPoints();
  }
  function a$4(el,args)
  {
   var t;
   (Client.inLine())[0]=false;
   t=Client.getXYFromMouseEvent(el,args);
   return Client.updatePos(t[0],t[1]);
  }
  function a$5(el,args)
  {
   var p,y,x$5;
   p=Client.getXYFromMouseEvent(el,args);
   y=p[1];
   x$5=p[0];
   Client.updatePos(x$5,y);
   return(Client.inLine())[0]?(Client.ctx().moveTo((Client.lastX())[0],(Client.lastY())[0]),Client.ctx().lineTo(x$5,y),Client.ctx().lineWidth=Global.Number(Client.brushSize().Get()),Client.brushMode()===0?Client.ctx().stroke():void 0,Client.brushMode()===1?(Client.ctx().strokeStyle="rgba(0,0,0,0)",Client.ctx().clearRect(x$5-Global.Number(Client.brushSize().Get())/2,y-Global.Number(Client.brushSize().Get())/2,Global.Number(Client.brushSize().Get()),Global.Number(Client.brushSize().Get())),Client.ctx().stroke()):void 0,(Client.lastX())[0]=x$5,(Client.lastY())[0]=y,Client.drawFixedPoints()):null;
  }
  function a$6(el,args)
  {
   var t;
   t=Client.getXYFromMouseEvent(el,args);
   return Client.updatePos(t[0],t[1]);
  }
  function a$7(a$8,a$9)
  {
   (Client.inLine())[0]=false;
  }
  Client.drawFixedPoints();
  Client.ctx().scale(1,1);
  return Operators$1.add((a=[Attr.Attr().NewAttr("style","\n        text-align: center; \n        -ms-interpolation-mode: nearest-neighbor;\n        image-rendering: pixelated;\n        cursor: crosshair")],Tags.Tags().NewTag("div",a)),[Client.labelPos(),Tags.Tags().NewTag("br",[]),(x=(x$1=(x$2=(x$3=(x$4=Operators$1.add(Client.element(),[Attr.Attr().NewAttr("style","border: 1px solid gray")]),(function(a$8)
  {
   EventsPervasives.Events().OnMouseDown(function($1)
   {
    return function($2)
    {
     return a$3($1,$2);
    };
   },a$8);
  }(x$4),x$4)),(function(a$8)
  {
   EventsPervasives.Events().OnMouseUp(function($1)
   {
    return function($2)
    {
     return a$4($1,$2);
    };
   },a$8);
  }(x$3),x$3)),(function(a$8)
  {
   EventsPervasives.Events().OnMouseMove(function($1)
   {
    return function($2)
    {
     return a$5($1,$2);
    };
   },a$8);
  }(x$2),x$2)),(function(a$8)
  {
   EventsPervasives.Events().OnMouseEnter(function($1)
   {
    return function($2)
    {
     return a$6($1,$2);
    };
   },a$8);
  }(x$1),x$1)),(function(a$8)
  {
   EventsPervasives.Events().OnMouseLeave(function($1)
   {
    return function($2)
    {
     return a$7($1,$2);
    };
   },a$8);
  }(x),x)),(a$1=[(a$2=[Tags.Tags().text("Draw with your mouse")],Tags.Tags().NewTag("b",a$2))],Tags.Tags().NewTag("p",a$1))]);
 };
 Client.drawFixedPoints=function()
 {
  Client.drawStart();
  Client.drawEnd();
 };
 Client.drawEnd=function()
 {
  Client.ctx().fillStyle="#0000ff";
  Client.ctx().fillRect(Client.endX(),Client.endY(),10,10);
 };
 Client.drawStart=function()
 {
  Client.ctx().fillStyle="#ff0000";
  Client.ctx().fillRect(Client.startX(),Client.startY(),10,10);
 };
 Client.ctx=function()
 {
  SC$1.$cctor();
  return SC$1.ctx;
 };
 Client.canvas=function()
 {
  SC$1.$cctor();
  return SC$1.canvas;
 };
 Client.getXYFromMouseEvent=function(el,args)
 {
  var pos;
  pos=Global.jQuery(el.get_Body()).position();
  return[args.X-Operators.toInt(pos.left),args.Y-Operators.toInt(pos.top)];
 };
 Client.updatePos=function(x,y)
 {
  var _this,_this$1;
  _this=Client.labelPos();
  _this.HtmlProvider.Clear(_this.get_Body());
  _this$1=Client.labelPos();
  _this$1.HtmlProvider.AppendNode(_this$1.get_Body(),_this$1.HtmlProvider.CreateTextNode("X="+Global.String(x)+", Y="+Global.String(y)));
 };
 Client.labelPos=function()
 {
  SC$1.$cctor();
  return SC$1.labelPos;
 };
 Client.inLine=function()
 {
  SC$1.$cctor();
  return SC$1.inLine;
 };
 Client.lastX=function()
 {
  SC$1.$cctor();
  return SC$1.lastX;
 };
 Client.lastY=function()
 {
  SC$1.$cctor();
  return SC$1.lastY;
 };
 Client.element=function()
 {
  SC$1.$cctor();
  return SC$1.element;
 };
 Client.MapSize=function()
 {
  SC$1.$cctor();
  return SC$1.MapSize;
 };
 Client.brushMode=function()
 {
  SC$1.$cctor();
  return SC$1.brushMode;
 };
 Client.set_brushMode=function($1)
 {
  SC$1.$cctor();
  SC$1.brushMode=$1;
 };
 Client.brushSize=function()
 {
  SC$1.$cctor();
  return SC$1.brushSize;
 };
 Client.endY=function()
 {
  SC$1.$cctor();
  return SC$1.endY;
 };
 Client.endX=function()
 {
  SC$1.$cctor();
  return SC$1.endX;
 };
 Client.startY=function()
 {
  SC$1.$cctor();
  return SC$1.startY;
 };
 Client.startX=function()
 {
  SC$1.$cctor();
  return SC$1.startX;
 };
 Client.rvInput=function()
 {
  SC$1.$cctor();
  return SC$1.rvInput;
 };
 SC$1.$cctor=function()
 {
  var $1,a;
  SC$1.$cctor=Global.ignore;
  SC$1.rvInput=Var$1.Create$1("");
  SC$1.startX=2;
  SC$1.startY=2;
  SC$1.endX=250;
  SC$1.endY=250;
  SC$1.brushSize=Var$1.Create$1(Global.String(5));
  SC$1.brushMode=0;
  SC$1.MapSize=Var$1.Create$1(Global.String(500));
  SC$1.element=Tags.Tags().NewTag("canvas",[]);
  $1=[[0],[0],[false]];
  SC$1.lastY=$1[1];
  SC$1.lastX=$1[0];
  SC$1.inLine=$1[2];
  SC$1.labelPos=(a=[Tags.Tags().text("Position:")],Tags.Tags().NewTag("span",a));
  SC$1.canvas=Client.element().Dom;
  Client.canvas().height=Operators.toInt(Global.Number(Client.MapSize().Get()));
  Client.canvas().width=Operators.toInt(Global.Number(Client.MapSize().Get()));
  SC$1.ctx=Client.canvas().getContext("2d");
  Client.ctx().lineCap="round";
 };
 Runtime.OnLoad(function()
 {
  Client.Canvas();
 });
}());
