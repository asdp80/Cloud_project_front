// src/App.js
import React from 'react';
import DataComponent from './components/DataComponent';  // DataComponent 불러오기

const App = () => {
  return (
      <div className="App">
        <h1>Spring Boot와 React 연결 예시</h1>
        <DataComponent />  {/* 데이터 컴포넌트 렌더링 */}
      </div>
  );
}

export default App;
