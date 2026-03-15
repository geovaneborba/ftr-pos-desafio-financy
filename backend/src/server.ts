import "reflect-metadata";
import express from "express";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import { buildContext } from "./graphql/context";

import { AuthResolver } from "./resolvers/auth.resolver";
import { CategoryResolver } from "./resolvers/category.resolver";
import { TransactionResolver } from "./resolvers/transaction.resolver";
import { ProfileResolver } from "./resolvers/profile.resolver";

async function bootstrap() {
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    }),
  );

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      TransactionResolver,
      CategoryResolver,
      ProfileResolver,
    ],
    validate: false,
    emitSchemaFile: "./schema.graphql",
  });

  const server = new ApolloServer({ schema });

  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: buildContext,
    }),
  );

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Servidor rodando http://localhost:4000/graphql 🔥`),
  );
}

bootstrap();
