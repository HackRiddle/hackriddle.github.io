/**
 * Code to create dynamic canvas above all other element in a html page.
 * F. Permadi, 2009
 * http://www.permadi.com 
 *
 * This code is made available for educational purpose comes with no warranty.  Use at your own risk.
 */
var myCanvas;

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
        canvasContainer.style.zIndex="1000";
        canvasContainer.style.pointerEvents="none";
        superContainer=document.body;
      }
      else
        superContainer=canvasContainer;
      
      // Part of block below is inspired by code from Google excanvas.js
      {
      myCanvas = document.createElement('canvas');    
      myCanvas.style.width = superContainer.scrollWidth+"px";
      myCanvas.style.height = "100%";
      // You must set this otherwise the canvas will be streethed to fit the container
      myCanvas.width=superContainer.scrollWidth;
      myCanvas.height=superContainer.scrollHeight;    
      //surfaceElement.style.width=window.innerWidth; 
      myCanvas.style.overflow = 'visible';
    myCanvas.style.display = 'block'
      myCanvas.style.position = 'fixed';
    myCanvas.id="canvas";
          myCanvas.style.pointerEvents="none";
      }
      
      var context=myCanvas.getContext('2d');
        context.fillStyle = color;
      context.fillRect(0,0, myCanvas.width, myCanvas.height);
      canvasContainer.appendChild(myCanvas);
  
      
        console.log("Made canvas...");
      //alert(myCanvas);
    }
    else
      myCanvas.parentNode.style.visibility='visible';
 }
 
 function hideCanvas()
 {
    if (myCanvas)
    {
      //myCanvas.style.visibility='hidden';
      myCanvas.parentNode.style.visibility='hidden';
    }
 }