import mongoose, { Schema, Document } from 'mongoose';

export interface IGeneralInfo extends Document {
    startDate: Date;
    endDate: Date;
    location: {
        name: string;
        area: string;
        city: string;
        country: string;
    }
}

const GeneralInfoSchema: Schema = new Schema({
    startDate: {
        type: Date,
        required: [true, 'Please provide a start date for the event'],
    },
    endDate: {
        type: Date,
        required: [true, 'Please provide an end date for the event'],
    },
    location: {
        name: {
            type: String,
            required: [true, 'Please provide the location name'],
            trim: true,
        },
        area: {
            type: String,
            required: [true, 'Please provide the area of the location'],
            trim: true,
        },
        city: {
            type: String,
            required: [true, 'Please provide the city of the location'],
            trim: true,
        },
        country: {
            type: String,
            required: [true, 'Please provide the country of the location'],
            trim: true,
        },
    },
});

export const GeneralInfo = mongoose.model<IGeneralInfo>('GeneralInfo', GeneralInfoSchema);
export default GeneralInfo;
