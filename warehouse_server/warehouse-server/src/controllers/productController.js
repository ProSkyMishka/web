const Product = require('../models/Product');

exports.createProduct = async (req, res, next) => {
  try {
    const { title, description, category, count, meas, price, image } = req.body;
    
    if (price <= 0) {
      return res.status(400).json({ message: 'Price must be a positive number.' });
    }

    if (count < 0) {
      return res.status(400).json({ message: 'Count cannot be negative.' });
    }
      
    if (!title || !description || count == null || !meas || price == null) {
      return res.status(400).json({ message: 'All fields except image are required.' });
    }
    const product = new Product({ title, description, category, count, meas, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const products = await Product.find().populate('category').skip(offset).limit(limit);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { title, description, category, count, meas, price, image } = req.body;
    if (price <= 0) {
      return res.status(400).json({ message: 'Price must be a positive number.' });
    }

    if (count < 0) {
      return res.status(400).json({ message: 'Count cannot be negative.' });
    }

    const product = await Product.findByIdAndUpdate(
    req.params.id,
      { title, description, category, count, meas, price, image },
      { new: true, runValidators: true }
    ).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
