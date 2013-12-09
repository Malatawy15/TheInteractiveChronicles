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
					$('#loadp').append("<p>"+$text+"</p>");
				}
			});
		}
	);
});
