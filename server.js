var express = require('express')  //require express
var config = require('./server/configure')  //require all other modules and use them
var app = express();  //use express. All its functions available via app
var mongoose = require('mongoose');
app.set('port', process.env.PORT || 9000);  //listen on the port
app.set('views', __dirname + '/views'); 
app = config(app);

mongoose.connect('mongodb://127.0.0.1:27017/mean');
mongoose.connection.on('open', function(){
	console.log('Mongoose connected!');
});
var server = app.listen(app.get('port'),function(){
	console.log('Server up: http://127.0.0.1:'+ app.get('port'));
});