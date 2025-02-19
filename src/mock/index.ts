import { io } from '../index';
import { IOT } from '../model';
import { ISensorData } from '../model/modules/sensorData/sensorData.interface';
import { logger } from '../utility/logger';

/**
 * mockSensorData function is used to generate the mock sensor data
 */
export const mockSensorData = async () => {
    try {
        logger.info('mock sensor data...');

        // create mock sensor data
        const sensorData = {
            temperature: (20 + Math.random() * 10).toFixed(2),
            humidity: Math.floor(30 + Math.random() * 50),
            powerUsage: (100 + Math.random() * 200).toFixed(2),
            createdOn: new Date(),
        };
        logger.debug('sensorData: ', sensorData);

        // save the mock data
        await IOT.sensorData.createSensorData(
            sensorData as unknown as ISensorData,
        );

        // broadcast the socket event
        io.emit('updateSensorData', sensorData);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

/**
 * Scheduling the events
 */
setInterval(
    () => {
        mockSensorData();
    },
    parseInt(process.env.MOCK_INTERVAL as string),
);
