var mongoose = require('mongoose');

/**
 * User 정보를 담기 위한 Mongo DB model
 * @name userModel
 */
var bbsModel = function () {

  var bbsSchema = mongoose.Schema({
    content: String,
    username: String,
    vote: Number,
    date: { type: Date, default: Date.now }
  });
 

  return mongoose.model('Bbs', bbsSchema);
};

module.exports = new bbsModel();