import { set, connect, connection } from 'mongoose';
import { User } from './modules/user/User';
import { logger } from '../utility/logger';
import { SensorData } from './modules/sensorData/SensorData';

export class IOT {
    private readonly connectionUri?: string;
    public static user: User;
    public static sensorData: SensorData;

    constructor(connectionUri: string) {
        this.connectionUri = connectionUri;

        IOT.user = new User();
        IOT.sensorData = new SensorData();
    }

    /**
     * createConnection function establish connection with mongodb
     * @returns {Promise} promise which resolves on connection
     */
    public createConnection = (): Promise<any> =>
        new Promise<any>(async (resolve, reject) => {
            try {
                set('strictQuery', true); // For suppressing the mongoose 7 warning
                await connect(this.connectionUri as string);

                connection.on('connected', () => {
                    logger.info('Successfully connected to the database...');
                });

                connection.on('error', (err) => {
                    logger.error('Database connection error: ' + err);
                });

                connection.on('disconnected', () => {
                    logger.error('Database disconnected');
                });

                connection.on('reconnected', () => {
                    logger.info('Database reconnected');
                });

                connection.on('reconnectFailed', () => {
                    logger.error('Database failed to reconnect');
                });

                resolve('Successfully connected to the database.');
            } catch (error) {
                logger.error('Error while creating DB connection: ', error);
                reject(error);
            }
        });

    /**
     * closeConnection function will close connection from mongodb
     * @returns {Promise} promise which resolves on connection close
     */
    public closeConnection = (): Promise<boolean> =>
        new Promise<boolean>((resolve, reject) => {
            connection
                .close()
                .then(() => {
                    logger.info('DB connection closed.');
                    resolve(true);
                })
                .catch((error) => {
                    logger.error('Error while closing DB connection: ', error);
                    reject(error);
                });
        });
}
