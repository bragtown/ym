var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var WardSchema = new Schema({
	name:{type:String},
	primaryUser:Schema.Types.ObjectId,
	users:[Schema.Types.ObjectId]
});

module.exports = mongoose.model('Ward', WardSchema);