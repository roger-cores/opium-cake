var mongoose = require('mongoose');
var Audit    = require('./Audit.js');


var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var postSchema = mongoose.Schema(Audit.audify({
    inputJSON           : {type: String, required: true},
    outputJSON             : {type: String},
    responseCode           : {type: String, required: true},
    module                 : [{type: ObjectId, ref: 'module'}]
}));


var Post = mongoose.model('post', postSchema);

module.exports = Post;
