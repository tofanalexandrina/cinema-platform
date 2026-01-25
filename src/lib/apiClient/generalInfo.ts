/**
 * API Client for General Info
 * Use this in client components to interact with the general info API
 */

const API_BASE = '/api/generalInfo';
export interface GeneralInfo {
    _id: string;
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
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
export const generalInfoApi = {
    /**
     * Get general information
     * */
    getGeneralInfo: async (): Promise<GeneralInfo> => {
        const response = await fetch(API_BASE);
        const data: ApiResponse<GeneralInfo> = await response.json();
        if (!data.success || !data.data) {
            throw new Error(data.error || 'Failed to fetch general information');
        }
        return data.data;
    },

    createOrUpdateGeneralInfo: async (infoData: Omit<GeneralInfo, '_id' | 'createdAt' | 'updatedAt'>): Promise<GeneralInfo> => {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(infoData),
        });
        const data: ApiResponse<GeneralInfo> = await response.json();
        if (!data.success || !data.data) {
            throw new Error(data.error || 'Failed to create or update general information');
        }
        return data.data;
    }
};