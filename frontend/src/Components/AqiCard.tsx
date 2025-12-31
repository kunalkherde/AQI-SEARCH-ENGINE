import React from 'react';
import { AqiData } from '../types/aqi.types';
import { Calendar, MapPin, Activity } from 'lucide-react';

interface Props {
    data: AqiData;
}

const AqiCard: React.FC<Props> = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span className="uppercase tracking-wider text-xs font-semibold">Location</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        {/* If data.city is an object, show .name. If it's a string, show it directly. */}
                        {typeof data.city === 'object' ? (data.city as any).name : data.city}
                    </h2>
                </div>

                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Calendar className="w-4 h-4" />
                        {/* FIX: Add a fallback string or current date */}
                        <span className="text-xs">
                            {new Date(data.lastUpdated || new Date()).toLocaleString()}
                        </span>
                    </div>
                    <div className={`px-4 py-1 rounded-full text-sm font-bold ${data.aqi <= 50 ? 'bg-green-100 text-green-800' :
                            data.aqi <= 100 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                        }`}>
                        {data.level}
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-indigo-600 mt-1" />
                    <div>
                        <h4 className="font-semibold text-gray-900">Health Implication</h4>
                        <p className="text-gray-600 text-sm mt-1">{data.healthImplication}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AqiCard;