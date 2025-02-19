import { Document, ObjectId } from 'mongoose';

export interface ISensorData extends Document {
    _id: ObjectId;
    temperature: number;
    humidity: number;
    powerUsage: number;
    createdOn: Date;
}
