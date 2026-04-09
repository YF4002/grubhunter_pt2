import { GraphQLError } from 'graphql';
import { JWT } from 'next-auth/jwt';

interface paramInterface { user_id: string; location_id: string; }
interface contextInterface { token: JWT | null; }

export const authGuard = (params: paramInterface, context: contextInterface) => {
  const token = context.token;
  if (!token || !token.fdlst_private_userId) {
    return new GraphQLError("User is not authenticated", {
      extensions: { code: 'UNAUTHENTICATED', http: { status: 500 } }
    });
  }
  if (token.fdlst_private_userId !== params.user_id) {
    return new GraphQLError("User is not authorized", {
      extensions: { code: 'UNAUTHORIZED', http: { status: 500 } }
    });
  }
  return true;
};