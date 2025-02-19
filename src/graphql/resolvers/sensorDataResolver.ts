import { IResolvers } from '@graphql-tools/utils';
import { logger } from '../../utility/logger';
import { IOT } from '../../model';

const sensorDataResolver: IResolvers = {
    Query: {
        getSensorData: async () => {
            try {
                logger.info('get sensor data query...');

                const sensorData = await IOT.sensorData.getSensorData({});
                logger.debug('sensorData: ', sensorData);

                return sensorData;
            } catch (error) {
                logger.error(error);
                return error;
            }
        },
        getLatestSensorData: async () => {
            try {
                logger.info('get latest sensor data...');

                const latestData = await IOT.sensorData.getLatestSensorData();
                logger.debug('latestData: ', latestData);

                return latestData;
            } catch (error) {
                logger.error(error);
                return error;
            }
        },
    },
    Mutation: {
        createSensorData: async (parent, { sensorDataInput }) => {
            try {
                logger.info('create sensor data mutation...');

                const sensorData =
                    await IOT.sensorData.createSensorData(sensorDataInput);
                logger.debug('sensorData: ', sensorData);

                return sensorData;
            } catch (error) {
                logger.error(error);
                return error;
            }
        },
    },
};

export default sensorDataResolver;
