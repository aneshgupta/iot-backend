import bcrypt from 'bcrypt';

/**
 * generateHash function is used to generate the unique has string from the password key
 * @param {string} password
 * @returns {Promise} promise which resolves to the hash key
 */
export const generateHash = (password: string): Promise<string> =>
    new Promise<string>((resolve, reject) => {
        const saltRounds = 10;

        bcrypt
            .genSalt(saltRounds)
            .then((salt: any) => {
                resolve(bcrypt.hash(password, salt));
            })
            .catch((error: any) => {
                reject(error);
            });
    });

/**
 * compareHash function is used to compare the password and their hash key
 * @param {string} password
 * @param {string} hash
 * @returns {Promise} promise which resolves to the result
 */
export const compareHash = (password: string, hash: string): Promise<boolean> =>
    new Promise<boolean>((resolve, reject) => {
        bcrypt
            .compare(password, hash)
            .then((result: any) => {
                resolve(result);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
