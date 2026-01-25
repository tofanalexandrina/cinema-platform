import { getDatabase } from '@/db/mongodb';
import { ObjectId } from 'mongodb';


export interface GeneralInfo {
    _id?: ObjectId;
    startDate: Date;
    endDate: Date;
    location: {
        name: string;
        area: string;
        city: string;
        country: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

export class GeneralInfoService {
    /**
     * Get the general information document
     * @throws Error if no general info found
     * 
     * */

    static async getGeneralInfo() {
        const db = await getDatabase();
        const generalInfoCollection = db.collection('generalInfo');
        const generalInfo = await generalInfoCollection.findOne({});
        if (!generalInfo) {
            throw new Error('General information not found');
        }
        return generalInfo;
    }

    //create or update general info
    static async upsertGeneralInfo(infoData: Omit<GeneralInfo, '_id' | 'createdAt' | 'updatedAt'>) {
        const db = await getDatabase();
        const generalInfoCollection = db.collection('generalInfo');
        const existingInfo = await generalInfoCollection.findOne({});
        if (existingInfo) {
            const updateDoc = {
                ...infoData,
                updatedAt: new Date(),
            };
            const result = await generalInfoCollection.findOneAndUpdate(
                { _id: existingInfo._id },
                { $set: updateDoc },
                { returnDocument: 'after' }
            );
            return result?.value;
        } else {
            const infoDocument = {
                ...infoData,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const result = await generalInfoCollection.insertOne(infoDocument);
            return {
                _id: result.insertedId,
                ...infoDocument,
            };
        }
    }
}