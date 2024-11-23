
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RestaurantList } from './components/RestaurantList';
import { RestaurantForm } from './components/RestaurantForm';
function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    {/* 루트 경로에 RestaurantList 컴포넌트 렌더링 */}
                    <Route path="/" element={<RestaurantList />} />
                    {/* "/restaurant/new" 경로에 RestaurantForm 컴포넌트 렌더링 */}
                    <Route path="/restaurant/new" element={<RestaurantForm onSubmitSuccess={() => window.location.reload()}/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
