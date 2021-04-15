import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true,'title is  required']  
  },
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  content: {
    type: String,
    required: [true,'blog content is  required']  
  },
  likes:  {
    type: Number, 
    required: true,
    default: 0
  },
  publishedAt: {
    type: String
  }
},{ timestamps: true });

const Blog = mongoose.models['blog'] || mongoose.model('blog', blogSchema);
export default Blog;