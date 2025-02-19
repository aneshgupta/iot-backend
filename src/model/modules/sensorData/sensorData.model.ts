import { model, Schema } from 'mongoose';
import { ISensorData } from './sensorData.interface';

const SensorDataSchema: Schema = new Schema({
    temperature: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
    powerUsage: {
        type: Number,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
    },
});

export default model<ISensorData>('SensorData', SensorDataSchema);
