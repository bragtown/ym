var Youth = require('../models/youth');
var Org = require('../models/org')
var Event = require('../models/event')
module.exports = {
	sendIndex: function(req,res){
		res.redirect("/public/app/index.html")
	},
	newOrg:function(req,res){
		console.log(req.body)
		Org.find({'name':req.body.org}).exec(function(err, orgs){
			console.log("org:" + orgs +', ' + orgs.length);
			if(orgs.length == 0){
				var org = new Org();
				org.name = req.body.org
				org.primaryUser = req.user._id
				org.users.push(req.user._id)
				org.save(function(err, upOrg){
					if(err){
						console.log(err)
					}
					else{
						//if the user record has youth associated with it, migrate to the org record
						// Youth.find({'creator': req.user.id}).exec(function(err, youth){
						// 	for(var i = 0; i < youth.length; i++){
						// 		var y = youth[i];
						// 		y.org = upOrg._id;
						// 		y.save(function(err){
						// 			if(err)
						// 				console.log(err)
						// 		})
						// 	}
						// })
						res.send({
							message:"success",
							org:upOrg
						})
					}
				})
			}
			else{
				res.send({
					message:"This Org already exists!"
				})

			}
		})
	},
	addEvent:function(req,res){
		var event = new Event()
		event.date = req.body.date
		event.data = req.body.data
		event.org = req.user.curOrg
		event.save(function(err, ev){
			if(err){
				console.log(err)
			}
			else{
				res.send({message:'success', newEvent:ev})
			}
		})
	},
	getEvents:function(req,res){
		stDate = new Date()
		stDate.setMonth(stDate.getMonth -1)
		stDate.setDate(1)
		console.log(stDate);
		Event.find({'org':req.user.curOrg, 'date':{"$gte":stDate}}).sort('date').exec(function(err, events){

			res.send(events)
		})
	},
	deleteEvent:function(req,res){
		//console.log(req.body)
		Event.findOne({'_id':req.query.id}).remove().exec(function(err, event){
			if(err)
				console.log(err)
			else{
				console.log("deleting event:" + event)
				res.send({message:'Success!'})

			}
		})
	},
	getMyOrgs: function(req,res){
		Org.find().all('users', [req.user._id]).exec(function(err, orgs){
			if(err)
				console.log(err)
			else
				res.send(orgs)
		})
	},
	shareOrg:function(req,res){
		Org.findOne({'_id':req.user.curOrg}).exec(function(err, org){
			//email to shared with list
			//generate a confirmation code
			//email user
			//link should be a special log in with a confirmation code
			org.sharedWith.push({email: req})
			org.save(function(err){
				if(err)
					console.log(err)
				else{
					res.send({message:'success!'})
				}
			})
		})
	},
	updateOrg: function(req,res){
		var user = req.user
		user.curOrg = req.body.id
		user.curOrgName = req.body.name
		user.save(function(err){
			if(err)
				console.log(err)
			else{
				res.send({message:"success"})
			}
		})
	},
	getYouth: function	(req,res){
			Youth.find({'org': req.user.curOrg}).sort('birthday').exec(function(err, youth){
				if(err)
					res.send({error:err})
				else{
					res.send(youth);
				}
			})
	},
	addYouth:function(req,res){
		var youth = new Youth();
		var y = req.body;

		youth.fName = y.fName;
		youth.lName = y.lName;
		youth.birthday = y.birthday;
		youth.notes = y.notes;
		youth.creator = req.user._id;
		youth.save(function	(err){
			if(err){
				res.send({error:err});
			}
			else{
				res.send({message:"Success!"});
			}
		})
	},
	attendance:function(req,res){
		Youth.findOne({'creator': req.user._id, '_id':req.body._id}).exec(function(err, youth){
			if(err)
				console.log(err)
			else{	
				if(youth.attendance == undefined){
					youth.attendance = [];
					youth.attendance.push(req.body.update);
				}
				else
					youth.attendance.push(req.body.update);
				youth.save(function(err, updatedYouth){
					if(err){
						res.send({error:err});
					}
					else{
						res.send({message:"Success!", y:updatedYouth});
					}
				})	
			}		
		})
	},
	updateYouth:function(req, res){
		Youth.findOne({'creator': req.user._id, '_id':req.body._id}).exec(function(err, youth){
			if(err){
				console.log(err)
			}
			else{
				y = req.body;

				youth.fName = y.fName;
				youth.lName = y.lName;
				youth.birthday = y.birthday;
				youth.notes = y.notes;
				youth.parentOne = y.parentOne
				youth.parentTwo = y.parentTwo
				youth.parentOnePhone = y.parentOnePhone
				youth.parentOneCarrier = y.parentOneCarrier
				youth.parentTwoCarrier = y.parentTwoCarrier
				youth.phone = y.phone
				youth.parentOneEmail = y.parentOneEmail
				youth.parentTwoEmail = y.parentTwoEmail
				youth.email = y.email
				if(y.newAssignment != undefined && y.newAssignment != ""){
					youth.assignments.unshift(y.newAssignment);
				}
				youth.save(function	(err, upYouth){
					if(err){
						res.send({error:err});
					}
					else{
						res.send({message:"Success!", y:upYouth});
					}
				})
			}
		})
	},
	deleteYouth:function(req, res){
		Youth.findOne({'creator': req.user._id, '_id':req.query.id}).remove().exec(function(err, youth){
			console.log("result function")
			if(err){
				console.log(err)
			}
			else{
				res.send({message:"Success!"})
			}
			
			
		})
	}
}