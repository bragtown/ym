var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var YouthSchema = new Schema({
	fName:{type:String},
	lName:{type:String},
	attendance:[Schema.Types.Mixed],
	birthday:{ type: Date},
	assignments:[Schema.Types.Mixed],
	notes:{type:String},
	creator:Schema.Types.ObjectId,
	parentOne:{type:String},
	parentTwo:{type:String},
	parentOnePhone:{type:String},
	parentOneCarrier:{type:String},
	parentTwoCarrier:{type:String},
	parentTwoPhone:{type:String},
	phone:{type:String},
	carrier:{type:String},
	email:{type:String},
	parentOneEmail:{type:String},
	parentTwoEmail:{type:String},
	org:Schema.Types.ObjectId


});

YouthSchema.virtual('age').get(function(){
	var curDate = new Date().getTime()
	var ageSecs = curDate - this.birthday.getTime()
	return (ageSecs/1000/60/60/24/365)
})

module.exports = mongoose.model('Youth', YouthSchema);