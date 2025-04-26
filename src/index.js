// index.js 또는 RootApp.js 내부
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'; // 메인 페이지
import OrderPage from './orderPage';
import OrderConfirmationPage from './OrderConfirmationPage'; // 임포트 추가
import OrderHistoryPage from './OrderHistoryPage'; // 임포트 추가
import OrderEditPage from './OrderEditPage';
// index.js
import 'bootstrap/dist/css/bootstrap.min.css';

// import AdminPage from './AdminPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/order/confirm" element={<OrderConfirmationPage />} />
      <Route path="/orders" element={<OrderHistoryPage />} />
      <Route path="/order/update/:id" element={<OrderEditPage />} /> 
      {/* <Route path="/admin" element={<AdminPage />} /> */}
    </Routes>
  </Router>
);
