import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import dbConnect from "@/middleware/mongoose";
import { getToken } from "next-auth/jwt";


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req) => {
    const token = await getToken({ req });
  return { token };
},
});

export default async function graphqlHandler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await dbConnect();

  return handler(req, res);
}