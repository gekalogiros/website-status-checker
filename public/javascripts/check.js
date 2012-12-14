var jsondata;
var mouseovercounter=0;

$(document).ready(function() {
  $('.url').addGlow();
});

$('.status').bind("mouseover", function(e) {
	var linkElement = $(e.target).closest('tr').children(":first").children('a').attr('href');
	linkElement = encodeURI(linkElement);

	$.getJSON('/status?url='+linkElement, function(data) {
		if (mouseovercounter<4){
			alertify.log( 'Version: '+data.version+'<br> For more information click on the smiley!');
			mouseovercounter++;
		}
		else{
			alertify.log( 'Version: '+data.version);
		}

	});	
});

$('.status').bind("click", function( e ) {
	// User clicked on smiley. Now, get the link of the corresponding website
	var linkElement = $(e.target).closest('tr').children(":first").children('a').attr('href');
	linkElement = encodeURI(linkElement);
	var width = $(window).width();
	$('#info').bPopup({
	        fadeSpeed: 'fast',
	        positionStyle: 'fixed', 
	        position: [width/2, 170]
		}, 
		function() {
			$.getJSON('/status?url='+linkElement, function(data) {
				// If content fetched in the past don't append them again.
				var content = $('#info').html();
				if (content == ""){
					$('#info').append('<table><tr><th id="left">Version: </th><th id="right">'+data.version+'</th></tr><tr><th id="left">Revision</th><th id="right">'+data.revision+'</th></tr><tr><th id="left">Date: </th><th id="right">'+data.date+'</th></tr><tr><th id="left">Deployed by: </th><th id="right">'+data.deployedBy+'</th></tr><tr><th id="left">Environment: </th><th id="right">'+data.environment+'</th></tr></table>');
				}
			});
		}
	);	
});

google.load('visualization', '1.0', {'packages':['corechart']});


$('#chartTrigger').bind("click", function( e ) {
	var width = $(window).width();
	$('#chart').bPopup({
	        fadeSpeed: 'fast',
	        positionStyle: 'fixed',
	        // I want to position the element in the middle(more or less)
	        // the chart element has width 600
	        position: [(width/2)-300, 100]
		}, 
		function() {
			var onlineCounter=0, offlineCounter=0;

			$('#mainTable tr').each(function() {

				// The website which are online have a laughing smiley.
				var current = $(this).find('th.onlineStatus').find('img');
				// The laughing smiley image has a class defined as 'status'
				var isWebsiteOnline = current.hasClass('status');
				// Check if the current image has class status
				if (isWebsiteOnline == true){
					onlineCounter++;
				} 
				else{
					offlineCounter++;
				}
			});

			// Create the data table.
		    var data = new google.visualization.DataTable();
		    data.addColumn('string', 'status');
		    data.addColumn('number', 'websites');
		    data.addRows([
		      ['Offline', offlineCounter],
		      ['Online', onlineCounter]
		    ]);

		    // Set chart options
		    var options = {'title':'Website status statistics for Synth Media projects.',
		                   'width':600,
		                   'height':400,
		               	   'is3D': true,
		               	   'legend': {
		               	   		'position':'none'
		               	    },
		               	    'titleTextStyle' : {
		               	    	'color': '#727f7f', 
		               	    	'fontName': 'tahoma', 
		               	    	'fontSize': '14.5'
		               	    },
		               	   'backgroundColor' : {
		               	   		'fill' : 'white',
		               	   		'strokeWidth' : 10,
		               	   		'stroke': '#727f7f'
		               	    }, 
		               	   'colors' : ['#302d33','#615d57'],
		               	   'legend.position' : 'none'};

		    // Instantiate and draw our chart, passing in some options.
		    var chart = new google.visualization.PieChart(document.getElementById('chart'));
		    chart.draw(data, options);
		}
	);	

});
