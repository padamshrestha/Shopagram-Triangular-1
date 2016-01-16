var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Products = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  product: String,
  url: String
});

module.exports = mongoose.model('Products', Products);