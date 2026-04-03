import { locationQueryResolvers } from "./locations/queries.gql";
import { locationMutationResolvers } from "./locations/mutations.gql";

export const resolvers = {
  Query: {
    ...locationQueryResolvers,
  },
  Mutation: {
    ...locationMutationResolvers,
  },
};