import { GraphQLError } from 'graphql';

/**
 * Graphql Authentication Error which returns an error with status code 400
 * @param {string} message error message to be thrown in error
 * @returns {GraphQLError} grapqhl error object
 */
export const AuthenticationError = (message: string): GraphQLError => {
    return new GraphQLError(message, {
        extensions: {
            code: 'AUTHENTICATION_ERROR',
            http: {
                status: 400,
            },
        },
    });
};
