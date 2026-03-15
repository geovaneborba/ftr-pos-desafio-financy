import { createParameterDecorator, ResolverData } from "type-graphql";
import { GraphqlContext } from "../context";
import { prismaClient } from "../../../prisma/prisma";

export const GqlUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphqlContext>) => {
      if (!context || !context.user) {
        return null;
      }

      try {
        const user = await prismaClient.user.findUnique({
          where: { id: context.user },
        });

        if (!user) {
          throw new Error("O usuário não existe");
        }

        return user;
      } catch (error) {
        console.error("Erro ao instanciar o GqlUser:", error);
        return null;
      }
    },
  );
};
