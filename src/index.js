import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// React.StrictMode로 App 컴포넌트를 감싸서 렌더링
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);