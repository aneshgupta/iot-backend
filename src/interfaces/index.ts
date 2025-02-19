import { IUser, UserRole } from '../model/modules/user/user.interface';

export interface LogConfig {
    path: {
        debugLogs: string;
    };
    level: string;
}

export interface Context {
    user: Partial<IUser>;
}

export interface Payload {
    email: string;
    role: UserRole;
}
