const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

app.use(errorHandler);

const mongoURI = 'mongodb://warehouse-mongo:27017/warehouse';
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5005;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
