var http = require('http');
var url = require('url');

http.createServer(function onRequest(req, res){
    if(req.url == '/home'){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("<h1>Hello World</h1>");
    }
    else if(req.url == '/getData'){
        res.writeHead(200, {"Content-Type": "application/json"});
        var nameTeach = {"name":"Loren Miller","class":"cs313"};
        res.write(JSON.stringify(nameTeach));
    }
    else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write("Page Not Found");
    }
    res.end();
}).listen(8888)