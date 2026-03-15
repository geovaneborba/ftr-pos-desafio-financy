import { MiddlewareFn } from "type-graphql";
import { GraphqlContext } from "../graphql/context";
import { GraphQLError } from "graphql/error";

export const requireAuth: MiddlewareFn<GraphqlContext> = (
  { context },
  next,
) => {
  if (!context.user) {
    throw new GraphQLError("O usuário não está autenticado.", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }

  return next();
};
