import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@/generated/pothos-prisma-types';
import { PrismaClient } from '../generated/prisma/client';
import type { GraphQLContext } from "@/types/GraphQLContext";
import { GraphQLDateTime } from 'graphql-scalars';

// Add this type for ScalarsMap
type ScalarsMap = {
  Date: { Input: Date; Output: Date };
};

const prisma = new PrismaClient();

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: ScalarsMap;
  Context: GraphQLContext;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

export default builder;
