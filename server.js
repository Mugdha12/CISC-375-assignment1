// built-in Node.js modules
var fs = require('fs');
var http = require('http');
var path = require('path');

var port = 8000;
var public_dir = path.join(__dirname, 'public');

function NewRequest(req, res) {
    var filename = req.url.substring(1);
    if (filename === '') {
        filename = 'index.html';
    }
    var fullpath = path.join(public_dir, filename);
    fs.readFile(fullpath, (err, data) => {
       if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('Oh no! Could not find file');
            res.end();
       }
       else {
            location = filename.indexOf(".");
			if(filename.substring(location+1) === "html")
			{
				res.writeHead(200,{'Content-Type':'text/html'});
			}
			else if (filename.substring(location+1) === "js") 
			{
				res.writeHead(200,{'Content-Type':'text/javascript'});
			}
			else if (filename.substring(location+1) === "css")
			{
				res.writeHead(200,{'Content-Type':'text/css'});
			}
			else if (filename.substring(location+1) === "jpg")
			{
				res.writeHead(200,{'Content-Type':'image/jpeg'});
			}
			else if (filename.substring(location+1) === "png")
			{
				res.writeHead(200,{'Content-Type':'image/png'});
			}
			else
			{
				res.writeHead(200,{'Content-Type':'application/json'});
			}
           res.write(data);
           res.end();
       }
    });
}

var server = http.createServer(NewRequest);

console.log('Now listening on port ' + port);
server.listen(port, '0.0.0.0');
