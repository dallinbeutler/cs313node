var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/math', function(request, response) {
  //var returnedURL = url.parse(request.url).pathname;
  console.log(request.url);
  var p1 = request.query.var1;
  var p2 = request.query.var2;
  p1 = Number(p1);
  p2 = Number(p2);
  var result =  p1 + p2;
  console.log("Addition result is: " + result);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});