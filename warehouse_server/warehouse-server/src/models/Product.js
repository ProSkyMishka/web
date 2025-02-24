const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  count: { type: Number, required: true },
  meas: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String } 
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', ProductSchema);
