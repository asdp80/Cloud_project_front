import React from 'react';

//리뷰 클릭 가능하게 카드 형식
export const RestaurantCard = ({restaurant, onDelete, onClick}) => {
    return (
        //클릭
        <div
            className="w-full border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white cursor-pointer"
            onClick={() => onClick(restaurant)}
        >
            <div className="pb-3 border-b flex justify-between items-center">
                <h3 className="text-lg font-bold">{restaurant.name}</h3>
                {/* 삭제 버튼*/}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(restaurant.id);
                    }}
                    className="text-red-600 hover:text-red-800"
                >
                    리뷰 삭제
                </button>
            </div>
            {/* 레스토랑 상세 정보*/}
            <div className="pt-3">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                        {restaurant.location}
                    </span>
                    <div className="flex items-center">
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
    );
};