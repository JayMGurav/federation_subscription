import { gql } from "apollo-server";

export const typeDefs = gql`
  type Blog {
    id: ID!
    author: Author!
    content: String!
    publishedAt: String!
    title: String!
    likes: Int!
  }
  extend type Author @key(fields: "id") {
    id: ID! @external
    blogs: [Blog]
  }
  extend type Query {
    blog(id: ID!): Blog
    blogs: [Blog]
  }
  extend type Mutation {
    addBlog(authorID: ID!, content: String, title: String): Blog
    likeBlog(id: ID!): Boolean!
  }
`;