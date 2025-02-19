import { IResolvers } from '@graphql-tools/utils';
import { merge } from 'lodash';

import { customScalarResolver } from './resolvers/customScalarResolver';
import userResolver from './resolvers/userResolver';
import sensorDataResolver from './resolvers/sensorDataResolver';

const resolverMap: IResolvers = merge(
    customScalarResolver,
    userResolver,
    sensorDataResolver,
);

export default resolverMap;
