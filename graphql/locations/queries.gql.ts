import { 
  findAllLocations, 
  findLocationById, 
  findLocationsByIds, 
  findWishlistForUser 
} from "../../mongoose/locations/services";

export const locationQueryResolvers = {
  allLocations: async () => {
    return await findAllLocations();
  },
  locationsById: async (_: unknown, { location_ids }: { location_ids: string[] }) => {
    return await findLocationsByIds(location_ids);
  },
  onUserWishlist: async (_: unknown, { user_id }: { user_id: string }) => {
    return await findWishlistForUser({ userId: user_id });
  },
};

export const locationQueries = `
  type Query {
    allLocations: [Location]
    locationsById(location_ids: [String]!): [Location]
    onUserWishlist(user_id: String!): [Location]
  }
`;