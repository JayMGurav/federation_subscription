import { pubsub } from "../../redis";
import Blog from "./model";

const Blog_ADDED = "Blog_ADDED";
const Blog_LIKED = "Blog_LIKED";

export const resolvers = {
  Author: {
    async blogs(author) {
      return await Blog.find({authorID:author.id}).exec();
    }
  },

  Blog: {
    async author(blog) {
      return { __typename: "Author", id: blog.authorID };
    }
  },

  Query: {
    async blog(_, { id }) {
      return await Blog.findById(id).exec();
    },
    async blogs() {
      return await Blog.find({}).exec();
    }
  },

  Mutation: {
    async addblog(_, args) {
      const blog = await Blog.create({
        ...args,
        publishedAt: new Date().toISOString()
      });


      // Publish to `Blog_ADDED` in the shared Redis instance
      pubsub.publish(Blog_ADDED, { blogAdded: blog });
      
      return blog;
    },
    async likeBlog(_, {id}){
      // TODO
      pubsub.publish(Blog_LIKED, { blogId: id });
      return true;
    }
  }
};