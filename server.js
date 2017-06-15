var express = require('express');
var app = express();

var rockGame = require('./rock.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/game', function(request, response) {
	handleGame(request, response);
});

function handleGame(request, response) {
	var playerChoice = request.query.player_choice;
	console.log("Player Choice: " + playerChoice);

	rockGame.play(playerChoice, function(error, results) {
		response.render("pages/results.ejs", results);
	});
}

app.get('/game_service', function(request, response) {
	handleGameService(request, response);
});

function handleGameService(request, response) {
	var playerChoice = request.query.player_choice;
	console.log("Player Choice: " + playerChoice);

	rockGame.play(playerChoice, function(error, results) {
		response.setHeader('Content-Type', 'application/json');
    	response.send(results);
	});
}

app.get('/', function(request, response) {
	console.log("Got a request for /");

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<html><body><h1>Test</h1></body></html>")
	response.end();

});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
