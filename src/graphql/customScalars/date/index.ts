import { GraphQLScalarType, Kind } from 'graphql';

// Serializes a Date into a RFC 3339 compliant date-string
// in the format YYYY-MM-DD.
const serializeDate = (date: Date): string => {
    return date.toISOString();
};

// Parses an RFC 3339 compliant date-string into a Date.
//
// Example:
// parseDate('2016-01-01') parses to a Date corresponding to
// 2016-01-01T00:00:00.000Z.
const parseDate = (date: string): Date => {
    return new Date(date);
};

const GraphQLDateTime: GraphQLScalarType = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        if (value instanceof Date) {
            // tslint:disable-next-line: no-use-before-declare
            return serializeDate(value);
        } else if (typeof value === 'string') {
            return value;
        } else {
            throw new TypeError(
                'Date cannot represent a non string, or non Date type ' +
                    JSON.stringify(value)
            );
        }
    },
    parseValue(value: any) {
        if (typeof value !== 'string') {
            throw new TypeError(
                `Date cannot represent non string type ${JSON.stringify(value)}`
            );
        }
        // tslint:disable-next-line: no-use-before-declare
        return parseDate(value);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            // Convert hard-coded AST string to integer and then to Date
            return new Date(parseInt(ast.value, 10));
        }

        // Invalid hard-coded value (not an integer)
        throw new TypeError('Date cannot represent an invalid date-string.');
    },
});

export default GraphQLDateTime;
