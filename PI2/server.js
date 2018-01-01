var express = require("express");
var app     = express();
var path    = require("path");

//Home 
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/homePage.html'));
  //__dirname : It will resolve to your project folder.
});

// Display
app.get('/Display',function(req,res){
  res.sendFile(path.join(__dirname+'/Display/demoBase.html'));
});

// Phone
app.get('/Phone',function(req,res){
  res.sendFile(path.join(__dirname+'/Phone/infos.html'));
});

var server = app.listen(8080, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})