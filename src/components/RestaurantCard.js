import React from 'react';

export const RestaurantCard = ({restaurant, onDelete}) => {
    return (
        <div className="w-full border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
            <div className="w-full border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
                <div className="pb-3 border-b flex justify-between items-center">
                    <h3 className="text-lg font-bold">{restaurant.name}</h3>
                    <div className={"flex justify-end mt-2"}>
                        <button
                            onClick={() => onDelete(restaurant.id)}
                            className="text-red-600 hover:text-red-800"
                        >
                            리뷰 삭제
                        </button>
                    </div>
                </div>
            </div>

            <div className="pt-3">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                         <span className="text-sm text-gray-500">
        {restaurant.location}
                             {restaurant.locationDetail && ` - ${restaurant.locationDetail}`}
    </span>
                        <div className="flex items-center">
                            {/* Star emoji as a simple replacement for the Star icon */}
                            <span className="text-yellow-400 mr-1">⭐</span>
                            <span className="text-sm font-medium">
                                {restaurant.rating ? restaurant.rating.toFixed(1) : 'N/A'}
                            </span>
                        </div>
                    </div>
                    <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                        {restaurant.type}
                    </span>
                </div>
            </div>

        </div>


    );
};