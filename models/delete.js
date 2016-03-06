var mongoose = require('mongoose');
var Audit    = require('./Audit.js');


var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var deleteSchema = mongoose.Schema(Audit.audify({
    outputJSON             : {type: String},
    responseCode           : {type: String, required: true},
    module                 : [{type: ObjectId, ref: 'module'}]
}));


var Delete = mongoose.model('delete', deleteSchema);

module.exports = Delete;
