
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RestaurantList } from './components/RestaurantList';
import { RestaurantForm } from './components/RestaurantForm';
function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    <Route path="/" element={<RestaurantList />} />
                    <Route path="/restaurant/new" element={<RestaurantForm onSubmitSuccess={() => window.location.reload()}/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

