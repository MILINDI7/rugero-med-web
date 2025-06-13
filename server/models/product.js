import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true },
//   price: { type: String, required: false },  // "Contact Us" or actual price
  category: { 
    type: String, 
    required: true, 
    enum: ['CSSD', 'Hospital Design', 'Plastic Surgery', 'Neurosurgery', 'Theatre', 'Home Care']
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
