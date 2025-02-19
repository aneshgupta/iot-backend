import { model, Schema } from 'mongoose';
import { IUser, UserRole } from './user.interface';

export const validateEmail = (emailAddress: string) => {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(emailAddress);
};

const UserSchema: Schema = new Schema({
    role: {
        type: String,
        enum: Object.keys(UserRole),
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validateEmail,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    createdBy: {
        type: Schema.Types.Mixed,
        required: true,
        default: '0',
    },
    createdOn: {
        type: Date,
        required: true,
    },
    modifiedBy: {
        type: Schema.Types.Mixed,
    },
    modifiedOn: {
        type: Date,
    },
});

export default model<IUser>('User', UserSchema);
