import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
},{ timestamps: true });

const Author = mongoose.models['author'] || mongoose.model('author', authorSchema);
export default Author;