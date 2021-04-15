import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

import { resolvers } from "./resolver";
import { typeDefs } from "./typedefs";

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer({ schema });

server.listen(process.env.AUTHORS_SERVICE_PORT).then(({ url }) => {
  console.log(`🚀 Author service ready at ${url}`);
});