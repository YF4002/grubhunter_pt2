import { gql } from "graphql-tag";
import { customTypes } from "./locations/custom.gql";
import { locationQueries } from "./locations/queries.gql";
import { locationMutations } from "./locations/mutations.gql";

export const typeDefs = gql`
  ${customTypes}
  ${locationQueries}
  ${locationMutations}
`;