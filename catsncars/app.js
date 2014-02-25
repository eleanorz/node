//http server
var http = require('http');
var fs = require('fs'); //file string module
//creating a server
server = http.createServer(function (request, response){
  console.log('Request', request.url);
  if(request.url === '/'){
    response.writeHead(200, {'Content-type': 'text/html'});
    fs.readFile('views/index.html', 'utf8', function (errors, contents){
      response.write(contents); 
      response.end();
    });
  } else if(request.url === '/cars'){
    response.writeHead(200, {'Content-type': 'text/html'});
    fs.readFile('views/cars.html', 'utf8', function (errors, contents){
      response.write(contents);
      response.end();
    });
  } else if(request.url === '/cats'){
    response.writeHead(200, {'Content-type': 'text/html'});
    fs.readFile('views/cats.html', 'utf8', function (errors, contents){
      response.write(contents);
      response.end();
    });
  } else if(request.url === '/stylesheet/style.css'){
    response.writeHead(200, {'Content-type': 'text/css'});
    fs.readFile('stylesheet/style.css', 'utf8', function (errors, contents){
      response.write(contents);
      response.end();
    });
  } else if(request.url === '/stylesheet/cat.jpg'){
    response.writeHead(200, {'Content-type': 'image/jpeg'});
    fs.readFile('/stylesheet/cat.jpg', 'image/jpeg', function (errors, contents){
      response.write(contents);
      response.end();
    });
  } else {
    response.end('File not found!!!');
  }
});
server.listen(8000);
console.log("Running in localhost at port 8000");