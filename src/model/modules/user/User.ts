import { ObjectId } from 'mongoose';
import { IUser } from './user.interface';
import userModel from './user.model';

export class User {
    /**
     * createUser function used to create a user
     * @param {IUser} userData
     * @returns {promise} resolved to user document
     */
    public createUser = (userData: IUser): Promise<IUser> =>
        new Promise<IUser>((resolve, reject) => {
            userData.createdOn = new Date();

            userModel
                .create(userData)
                .then((user) => {
                    resolve(user);
                })
                .catch((error) => {
                    reject(error);
                });
        });

    /**
     * getUsers function is used to retrieve the users list
     * @param {Partial<IUser>} filter
     * @returns {promise} resolved to the user docuements
     */
    public getUsers = (filter: Partial<IUser>): Promise<IUser[]> =>
        new Promise<IUser[]>((resolve, reject) => {
            userModel
                .find(filter)
                .then((users) => {
                    resolve(users);
                })
                .catch((error) => {
                    reject(error);
                });
        });

    /**
     * deleteUser function is used to delete the user
     * @param {ObjectId} userId
     * @returns {promise} resolves to the deleted document
     */
    public deleteUser = (userId: ObjectId): Promise<IUser | null> =>
        new Promise<IUser | null>((resolve, reject) => {
            userModel
                .findByIdAndDelete(userId)
                .then((deluser) => {
                    resolve(deluser);
                })
                .catch((error) => {
                    reject(error);
                });
        });
}
