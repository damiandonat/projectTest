var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
* Image
* Name
* Description
* Price
*/

var Plan = new Schema({
  name: String,
  description: String,
  price: Number,
  img: String,
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plan', Plan);
