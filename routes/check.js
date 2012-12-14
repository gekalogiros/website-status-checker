urlist = new Array();
status = new Array();
var obj;
/******************************************************************************
 *     Checks each website in the sites.json file and parses their status.    *
 ******************************************************************************/ 
exports.index = function(req, res){
	var request = require('request');
	fs = require('fs');
	fs.readFile('./json/sites.json', 'utf8', function (err,data) {
		var counter = 0;
	 	if (err) {
			console.log(err);
			return 
		}
		else{
			obj = JSON.parse(data);

			for( var i = 0; i < obj.websites.length; i++ ){
				var url = obj.websites[i];
				(function( url ) {
					request(url+'deploy-info.json', function (error, response, body) {
						var info = { url: url, status: 0 };
						counter++;
						if (!error && response.statusCode == 200) {
							info.status = 1;
						}
						status.push(info);
						if (counter==obj.websites.length){
							res.render('check', { websites: status, title: "Status List for Synth websites." });
							urlist.splice(0, urlist.length);
							status.splice(0, status.length);
						}
					});
				})( obj.websites[i] );
			}
		}
	});	
};
/*********************************************************************************
 ******************************** END OF Index ***********************************
 *********************************************************************************/