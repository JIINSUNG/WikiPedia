var http = require('http');
var fs = require('fs');
var url = require('url');
const qs = require('querystring');

var input = `<form action="http://localhost:3000/searched" name="title" method="post">
<input type="text" placeholder="원하는 검색어를 입력부탁드립니다" name="title" required />
<input type="submit">
</form>`;  

var greeting=``;

function template(greeting,data)
{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Heeju Pedia</title>
    </head>
    <body>
        ${greeting}
        ${data}
        <span id ="Data"></span>
    
    </body>
    </html>`;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;



    if(pathname === '/'){
      greeting = `<h1>Welcome to HeejuPedia</h1>`;
      response.writeHead(200);
      response.end(template(greeting, input)); 
    }

    else if(pathname === '/searched')
    {   
        greeting = `<h1>Searcehd Data</h1>`;

            var body = '';
            request.on('data', function (data) {
                body += data;
            });
    
            request.on('end', function () {
                var post = qs.parse(body);
                console.log(post.title);

                fs.readFile(`${post.title}.txt`,'utf8',function(err,data){
                    response.writeHead(200);
                    response.end(template(greeting,data)); 
                });            
            });

    }

})

app.listen(3000);
