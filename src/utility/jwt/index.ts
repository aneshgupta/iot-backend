import jwt from 'jsonwebtoken';
import { Payload } from '../../interfaces';

/**
 * createToken is used to generate the jwt token
 * @param payload
 * @returns token
 */
export const createToken = (payload: Payload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '24h',
    });
};

/**
 * verifyToken is used to verify & decode the jwt token
 * @param token
 * @returns payload
 */
export const verifyToken = (token: string): Payload => {
    return jwt.verify(token, process.env.JWT_SECRET as string) as Payload;
};
