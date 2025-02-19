import { Request } from 'express';
import { Context } from '../interfaces';
import { logger } from '../utility/logger';
import { AuthenticationError } from '../graphql/graphqlError';
import { verifyToken } from '../utility/jwt';
import { IOT } from '../model';
import { byPassOperations, userOperations } from '../constants';
import { UserRole } from '../model/modules/user/user.interface';

export const authHandler = (req: Request): Promise<Context> =>
    new Promise<Context>(async (resolve, reject) => {
        try {
            const authHeader = req.headers.authorization;
            const operationName = req.body.operationName;
            logger.info('operationName: ', operationName);

            // bypass the login operation
            if (byPassOperations.includes(operationName)) {
                resolve({ user: {} });
            }

            if (authHeader) {
                const token = authHeader.replace('Bearer ', '');

                // verify the token
                const payload = verifyToken(token);

                if (payload) {
                    const { email } = payload;
                    // check the user in database
                    const user = (
                        await IOT.user.getUsers({
                            email,
                            isActive: true,
                        })
                    )[0];

                    if (user) {
                        // check for the user role
                        if (
                            user.role === UserRole.USER &&
                            !userOperations.includes(operationName)
                        ) {
                            reject(
                                AuthenticationError(
                                    'User is not authorized!!!',
                                ),
                            );
                        }

                        resolve({ user });
                    } else {
                        reject(
                            AuthenticationError('User is not authorized!!!'),
                        );
                    }
                } else {
                    reject(AuthenticationError('User is not authorized!!!'));
                }
            } else {
                reject(AuthenticationError('Authorization details not found!'));
            }
        } catch (error: any) {
            logger.error(error);
            reject(AuthenticationError(error.message));
        }
    });
