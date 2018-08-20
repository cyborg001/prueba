const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cgrs27:Carlos1978_@cluster0-ljc4k.mongodb.net/test?retryWrites=true',{autoIndex:false});


const Schema = mongoose.Schema;
var clienteSchema = new Schema({
	nombre:{type: String,required:true},
	telefono:String,
	servicio:String,
});
module.exports = mongoose.model('Cliente',clienteSchema);