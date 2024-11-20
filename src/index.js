// import React from 'react';
// import ReactDOM from 'react-dom/client';  // React 18 이상에서는 ReactDOM.createRoot 사용
// import './index.css';  // 기본 스타일링 (선택사항)
// import App from './App';  // App 컴포넌트 import
//
// // React 18 이상에서 렌더링
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);