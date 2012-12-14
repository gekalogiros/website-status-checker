exports.index = function(req, res){
	var request = require('request');
	//var url = req.params.url;
	var query = require('url').parse(req.url,true).query;
	var url = encodeURI(query.url+'deploy-info.json');
	request(url, function (error, response, body) {
		res.writeHead(200, {"Content-Type": "application/json"});
		console.log(body);
		res.write(body);
    	res.end();
	});
	
}