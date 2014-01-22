
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./controller/routes/GeneralData.js'),
	app = express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.cookieParser('thsnxkd'));
	app.use(express.cookieSession());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
	res.send('hello world');
});
app.post('/register',function(req,res,next){
	routes.Register(req,res,next);
})

app.listen(3000,function(){
	console.log('Server Started');
});
