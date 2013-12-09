$(document).ready (function() {
	drawImage('c1_img', 'images/Balotelli.jpg');
	drawImage('c2_img', 'images/HarryPotter.jpg');
	drawImage('c3_img', 'images/ACM.jpg');

	
	$.get('http://www.bbc.co.uk/radio1/programmes/schedules/england/today.xml',  
		function(data) {
			$(data).find("programme").each(function(){
				$post = $(this).find("short_synopsis");
				$text = $post.text();
				if($.trim($text)!=''){	
					$('#list').append("<li>"+$text+"</li>");
				}
			});
		}
	);


	var timer;
	document.getElementById('vid').addEventListener('play', function(){
        draw(this,'video_news');
    },false);

});

function draw(v,c) {
    if(v.paused || v.ended) return false;
    /*var myWorker = new Worker("javascript/video_greyscale.js");
    var canvas = document.getElementById(c).getContext('2d');
    myWorker.onmessage = function (e) {
    	canvas.putImageData(e.data,0,0);
	};
	canvas.drawImage(v,0,0);
	var data = canvas.getImageData(0,0,v.clientWidth,v.clientHeight).data;
	alert(data);
	myWorker.postMessage(data, [data]);*/
	var canvas = document.getElementById(c).getContext('2d');
	ratio = v.videoWidth / v.videoHeight;
    w = v.videoWidth;
    h = parseInt(w / ratio, 10);
	document.getElementById(c).width = w;
	document.getElementById(c).height = h;
	canvas.drawImage(v,0,0);
	var imgObj = canvas.getImageData(0,0,w,h);
	var data = imgObj.data;

	for(var i = 0; i < data.length; i += 4) {
		var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
		// red
		data[i] = brightness;
		// green
		data[i + 1] = brightness;
		// blue
		data[i + 2] = brightness;
	}
	canvas.putImageData(imgObj,0,0);

    setTimeout(draw,20,v,c);
}

