// built-in Node.js modules
var fs = require('fs');
var http = require('http');
var path = require('path');
var queryString = require('querystring');
var port = 8000;
var public_dir = path.join(__dirname, 'public');
var jsonPath= path.join(public_dir, "data", "members.json");
var rand;
fs.readFile(jsonPath, (err, data) => {
	rand=JSON.parse(data);
});

function NewRequest(req, res) {
    
	var filename = req.url.substring(1);
	var fullpath;
    var extensions = {
    	js:'text/javascript',
    	html: 'text/html',
    	css:'text/css',
    	jpg:'image/jpeg',
    	png:'image/png',
    	json:'application/json'
    };
    if(req.method === "GET")
    {
		if (filename === '') {
			filename = "index.html";
		}
		fullpath = path.join(public_dir, filename);
    	fs.readFile(fullpath, (err, data) => {
	       if (err) {
	            res.writeHead(404, {'Content-Type': 'text/plain'});
	            res.write('Oh no! Could not find file');
	            res.end();
	       }
	       else {
	            location = filename.indexOf(".");
				hold=filename.substring(location+1);
	            res.writeHead(200,{'Content-Type':extensions[hold]});
	           	res.write(data);
	          	res.end();
	       }
	    });
    }
    else if(req.method === "POST")
    {
		if(filename ==="sign-up")
		{
			let body ='';
				
			req.on('data', function(chunk){
			body += chunk;
			});
			req.on('end',() => {
			var formData=queryString.parse(body);
			var holdemail = (formData['email']);
			var jsonobject = {
					"fname": formData['fname'],
					"lname": formData['lname'],
					"gender": formData['gender'].charAt(0),
					"birthday": formData['birthday']
					};
			rand[holdemail]=jsonobject;
			fs.writeFile(jsonPath, JSON.stringify(rand, null, 4), function(err){
			if(err){
				return console.log(err);
				}
			else
				{
				filenameAnother = 'join.html';
				fPath=path.join(public_dir, filenameAnother);
				fs.readFile(fPath, (err, inData) => {
				if (err) {
					res.writeHead(404, {'Content-Type': 'text/plain'});
					res.write('Oh no! Could not find file');
					res.end();
					}
					else {
						res.writeHead(200,{'Content-Type':'text/html'});
						res.write(inData);
						res.end();
						}
					});
				}
			});
			
		});		
		}
    	
	}

    
}

var server = http.createServer(NewRequest);

console.log('Now listening on port ' + port);
server.listen(port, '0.0.0.0');
