import { IResolvers } from '@graphql-tools/utils';
import { logger } from '../../utility/logger';
import { IOT } from '../../model';
import { compareHash, generateHash } from '../../utility/hashing';
import { IUser } from '../../model/modules/user/user.interface';
import { AuthenticationError } from '../graphqlError';
import { createToken } from '../../utility/jwt';

const userResolver: IResolvers = {
    Query: {
        getUsers: async () => {
            try {
                logger.info('get users query...');

                const users = await IOT.user.getUsers({});
                logger.debug('users: ', users);

                return users;
            } catch (error) {
                logger.error(error);
                return error;
            }
        },
    },
    Mutation: {
        createUser: async (parent, { userInput }) => {
            try {
                logger.info('create user mutation...');

                const { email, password, role } = userInput;

                // create password hash
                const hashPassword = await generateHash(password);

                // create user
                const user = await IOT.user.createUser({
                    email,
                    password: hashPassword,
                    role,
                } as IUser);
                logger.debug('user: ', user);

                return user;
            } catch (error) {
                logger.error(error);
                return error;
            }
        },
        login: async (parent, { loginInput }) => {
            try {
                logger.info('login mutation...');

                const { email, password } = loginInput;

                logger.debug('email: ', email);

                // check the user in database
                const user = (
                    await IOT.user.getUsers({ email, isActive: true })
                )[0];

                if (user) {
                    const { password: userPassword, role } = user;

                    // check the user password
                    const result = await compareHash(password, userPassword);

                    if (result) {
                        // generate the user token
                        const token = createToken({ email, role });
                        logger.debug('token: ', token);

                        return { token };
                    } else {
                        return AuthenticationError(
                            'User password is invalid!!!',
                        );
                    }
                } else {
                    return AuthenticationError('User not found!!!');
                }
            } catch (error) {
                logger.error(error);
                return error;
            }
        },
        deleteUser: async (parent, { userId }) => {
            try {
                logger.info('delete user mutation...');

                const delUser = await IOT.user.deleteUser(userId);
                logger.debug('delUser: ', delUser);

                return delUser;
            } catch (error) {
                logger.error(error);
                return error;
            }
        },
    },
};

export default userResolver;
