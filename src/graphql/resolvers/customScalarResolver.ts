import GraphQLDateTime from '../customScalars/date';

export const customScalarResolver: any = {
    Date: GraphQLDateTime,
};
