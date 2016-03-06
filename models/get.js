var mongoose = require('mongoose');
var Audit    = require('./Audit.js');


var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var getSchema = mongoose.Schema(Audit.audify({
    outputJSON             : {type: String},
    responseCode           : {type: Number,default:200,required: true},
    module                 : [{type: ObjectId, ref: 'module'}]
}));


var Get = mongoose.model('get', getSchema);

module.exports = Get;
