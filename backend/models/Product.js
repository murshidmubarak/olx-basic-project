import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: String,

    category: String,

    price: Number,

    description: String,

    location: String,

    image: String,
    
    imagePublicId: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model(
  'Product',
  productSchema
);

export default Product;