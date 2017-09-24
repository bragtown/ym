var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventSchema = new Schema({
	date:{type:Date},
	data:{type:String},
	org:Schema.Types.ObjectId
});

module.exports = mongoose.model('Event', EventSchema);