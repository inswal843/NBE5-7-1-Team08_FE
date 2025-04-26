// ✅ App.js - 메인 페이지로 사용 (상품 예시 3개 + 상단 버튼)
import React from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: 'Columbia Nariñó', price: 5000, image: 'https://i.imgur.com/HKOFQYa.jpeg' },
  { id: 2, name: 'Brazil Serra Do Caparaó', price: 5000, image: 'https://i.imgur.com/HKOFQYa.jpeg' },
  { id: 3, name: 'Kenya AA', price: 6000, image: 'https://i.imgur.com/HKOFQYa.jpeg' },
];

function App() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#ddd', minHeight: '100vh', padding: '2rem' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4" style={{ position: 'relative' }}>
          <h1 className="m-0 mx-auto text-center" style={{ flexGrow: 1 }}>Grids & Circle</h1>
          <div className="d-flex align-items-center" style={{ position: 'absolute', right: 0 }}>
            <button className="btn btn-outline-secondary me-2" onClick={() => navigate('/inq/page')}>문의 하기</button>
            <button className="btn btn-dark" onClick={() => navigate('/order')}>주문 내역</button>
          </div>
        </div>

        <div className="row g-3">
          {products.map(product => (
            <div key={product.id} className="col-md-4">
              <div className="card h-100">
                <img src={product.image} alt={product.name} className="card-img-top" style={{ height: '200px', objectFit: 'contain' }} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">가격: {product.price.toLocaleString()}원</p>
                  <button className="btn btn-outline-dark w-100">자세히 보기</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
