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
	},
	update:function(req,res){
		var user = req.user;
		console.log(user, req.body);
		user.fName = req.body.fName
		user.lName = req.body.lName
		user.local.email = req.body.email
		if(req.body.password != undefined && req.body.confPass != undefined && req.body.password == req.body.confPass){
			console.log(req.body.password)
			user.local.password = user.generateHash(req.body.password);
		}
		user.save(function(err){
			if(err)
				console.log(err)
			else{
				res.send({message:"success"})
			}
		})
	}
}