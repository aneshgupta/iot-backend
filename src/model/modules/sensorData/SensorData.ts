import { DeleteResult } from 'mongoose';
import { ISensorData } from './sensorData.interface';
import sensorDataModel from './sensorData.model';

export class SensorData {
    /**
     * createSensorData function is used to create sensor data
     * @param {ISensorData} sensorData
     * @returns {Promise} resolves to the inserted document
     */
    public createSensorData = (sensorData: ISensorData): Promise<ISensorData> =>
        new Promise<ISensorData>((resolve, reject) => {
            sensorData.createdOn = new Date();

            sensorDataModel
                .create(sensorData)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });

    /**
     * getSensorData function is used to retrive the sensor data
     * @param {object} filter
     * @returns {Promise} resolves to the documents
     */
    public getSensorData = (filter: any): Promise<ISensorData[]> =>
        new Promise<ISensorData[]>((resolve, reject) => {
            sensorDataModel
                .find(filter)
                .then((sensors) => {
                    resolve(sensors);
                })
                .catch((error) => {
                    reject(error);
                });
        });

    /**
     * getLatestSensorData function is used to retrive latest data
     * @returns {Promise} resolves to the latest document
     */
    public getLatestSensorData = (): Promise<ISensorData> =>
        new Promise<ISensorData>((resolve, reject) => {
            sensorDataModel
                .find({})
                .sort({ createdOn: -1 })
                .limit(1)
                .then((data) => {
                    resolve(data[0]);
                })
                .catch((error) => {
                    reject(error);
                });
        });

    /**
     * deleteSensorsdata function is used to delete the sensors data
     * @param {object} filter
     * @returns {Promise} resolves to the deleted documents
     */
    public deleteSensorsdata = (filter: any): Promise<DeleteResult> =>
        new Promise<DeleteResult>((resolve, reject) => {
            sensorDataModel
                .deleteMany(filter)
                .then((delData) => {
                    resolve(delData);
                })
                .catch((error) => {
                    reject(error);
                });
        });
}
