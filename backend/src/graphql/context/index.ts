import { ExpressContextFunctionArgument } from "@as-integrations/express5";
import { JwtPayload, verifyJwt } from "../../utils/jwt";

export type GraphqlContext = {
  user: string | undefined;
  token: string | undefined;
  req: ExpressContextFunctionArgument["req"];
  res: ExpressContextFunctionArgument["res"];
};

const extractTokenFromHeader = (
  req: ExpressContextFunctionArgument["req"],
): string | undefined => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return undefined;
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return undefined;
  }

  return token;
};

const getUserFromToken = (token: string): string | undefined => {
  try {
    const payload = verifyJwt(token) as JwtPayload;

    return payload.id;
  } catch (error) {
    return undefined;
  }
};

export const buildContext = async ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphqlContext> => {
  const token = extractTokenFromHeader(req);
  const user = token ? getUserFromToken(token) : undefined;

  return {
    user,
    token,
    req,
    res,
  };
};
