import { ObjectId } from 'mongoose';

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface IUser extends Document {
    _id: ObjectId;
    role: UserRole;
    email: string;
    password: string;
    isActive: boolean;
    createdBy: ObjectId | '0';
    createdOn: Date;
    modifiedBy: ObjectId | '0';
    modifiedOn: Date;
}
