import Author from './model';

export const resolvers = {
  Author: {
    async __resolveReference(reference, context, info) {
      return await Author.findById(reference.id).exec();
    }
  },

  Query: {
    async author(parent, { id }, context, info) {
      return await Author.findById(id).exec();
    },
    async authors(parent, args, context, info) {
      return await Author.find({}).exec();
    }
  }
};