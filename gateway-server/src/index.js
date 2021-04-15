import dotenv from "dotenv";
dotenv.config();
import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server";
import connectMongoDB from "./db";

const isProd = process.env.NODE_ENV === "production";

let gatewayOptions = {
  debug: isProd ? false : true
};


gatewayOptions.serviceList = [
  { name: "authors", url: process.env.AUTHORS_SERVICE_URL },
  { name: "posts", url: process.env.BLOGS_SERVICE_URL }
];

connectMongoDB(process.env.MONGODB_URL)

const gateway = new ApolloGateway(gatewayOptions);
const server = new ApolloServer({
  gateway,
  subscriptions: false,
});


server.listen(process.env.GATEWAY_PORT).then(({ url }) => {
  console.log(`🚀 Gateway API running at ${url}`);
});