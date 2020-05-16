(function()
{
 "use strict";
 var Global,TaskBeadandoXKQCNV,Client,SC$1,WebSharper,UI,Doc,AttrProxy,Strings,Arrays2D,Operators,Enumerator,Arrays,console,Html,Client$1,Operators$1,Attr,Tags,EventsPervasives,Var$1,IntelliFactory,Runtime;
 Global=self;
 TaskBeadandoXKQCNV=Global.TaskBeadandoXKQCNV=Global.TaskBeadandoXKQCNV||{};
 Client=TaskBeadandoXKQCNV.Client=TaskBeadandoXKQCNV.Client||{};
 SC$1=Global.StartupCode$TaskBeadandoXKQCNV$Client=Global.StartupCode$TaskBeadandoXKQCNV$Client||{};
 WebSharper=Global.WebSharper;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
 AttrProxy=UI&&UI.AttrProxy;
 Strings=WebSharper&&WebSharper.Strings;
 Arrays2D=WebSharper&&WebSharper.Arrays2D;
 Operators=WebSharper&&WebSharper.Operators;
 Enumerator=WebSharper&&WebSharper.Enumerator;
 Arrays=WebSharper&&WebSharper.Arrays;
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
 Client.Main=function()
 {
  return Doc.Element("div",[AttrProxy.Create("style","text-align: center; ")],[Doc.Button("Pick Start",[AttrProxy.Create("style","background: #a8ffa8;color:black;")],function()
  {
   Client.set_brushMode(2);
  }),Doc.Button("Pick End",[AttrProxy.Create("style","background: #aba8ff;color:black;")],function()
  {
   Client.set_brushMode(3);
  }),Doc.Element("table",[],[Doc.Element("th",[],[Doc.Element("tr",[],[Doc.Element("h3",[],[Doc.TextNode("Brush size:")]),Doc.Input([AttrProxy.Create("style","width:75px"),AttrProxy.Create("type","range"),AttrProxy.Create("min","3"),AttrProxy.Create("max","40"),AttrProxy.Create("class","slider")],Client.brushSize())]),Doc.Element("tr",[],[Doc.Element("h2",[],[Doc.TextNode("Toggle brush types:")]),Doc.Button("",[AttrProxy.Create("style","color:#a434b3;"),AttrProxy.Create("class","fa fa-eraser")],function()
  {
   Client.set_brushMode(1);
  }),Doc.Button("",[AttrProxy.Create("style","color:#b35034;"),AttrProxy.Create("class","fa fa-edit")],function()
  {
   Client.set_brushMode(0);
  })]),Doc.Element("tr",[],[Doc.Button("Create path!",[],function()
  {
   var $1,counter,imgd,result,CanvasResult,i,e,x,i$1,e$1,y;
   function Next()
   {
    counter=counter+1;
   }
   Client.set_CachedCanvas(Client.ctx().getImageData(0,0,Client.canvas().width,Client.canvas().height));
   imgd=Client.CachedCanvas().data;
   result=Strings.SplitChars(Global.String(imgd),[","],0);
   CanvasResult=Arrays2D.init(Client.canvas().width,Client.canvas().height,function()
   {
    return{
     Red:0,
     Green:0,
     Blue:0,
     Alpha:0
    };
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
   console.log(Global.String(imgd));
   console.log(CanvasResult);
   console.log(Client.autoPathfind().Get());
  })]),Doc.Element("tr",[],[Doc.Element("h3",[AttrProxy.Create("style","text-align: center;")],[Doc.TextNode("Auto pathfind:")]),Doc.CheckBox([AttrProxy.Create("style","text-align: center;\r\n                    vertical-align: middle;\r\n                    margin-left: 50px;")],Client.autoPathfind())])])]),Doc.Element("br",[],[]),Doc.Element("div",[],[Doc.Element("h1",[],[Doc.TextNode("Edit map")]),Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[],[Doc.Element("h3",[],[Doc.TextNode("Map Size:")]),Doc.Input([AttrProxy.Create("style","width:100px"),AttrProxy.Create("type","range"),AttrProxy.Create("min","100"),AttrProxy.Create("max","800"),AttrProxy.Create("class","slider")],Client.MapSize())]),Doc.Element("td",[],[Doc.Button("Reset/Clear",[AttrProxy.Create("style","background: red;color:white;")],function()
  {
   Client.canvas().height=Operators.toInt(Global.Number(Client.MapSize().Get()));
   Client.canvas().width=Operators.toInt(Global.Number(Client.MapSize().Get()));
   Client.ctx().lineCap="round";
   Client.draw();
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
   return Client.draw();
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
   var p,y,x$5,increasedSize,sizeConverted;
   p=Client.getXYFromMouseEvent(el,args);
   y=p[1];
   x$5=p[0];
   Client.updatePos(x$5,y);
   return(Client.inLine())[0]?(Client.ctx().moveTo((Client.lastX())[0],(Client.lastY())[0]),Client.ctx().lineTo(x$5,y),Client.ctx().lineWidth=Global.Number(Client.brushSize().Get()),Client.brushMode()===0?Client.ctx().stroke():void 0,Client.brushMode()===1?(increasedSize=20,sizeConverted=Global.Number(Client.brushSize().Get())+increasedSize,Client.ctx().clearRect(x$5+increasedSize-sizeConverted,y+increasedSize-sizeConverted,sizeConverted,sizeConverted)):void 0,Client.brushMode()===2?(Client.clearStart(),Client.set_startX(x$5),Client.set_startY(y)):void 0,Client.brushMode()===3?(Client.clearEnd(),Client.set_endX(x$5),Client.set_endY(y)):void 0,(Client.lastX())[0]=x$5,(Client.lastY())[0]=y,Client.draw()):null;
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
  Client.draw();
  Client.ctx().scale(1,1);
  return Operators$1.add((a=[Attr.Attr().NewAttr("style","\r\n        text-align: center; \r\n        -ms-interpolation-mode: nearest-neighbor;\r\n        image-rendering: pixelated;\r\n        cursor: crosshair")],Tags.Tags().NewTag("div",a)),[Client.labelPos(),Tags.Tags().NewTag("br",[]),(x=(x$1=(x$2=(x$3=(x$4=Operators$1.add(Client.element(),[Attr.Attr().NewAttr("style","border: 1px solid gray")]),(function(a$8)
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
 Client.draw=function()
 {
  Client.drawStart();
  Client.drawEnd();
 };
 Client.clearEnd=function()
 {
  Client.ctx().clearRect(Client.endX(),Client.endY(),Client.BorderSize(),Client.BorderSize());
 };
 Client.drawEnd=function()
 {
  Client.ctx().fillStyle="#0000ff";
  Client.ctx().fillRect(Client.endX(),Client.endY(),Client.BorderSize(),Client.BorderSize());
 };
 Client.clearStart=function()
 {
  Client.ctx().clearRect(Client.startX(),Client.startY(),Client.BorderSize(),Client.BorderSize());
 };
 Client.drawStart=function()
 {
  Client.ctx().fillStyle="#00ff00";
  Client.ctx().fillRect(Client.startX(),Client.startY(),Client.BorderSize(),Client.BorderSize());
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
 Client.CachedCanvas=function()
 {
  SC$1.$cctor();
  return SC$1.CachedCanvas;
 };
 Client.set_CachedCanvas=function($1)
 {
  SC$1.$cctor();
  SC$1.CachedCanvas=$1;
 };
 Client.autoPathfind=function()
 {
  SC$1.$cctor();
  return SC$1.autoPathfind;
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
 Client.set_endY=function($1)
 {
  SC$1.$cctor();
  SC$1.endY=$1;
 };
 Client.endX=function()
 {
  SC$1.$cctor();
  return SC$1.endX;
 };
 Client.set_endX=function($1)
 {
  SC$1.$cctor();
  SC$1.endX=$1;
 };
 Client.startY=function()
 {
  SC$1.$cctor();
  return SC$1.startY;
 };
 Client.set_startY=function($1)
 {
  SC$1.$cctor();
  SC$1.startY=$1;
 };
 Client.startX=function()
 {
  SC$1.$cctor();
  return SC$1.startX;
 };
 Client.set_startX=function($1)
 {
  SC$1.$cctor();
  SC$1.startX=$1;
 };
 Client.BorderSize=function()
 {
  SC$1.$cctor();
  return SC$1.BorderSize;
 };
 Client.initialOffset=function()
 {
  SC$1.$cctor();
  return SC$1.initialOffset;
 };
 Client.initialSize=function()
 {
  SC$1.$cctor();
  return SC$1.initialSize;
 };
 SC$1.$cctor=function()
 {
  var $1,a;
  SC$1.$cctor=Global.ignore;
  SC$1.initialSize=500;
  SC$1.initialOffset=25;
  SC$1.BorderSize=12;
  SC$1.startX=Client.initialOffset();
  SC$1.startY=Client.initialOffset();
  SC$1.endX=Client.initialSize()-Client.initialOffset();
  SC$1.endY=Client.initialSize()-Client.initialOffset();
  SC$1.brushSize=Var$1.Create$1(Global.String(15));
  SC$1.brushMode=0;
  SC$1.autoPathfind=Var$1.Create$1(false);
  SC$1.CachedCanvas=null;
  SC$1.MapSize=Var$1.Create$1(Global.String(Client.initialSize()));
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
