module.exports.audify = function(object){
  object.createdAt = {type: Date, required: true};
  object.modifiedAt = {type: Date, required: true};
  object.createdBy = {type: String, required: true};
  object.modifiedBy = {type: String, required: true};
  object.active = {type: Boolean, required: true, default: true};

  return object;
}
