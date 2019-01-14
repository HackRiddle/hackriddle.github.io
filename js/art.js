/**
 * Code to create dynamic canvas above all other element in a html page.
 * F. Permadi, 2009
 * http://www.permadi.com 
 * 
 * Modified by Tim C.
 * January 14, 2019
 *
 * This code is made available for educational purpose comes with no warranty.  Use at your own risk.
 */

var myCanvas;
var urls = [
    "./stickers/bust.png",
    "./stickers/phone.png",
    "./stickers/bottle.png",
    "./stickers/pc.png",
    "./stickers/phone.png",
    "./stickers/tree.png"
];

preloadImages();

 function createCanvasOverlay(color, canvasContainer)
 {
    if (!myCanvas)
    {
      if (!canvasContainer)
      {
        canvasContainer = document.createElement('div'); 
        document.body.appendChild(canvasContainer);
        canvasContainer.style.position="absolute";
        canvasContainer.style.left="0px";
        canvasContainer.style.top="0px";
        canvasContainer.style.width="100%";
        canvasContainer.style.height="100%";
        canvasContainer.style.zIndex="5";
        superContainer=document.body;
      }
      else
        superContainer=canvasContainer;
      
      // Part of block below is inspired by code from Google excanvas.js
      {
      myCanvas = document.createElement('canvas');    
      myCanvas.style.width = superContainer.scrollWidth+"px";
      myCanvas.style.height = superContainer.scrollHeight+"px";
      // You must set this otherwise the canvas will be streethed to fit the container
      myCanvas.width=superContainer.scrollWidth;
      myCanvas.height=superContainer.scrollHeight;    
      //surfaceElement.style.width=window.innerWidth; 
      myCanvas.style.overflow = 'visible';
    //   myCanvas.style.pointerEvents = 'none';

      myCanvas.style.position = 'absolute';
      }
      
      var context=myCanvas.getContext('2d');
      context.fillStyle = color;
      context.fillRect(0,0, myCanvas.width, myCanvas.height);
      canvasContainer.appendChild(myCanvas);
  
      var closeButton=document.createElement('div');
      closeButton.style.position="fixed";      
      closeButton.style.float="left";
      closeButton.onclick = hideCanvas;
      closeButton.style.left="20px";
      closeButton.style.top="14px";      
      closeButton.style.width="50px";
      closeButton.style.height="50px";
      closeButton.style.background="#f00";
      closeButtonText=document.createTextNode("JUST STOP");
      closeButton.appendChild(closeButtonText);
      
      canvasContainer.appendChild(closeButton);
     
      context.strokeStyle='rgb(0,255,0)';  // a green line
      context.lineWidth=4;                 // 4 pixels thickness     
    //   myCanvas.parentNode.addEventListener('mousemove', onMouseMoveOnMyCanvas, false); 
      myCanvas.parentNode.addEventListener('mousedown', onMouseClickOnMyCanvas, false); 
      //alert(myCanvas);
    }
    else
      myCanvas.parentNode.style.visibility='visible';

      
 }
 
  function onMouseMoveOnMyCanvas(event)
  {
    if (myCanvas.drawing)
    {  
      var mouseX=event.layerX;  
      var mouseY=event.layerY;

      var context = myCanvas.getContext("2d");
      if (myCanvas.pathBegun==false)
      {
        context.beginPath();
        myCanvas.pathBegun=true;
      }
      else
      {
        context.lineTo(mouseX, mouseY);
        context.stroke();
      }
    }
  }

  function onMouseClickOnMyCanvas(event)
  {
    var mouseX=event.layerX;  
    var mouseY=event.layerY;
    var image = new Image();
    image.width = "auto";
    image.height = "40px";
    image.src = getRandomClipart();
    var context = myCanvas.getContext("2d");
    context.drawImage(image, mouseX, mouseY, 50, 50);

    // myCanvas.drawing=!myCanvas.drawing;
    // // reset the path when starting over
    // if (myCanvas.drawing)
    //   myCanvas.pathBegun=false;
  }

  function preloadImages(){
        for (var i = 0; i < urls.length; i++) {
            preloadImage(urls[i], function(){
                console.log(".");
            });
        }
  }

  function preloadImage(url, callback)
    {
        var img=new Image();
        img.src=url;
        img.onload = callback;
    }

  function getRandomClipart(){
    var clipartURL = urls[Math.floor(Math.random()*urls.length)];
    return clipartURL;
  }
 
 function hideCanvas()
 {
    if (myCanvas)
    {
      myCanvas.parentNode.style.visibility='hidden';
    }
 }
 