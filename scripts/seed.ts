#!/usr/bin/env ts-node-script
/* eslint-disable no-console */
import dotenv from 'dotenv';
import { IOT } from '../src/model';

dotenv.config();

const iot = new IOT(process.env.DB_URI as string);

const seedDB = async () => {
    try {
        const connection = await iot.createConnection();
        console.info(connection);

        console.info('Seeding the user data into the database');

        const user: any = {
            role: 'ADMIN',
            email: 'admin@iot.com',
            password: '$2b$10$jzNU3zgmtpMFU3WWIix.gOoYWhsTHRjtgkTpCNORAPzFw1H/f62s2',
        };

        await IOT.user.createUser(user);
    } catch (error) {
        console.error(error);
        return error;
    }
};

seedDB().then(() => {
    console.info('Data seeded successfully');

    iot.closeConnection();
    process.exit(0);
});
