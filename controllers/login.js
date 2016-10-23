var User = require('../models/user');
path = require('path')
module.exports = {

	logout: function(req,res){
		req.logout();
		res.send({redirect:'home.dash'});
	},
	signup: function(req,res){
		console.log('signed up!');
		res.send({redirect:'home.dash', user: req.user});
	},
	login: function(req,res){
		console.log('logged in');
		res.send({redirect:'home.dash', user: req.user});
	}
}