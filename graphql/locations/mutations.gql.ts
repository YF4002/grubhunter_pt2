import { updateWishlist } from "../../mongoose/locations/services";
import { authGuard } from "@/middleware/auth-guard";
import { JWT } from "next-auth/jwt";

interface MutationParams {
  user_id: string;
  location_id: string;
}

interface ResolverContext {
  token: JWT | null;
}

export const locationMutationResolvers = {
  addWishlist: async (_: unknown, params: MutationParams, context: ResolverContext) => {
    const guard = authGuard(params, context);
    
    if (guard !== true) return guard;
    
    return await updateWishlist(params.user_id, params.location_id, true);
  },

  removeWishlist: async (_: unknown, params: MutationParams, context: ResolverContext) => {
    const guard = authGuard(params, context);
    
    if (guard !== true) return guard;
    
    return await updateWishlist(params.user_id, params.location_id, false);
  },
};

export const locationMutations = `
  type Mutation {
    addWishlist(user_id: String!, location_id: String!): Location
    removeWishlist(user_id: String!, location_id: String!): Location
  }
`;