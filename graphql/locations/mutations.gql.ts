import { updateWishlist } from "../../mongoose/locations/services";

export const locationMutationResolvers = {
  addWishlist: async (_: unknown, { user_id, location_id }: { user_id: string, location_id: string }) => {
    return await updateWishlist(user_id, location_id, true);
  },
  removeWishlist: async (_: unknown, { user_id, location_id }: { user_id: string, location_id: string }) => {
    return await updateWishlist(user_id, location_id, false);
  },
};

export const locationMutations = `
  type Mutation {
    addWishlist(user_id: String!, location_id: String!): Location
    removeWishlist(user_id: String!, location_id: String!): Location
  }
`;