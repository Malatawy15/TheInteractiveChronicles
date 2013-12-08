function drawGreyScale(imageObj, canv_id) {
  var canvas = document.getElementById(canv_id);
  var context = canvas.getContext('2d');
  var x = 0;
  var y = 0;

  context.drawImage(imageObj,0,0,300,150);
  var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
  var data = imageData.data;
  //alert(imageObj.width +" "+imageObj.height+" "+data.length);

  for(var i = 0; i < data.length; i += 4) {
    var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
    // red
    data[i] = brightness;
    // green
    data[i + 1] = brightness;
    // blue
    data[i + 2] = brightness;
  }

  // overwrite original image
  context.putImageData(imageData, x, y);
}

function drawImage(canv_id, img_src){
  var imageObj = new Image();
  imageObj.onload = function() {
    drawGreyScale(this, canv_id);
  };
  imageObj.src = img_src;
}