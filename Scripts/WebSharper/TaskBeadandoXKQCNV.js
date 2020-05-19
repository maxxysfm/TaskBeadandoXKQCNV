(function()
{
 "use strict";
 var Global,TaskBeadandoXKQCNV,Radius,Pathfind,Node,SC$1,Client,SC$2,WebSharper,Operators,Enumerator,IntelliFactory,Runtime,Arrays2D,console,Unchecked,Arrays,Math,UI,Doc,AttrProxy,Strings,Html,Client$1,Operators$1,Attr,Tags,EventsPervasives,Var$1;
 Global=self;
 TaskBeadandoXKQCNV=Global.TaskBeadandoXKQCNV=Global.TaskBeadandoXKQCNV||{};
 Radius=TaskBeadandoXKQCNV.Radius=TaskBeadandoXKQCNV.Radius||{};
 Pathfind=TaskBeadandoXKQCNV.Pathfind=TaskBeadandoXKQCNV.Pathfind||{};
 Node=Pathfind.Node=Pathfind.Node||{};
 SC$1=Global.StartupCode$TaskBeadandoXKQCNV$Pathfind=Global.StartupCode$TaskBeadandoXKQCNV$Pathfind||{};
 Client=TaskBeadandoXKQCNV.Client=TaskBeadandoXKQCNV.Client||{};
 SC$2=Global.StartupCode$TaskBeadandoXKQCNV$Client=Global.StartupCode$TaskBeadandoXKQCNV$Client||{};
 WebSharper=Global.WebSharper;
 Operators=WebSharper&&WebSharper.Operators;
 Enumerator=WebSharper&&WebSharper.Enumerator;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Arrays2D=WebSharper&&WebSharper.Arrays2D;
 console=Global.console;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Arrays=WebSharper&&WebSharper.Arrays;
 Math=Global.Math;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
 AttrProxy=UI&&UI.AttrProxy;
 Strings=WebSharper&&WebSharper.Strings;
 Html=WebSharper&&WebSharper.Html;
 Client$1=Html&&Html.Client;
 Operators$1=Client$1&&Client$1.Operators;
 Attr=Client$1&&Client$1.Attr;
 Tags=Client$1&&Client$1.Tags;
 EventsPervasives=Client$1&&Client$1.EventsPervasives;
 Var$1=UI&&UI.Var$1;
 Radius.RadiusCheck=function(locX,locY,lengthX,lengthY,radius)
 {
  var minX,minY,maxX,maxY,resize,i,e,x,i$1,e$1;
  minX=0;
  minY=0;
  maxX=0;
  maxY=0;
  locX-radius<0?void(minX=0):void(minX=locX-radius);
  locY-radius<0?void(minY=0):void(minY=locY-radius);
  locX+radius>=lengthX?void(maxX=lengthX-1):void(maxX=locX+radius);
  locY+radius>=lengthY?void(maxY=lengthY-1):void(maxY=locY+radius);
  resize=[];
  i=Operators.step(minX,1,maxX);
  e=Enumerator.Get(i);
  try
  {
   while(e.MoveNext())
    {
     x=e.Current();
     i$1=Operators.step(minY,1,maxY);
     e$1=Enumerator.Get(i$1);
     try
     {
      while(e$1.MoveNext())
       resize.push([x,e$1.Current()]);
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
  return resize;
 };
 Node=Pathfind.Node=Runtime.Class({
  CalculateFCost:function()
  {
   this.FCost=this.GCost+this.HCost;
  }
 },null,Node);
 Node.New=function(AxisX,AxisY,HCost,GCost,FCost,OpenList,ClosedList,Walkable)
 {
  return new Node({
   AxisX:AxisX,
   AxisY:AxisY,
   HCost:HCost,
   GCost:GCost,
   FCost:FCost,
   OpenList:OpenList,
   ClosedList:ClosedList,
   Walkable:Walkable
  });
 };
 Pathfind.CreatePath=function(canvasPixels,lengthx,lengthy,startX,startY,destinyX,destinyY,width)
 {
  var Result,DoReturn,PathNotFound,Counter,x,$1,y,$2,extendRadius,j,$3,asd,ReachedStart,$4,search,LowestFCostX,LowestFCostY,MinFcost,x$1,$5,y$1,$6,buffer,minNode,min,j$1,$7,i,$8;
  Pathfind.set_lengthX(lengthx);
  Pathfind.set_lengthY(lengthy);
  Result=Arrays2D.init(Pathfind.lengthX(),Pathfind.lengthY(),function()
  {
   return 0;
  });
  DoReturn=false;
  Pathfind.set_ReachedEnd(false);
  console.log("Start of Pathfind");
  console.log("Validation check");
  if(Unchecked.Equals(Pathfind.InputValid(startX,startY,destinyX,destinyY),true))
   {
    console.log("Node stuff starts");
    Pathfind.set_Nodes(Arrays2D.init(Pathfind.lengthX(),Pathfind.lengthY(),function()
    {
     return Node.New(0,0,0,0,0,false,false,true);
    }));
    console.log("Node stuff ended");
    for(x=0,$1=Pathfind.lengthX()-1;x<=$1;x++){
     for(y=0,$2=Pathfind.lengthY()-1;y<=$2;y++){
      Arrays.get2D(Pathfind.Nodes(),x,y).HCost=Math.abs(x-destinyX)-Math.abs(y-destinyY);
      Arrays.get2D(Pathfind.Nodes(),x,y).AxisX=x;
      Arrays.get2D(Pathfind.Nodes(),x,y).AxisY=y;
      if(Arrays.get2D(canvasPixels,x,y).Alpha>0)
       {
        extendRadius=Radius.RadiusCheck(x,y,Pathfind.lengthX(),Pathfind.lengthY(),width);
        for(j=0,$3=Arrays.length(extendRadius)-1;j<=$3;j++)Arrays.get2D(Pathfind.Nodes(),(Arrays.get(extendRadius,j))[0],(Arrays.get(extendRadius,j))[1]).Walkable=false;
        Arrays.get2D(Pathfind.Nodes(),x,y).Walkable=false;
       }
      else
       void 0;
     }
    }
    console.log("Calculations ended for HCost, time for first node");
    Arrays.get2D(Pathfind.Nodes(),startX,startY).GCost=Pathfind.MovementCost();
    Arrays.get2D(Pathfind.Nodes(),startX,startY).CalculateFCost();
    Arrays.get2D(Pathfind.Nodes(),startX,startY).OpenList=true;
    console.log("First node calculate:");
    asd=Pathfind.NeighborNodes(startX,startY,true,destinyX,destinyY);
    console.log(asd);
    PathNotFound=false;
    Counter=0;
    while(Unchecked.Equals(DoReturn,false))
     {
      console.log("We started the maz, this should only appear once");
      while(!Pathfind.ReachedEnd()&&!PathNotFound)
       {
        LowestFCostX=0;
        LowestFCostY=0;
        MinFcost=Pathfind.lengthX()*Pathfind.lengthY()*10;
        for(x$1=0,$5=Pathfind.lengthX()-1;x$1<=$5;x$1++){
         for(y$1=0,$6=Pathfind.lengthY()-1;y$1<=$6;y$1++)if(Arrays.get2D(Pathfind.Nodes(),x$1,y$1).FCost!==0&&Arrays.get2D(Pathfind.Nodes(),x$1,y$1).FCost<MinFcost&&Unchecked.Equals(Arrays.get2D(Pathfind.Nodes(),x$1,y$1).OpenList,true)&&Unchecked.Equals(Arrays.get2D(Pathfind.Nodes(),x$1,y$1).ClosedList,false))
          {
           MinFcost=Arrays.get2D(Pathfind.Nodes(),x$1,y$1).FCost;
           LowestFCostX=x$1;
           LowestFCostY=y$1;
          }
        }
        Arrays.get2D(Pathfind.Nodes(),LowestFCostX,LowestFCostY).ClosedList=true;
        Pathfind.NeighborNodes(Arrays.get2D(Pathfind.Nodes(),LowestFCostX,LowestFCostY).AxisX,Arrays.get2D(Pathfind.Nodes(),LowestFCostX,LowestFCostY).AxisY,false,destinyX,destinyY);
        Counter===Pathfind.lengthX()*Pathfind.lengthY()?(Global.alert("Couldn't generate path!"),Pathfind.set_ReachedEnd(true),PathNotFound=true,DoReturn=true):void 0;
        Counter=Counter+1;
       }
      if(Unchecked.Equals(PathNotFound,false))
       {
        ReachedStart=false;
        buffer=[];
        search=Pathfind.NeighborNodes(destinyX,destinyY,true,destinyX,destinyY);
        Counter=0;
        while(Unchecked.Equals(ReachedStart,false))
         {
          minNode=null;
          min=Pathfind.lengthX()*Pathfind.lengthY()*9999;
          for(j$1=0,$7=Arrays.length(search)-1;j$1<=$7;j$1++)if(min>Arrays.get(search,j$1).FCost)
           {
            min=Arrays.get(search,j$1).FCost;
            minNode=Arrays.get(search,j$1);
           }
          buffer.push(minNode);
          search=Pathfind.NeighborNodes(minNode.AxisX,minNode.AxisY,true,destinyX,destinyY);
          minNode.AxisX===startX&&minNode.AxisY===startY?ReachedStart=true:Counter===Pathfind.lengthX()*Pathfind.lengthY()?DoReturn=true:void 0;
          Counter=Counter+1;
         }
        for(i=0,$8=Arrays.length(buffer)-1;i<=$8;i++)Arrays.set2D(Result,Arrays.get(buffer,i).AxisX,Arrays.get(buffer,i).AxisY,Arrays.length(buffer)-i-1);
        DoReturn=true;
       }
      else
       DoReturn=true;
     }
   }
  else
   null;
  console.log("Returning stuff");
  return Result;
 };
 Pathfind.InputValid=function(startX,startY,destX,destY)
 {
  console.log("Calculating Valid Path");
  return startX===destX&&startY===destY?(console.log("Calculated"),false):(console.log("Calculated"),true);
 };
 Pathfind.NeighborNodes=function(x,y,ignoreAll,destinyX,destinyY)
 {
  var result,Up,Down,Left,Right;
  function Check(axisX,axisY,diagonal)
  {
   if(Unchecked.Equals(ignoreAll,false)&&Unchecked.Equals(Arrays.get2D(Pathfind.Nodes(),axisX,axisY).Walkable,true)&&!Unchecked.Equals(Arrays.get2D(Pathfind.Nodes(),axisX,axisY).ClosedList,true))
    result.push(Pathfind.NeighborNodesFound(axisX,axisY,diagonal,x,y,destinyX,destinyY));
   else
    if(Unchecked.Equals(Arrays.get2D(Pathfind.Nodes(),axisX,axisY).Walkable,true))
     result.push(Pathfind.NeighborNodesFound(axisX,axisY,diagonal,x,y,destinyX,destinyY));
  }
  result=[];
  Up=!(x+1>=Pathfind.lengthX());
  Down=x-1>=0;
  Left=!(y+1>=Pathfind.lengthY());
  Right=y-1>=0;
  Up?Check(x+1,y,false):void 0;
  Down?Check(x-1,y,false):void 0;
  Left?Check(x,y+1,false):void 0;
  Right?Check(x,y-1,false):void 0;
  Up&&Right?Check(x+1,y-1,true):void 0;
  Up&&Left?Check(x+1,y+1,true):void 0;
  Down&&Right?Check(x-1,y-1,true):void 0;
  Down&&Left?Check(x-1,y+1,true):void 0;
  return result;
 };
 Pathfind.NeighborNodesFound=function(inputX,inputY,diagonal,prevX,prevY,destinyX,destinyY)
 {
  var result;
  console.log("Calculating neighbors");
  Arrays.get2D(Pathfind.Nodes(),inputX,inputY).OpenList=true;
  Arrays.get2D(Pathfind.Nodes(),inputX,inputY).GCost===0?Unchecked.Equals(diagonal,true)?Arrays.get2D(Pathfind.Nodes(),inputX,inputY).GCost=Arrays.get2D(Pathfind.Nodes(),prevX,prevY).GCost+Pathfind.MovementCost()+4:Arrays.get2D(Pathfind.Nodes(),inputX,inputY).GCost=Arrays.get2D(Pathfind.Nodes(),prevX,prevY).GCost+Pathfind.MovementCost():void 0;
  Arrays.get2D(Pathfind.Nodes(),inputX,inputY).CalculateFCost();
  result=Arrays.get2D(Pathfind.Nodes(),inputX,inputY);
  inputX===destinyX&&inputY===destinyY?Pathfind.set_ReachedEnd(true):void 0;
  console.log("Returning");
  return result;
 };
 Pathfind.Nodes=function()
 {
  SC$1.$cctor();
  return SC$1.Nodes;
 };
 Pathfind.set_Nodes=function($1)
 {
  SC$1.$cctor();
  SC$1.Nodes=$1;
 };
 Pathfind.lengthY=function()
 {
  SC$1.$cctor();
  return SC$1.lengthY;
 };
 Pathfind.set_lengthY=function($1)
 {
  SC$1.$cctor();
  SC$1.lengthY=$1;
 };
 Pathfind.lengthX=function()
 {
  SC$1.$cctor();
  return SC$1.lengthX;
 };
 Pathfind.set_lengthX=function($1)
 {
  SC$1.$cctor();
  SC$1.lengthX=$1;
 };
 Pathfind.MovementCost=function()
 {
  SC$1.$cctor();
  return SC$1.MovementCost;
 };
 Pathfind.ReachedEnd=function()
 {
  SC$1.$cctor();
  return SC$1.ReachedEnd;
 };
 Pathfind.set_ReachedEnd=function($1)
 {
  SC$1.$cctor();
  SC$1.ReachedEnd=$1;
 };
 SC$1.$cctor=function()
 {
  SC$1.$cctor=Global.ignore;
  SC$1.ReachedEnd=false;
  SC$1.MovementCost=10;
  SC$1.lengthX=0;
  SC$1.lengthY=0;
  SC$1.Nodes=null;
 };
 Client.Main=function()
 {
  return Doc.Element("div",[AttrProxy.Create("style","text-align: center; ")],[Doc.Button("Pick Start",[AttrProxy.Create("style","background: #a8ffa8;color:black;")],function()
  {
   Client.set_brushMode(2);
  }),Doc.Button("Pick End",[AttrProxy.Create("style","background: #aba8ff;color:black;")],function()
  {
   Client.set_brushMode(3);
  }),Doc.Element("table",[],[Doc.Element("th",[],[Doc.Element("tr",[],[Doc.Element("h3",[],[Doc.TextNode("Brush size:")]),Doc.Input([AttrProxy.Create("style","width:75px"),AttrProxy.Create("type","range"),AttrProxy.Create("min","2"),AttrProxy.Create("max","15"),AttrProxy.Create("class","slider")],Client.brushSize()),Doc.Element("h3",[],[Doc.TextNode("Collision Size:")]),Doc.Input([AttrProxy.Create("style","width:75px"),AttrProxy.Create("type","range"),AttrProxy.Create("min","1"),AttrProxy.Create("max","5"),AttrProxy.Create("class","slider")],Client.collisionSize())]),Doc.Element("tr",[],[Doc.Element("h2",[],[Doc.TextNode("Toggle brush types:")]),Doc.Button("",[AttrProxy.Create("style","color:#a434b3;"),AttrProxy.Create("class","fa fa-eraser")],function()
  {
   Client.set_brushMode(1);
  }),Doc.Button("",[AttrProxy.Create("style","color:#b35034;"),AttrProxy.Create("class","fa fa-edit")],function()
  {
   Client.set_brushMode(0);
  })]),Doc.Element("tr",[],[Doc.Button("Create path!",[],function()
  {
   var counter,$1,imgd,result,CanvasResult,i,e,x,i$1,e$1,y,generatedPath,i$2,e$2,x$1,i$3,e$3,y$1;
   function Next()
   {
    counter=counter+1;
   }
   Client.clearStart();
   Client.clearEnd();
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
   console.log(imgd);
   Client.canvas().height=Client.canvas().height;
   Client.canvas().width=Client.canvas().width;
   console.log(Client.canvas().height);
   console.log(Client.canvas().width);
   generatedPath=Pathfind.CreatePath(CanvasResult,Client.canvas().height,Client.canvas().width,Client.startX(),Client.startY(),Client.endX(),Client.endY(),Operators.toInt(Global.Number(Client.collisionSize().Get())));
   console.log("Time to draw");
   Client.restoreCache();
   Client.drawStart();
   Client.drawEnd();
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
         Arrays.get2D(generatedPath,x$1,y$1)>0?(Client.ctx().fillStyle="red",Client.ctx().fillRect(y$1,x$1,1,1)):void 0;
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
   Client.ctx().lineCap="round";
  })]),Doc.Element("tr",[],[Doc.Element("h3",[AttrProxy.Create("style","text-align: center;")],[Doc.TextNode("Auto pathfind:")]),Doc.CheckBox([AttrProxy.Create("style","text-align: center;\r\n                    vertical-align: middle;\r\n                    margin-left: 50px;")],Client.autoPathfind())])])]),Doc.Element("br",[],[]),Doc.Button("Debug",[],function()
  {
   Client.restoreCache();
  }),Doc.Element("div",[],[Doc.Element("h1",[],[Doc.TextNode("Edit map")]),Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[],[Doc.Element("h3",[],[Doc.TextNode("Map Size:")]),Doc.Input([AttrProxy.Create("style","width:100px"),AttrProxy.Create("type","range"),AttrProxy.Create("min","20"),AttrProxy.Create("max","100"),AttrProxy.Create("class","slider")],Client.MapSize())]),Doc.Element("td",[],[Doc.Button("Reset/Clear",[AttrProxy.Create("style","background: red;color:white;")],function()
  {
   Client.set_CachedCanvas(null);
   Client.canvas().height=Operators.toInt(Global.Number(Client.MapSize().Get()));
   Client.canvas().width=Operators.toInt(Global.Number(Client.MapSize().Get()));
   Client.ctx().lineCap="round";
   Client.draw();
  })])])])])]);
 };
 Client.Canvas=function()
 {
  var a,x,x$1,x$2,x$3,x$4;
  function a$1(el,args)
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
  function a$2(el,args)
  {
   var t;
   (Client.inLine())[0]=false;
   t=Client.getXYFromMouseEvent(el,args);
   return Client.updatePos(t[0],t[1]);
  }
  function a$3(el,args)
  {
   var p,y,x$5,increasedSize,sizeConverted;
   p=Client.getXYFromMouseEvent(el,args);
   y=p[1];
   x$5=p[0];
   Client.updatePos(x$5,y);
   return(Client.inLine())[0]?(Client.ctx().moveTo((Client.lastX())[0],(Client.lastY())[0]),Client.ctx().lineTo(x$5,y),Client.ctx().lineWidth=Global.Number(Client.brushSize().Get()),Client.brushMode()===0?Client.ctx().stroke():void 0,Client.brushMode()===1?(increasedSize=Global.Number(Client.brushSize().Get()),sizeConverted=Global.Number(Client.brushSize().Get())+increasedSize,Client.ctx().clearRect(x$5+increasedSize-sizeConverted,y+increasedSize-sizeConverted,sizeConverted,sizeConverted)):void 0,Client.brushMode()===2?(Client.clearStart(),Client.set_startX(x$5),Client.set_startY(y)):void 0,Client.brushMode()===3?(Client.clearEnd(),Client.set_endX(x$5),Client.set_endY(y)):void 0,(Client.lastX())[0]=x$5,(Client.lastY())[0]=y,Client.draw()):null;
  }
  function a$4(el,args)
  {
   var t;
   t=Client.getXYFromMouseEvent(el,args);
   Client.updatePos(t[0],t[1]);
   Client.restoreCache();
   Client.drawStart();
   return Client.drawEnd();
  }
  function a$5(a$6,a$7)
  {
   (Client.inLine())[0]=false;
   return Client.set_CachedCanvas(Client.ctx().getImageData(0,0,Client.canvas().width,Client.canvas().height));
  }
  Client.draw();
  return Operators$1.add((a=[Attr.Attr().NewAttr("class","zoom"),Attr.Attr().NewAttr("style","\r\n        width:300px;\r\n        border: 4px;\r\n        text-align: center; \r\n        cursor: crosshair;\r\n        image-rendering: crisp-edges;\r\n        -ms-interpolation-mode: nearest-neighbor;\r\n        ")],Tags.Tags().NewTag("div",a)),[Client.labelPos(),Tags.Tags().NewTag("br",[]),(x=(x$1=(x$2=(x$3=(x$4=Client.element(),(function(a$6)
  {
   EventsPervasives.Events().OnMouseDown(function($1)
   {
    return function($2)
    {
     return a$1($1,$2);
    };
   },a$6);
  }(x$4),x$4)),(function(a$6)
  {
   EventsPervasives.Events().OnMouseUp(function($1)
   {
    return function($2)
    {
     return a$2($1,$2);
    };
   },a$6);
  }(x$3),x$3)),(function(a$6)
  {
   EventsPervasives.Events().OnMouseMove(function($1)
   {
    return function($2)
    {
     return a$3($1,$2);
    };
   },a$6);
  }(x$2),x$2)),(function(a$6)
  {
   EventsPervasives.Events().OnMouseEnter(function($1)
   {
    return function($2)
    {
     return a$4($1,$2);
    };
   },a$6);
  }(x$1),x$1)),(function(a$6)
  {
   EventsPervasives.Events().OnMouseLeave(function($1)
   {
    return function($2)
    {
     return a$5($1,$2);
    };
   },a$6);
  }(x),x))]);
 };
 Client.restoreCache=function()
 {
  Client.ctx().putImageData(Client.CachedCanvas(),0,0);
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
  SC$2.$cctor();
  return SC$2.ctx;
 };
 Client.canvas=function()
 {
  SC$2.$cctor();
  return SC$2.canvas;
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
  SC$2.$cctor();
  return SC$2.labelPos;
 };
 Client.inLine=function()
 {
  SC$2.$cctor();
  return SC$2.inLine;
 };
 Client.lastX=function()
 {
  SC$2.$cctor();
  return SC$2.lastX;
 };
 Client.lastY=function()
 {
  SC$2.$cctor();
  return SC$2.lastY;
 };
 Client.element=function()
 {
  SC$2.$cctor();
  return SC$2.element;
 };
 Client.MapSize=function()
 {
  SC$2.$cctor();
  return SC$2.MapSize;
 };
 Client.CachedCanvas=function()
 {
  SC$2.$cctor();
  return SC$2.CachedCanvas;
 };
 Client.set_CachedCanvas=function($1)
 {
  SC$2.$cctor();
  SC$2.CachedCanvas=$1;
 };
 Client.autoPathfind=function()
 {
  SC$2.$cctor();
  return SC$2.autoPathfind;
 };
 Client.collisionSize=function()
 {
  SC$2.$cctor();
  return SC$2.collisionSize;
 };
 Client.brushMode=function()
 {
  SC$2.$cctor();
  return SC$2.brushMode;
 };
 Client.set_brushMode=function($1)
 {
  SC$2.$cctor();
  SC$2.brushMode=$1;
 };
 Client.brushSize=function()
 {
  SC$2.$cctor();
  return SC$2.brushSize;
 };
 Client.endY=function()
 {
  SC$2.$cctor();
  return SC$2.endY;
 };
 Client.set_endY=function($1)
 {
  SC$2.$cctor();
  SC$2.endY=$1;
 };
 Client.endX=function()
 {
  SC$2.$cctor();
  return SC$2.endX;
 };
 Client.set_endX=function($1)
 {
  SC$2.$cctor();
  SC$2.endX=$1;
 };
 Client.startY=function()
 {
  SC$2.$cctor();
  return SC$2.startY;
 };
 Client.set_startY=function($1)
 {
  SC$2.$cctor();
  SC$2.startY=$1;
 };
 Client.startX=function()
 {
  SC$2.$cctor();
  return SC$2.startX;
 };
 Client.set_startX=function($1)
 {
  SC$2.$cctor();
  SC$2.startX=$1;
 };
 Client.BorderSize=function()
 {
  SC$2.$cctor();
  return SC$2.BorderSize;
 };
 Client.initialOffset=function()
 {
  SC$2.$cctor();
  return SC$2.initialOffset;
 };
 Client.initialSize=function()
 {
  SC$2.$cctor();
  return SC$2.initialSize;
 };
 SC$2.$cctor=function()
 {
  var $1,a;
  SC$2.$cctor=Global.ignore;
  SC$2.initialSize=50;
  SC$2.initialOffset=3;
  SC$2.BorderSize=3;
  SC$2.startX=Client.initialOffset();
  SC$2.startY=Client.initialOffset();
  SC$2.endX=Client.initialSize()-Client.initialOffset();
  SC$2.endY=Client.initialSize()-Client.initialOffset();
  SC$2.brushSize=Var$1.Create$1(Global.String(2));
  SC$2.brushMode=0;
  SC$2.collisionSize=Var$1.Create$1(Global.String(1));
  SC$2.autoPathfind=Var$1.Create$1(false);
  SC$2.CachedCanvas=null;
  SC$2.MapSize=Var$1.Create$1(Global.String(Client.initialSize()));
  SC$2.element=Tags.Tags().NewTag("canvas",[]);
  $1=[[0],[0],[false]];
  SC$2.lastY=$1[1];
  SC$2.lastX=$1[0];
  SC$2.inLine=$1[2];
  SC$2.labelPos=(a=[Tags.Tags().text("Position:")],Tags.Tags().NewTag("span",a));
  SC$2.canvas=Client.element().Dom;
  Client.canvas().height=Operators.toInt(Global.Number(Client.MapSize().Get()));
  Client.canvas().width=Operators.toInt(Global.Number(Client.MapSize().Get()));
  SC$2.ctx=Client.canvas().getContext("2d");
  Client.ctx().lineCap="round";
 };
 Runtime.OnLoad(function()
 {
  Client.Canvas();
 });
}());
