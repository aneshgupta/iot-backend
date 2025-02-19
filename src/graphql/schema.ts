import 'graphql-import-node';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolverMap';

import * as userTypeDef from './schemas/user.gql';
import * as sensorDataTypeDef from './schemas/sensoraData.gql';

const typeDefs = [userTypeDef, sensorDataTypeDef];

const schema: any = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;
