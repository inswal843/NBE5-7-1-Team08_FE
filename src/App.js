import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);  // 제품 데이터 상태
  const navigate = useNavigate();

  useEffect(() => {
    // DB에서 제품 목록을 가져오는 API 호출
    fetch('http://localhost:8080/api/products/list')  // API URL
      .then(res => {
        if (!res.ok) throw new Error('서버 응답 오류');
        return res.json();
      })
      .then(data => setProducts(data.slice(0, 6)))  // 첫 3개 제품만 상태에 저장
      .catch(err => {
        console.error('상품 목록 불러오기 실패:', err);
        alert('상품을 불러오지 못했습니다.');
      });
  }, []);

  const handleOrderClick = () => {
    navigate('/order');  // 주문하기 버튼 클릭 시 orderPage.js로 이동
  };

  return (
    <div style={{ backgroundColor: '#ddd', minHeight: '100vh', padding: '2rem' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4" style={{ position: 'relative' }}>
          <h1 className="m-0 mx-auto text-center" style={{ flexGrow: 1 }}>8 Bit with Coffee</h1>
          <div className="d-flex align-items-center" style={{ position: 'absolute', right: 0 }}>
            <button className="btn btn-outline-secondary me-2" onClick={() => navigate('/inq/page')}>문의 게시판</button>
            <button className="btn btn-dark" onClick={() => navigate('/orders')}>주문 내역</button>
          </div>
        </div>

        <div className="row g-3">
          {products.map(product => (
            <div key={product.id} className="col-md-4">
              <div className="card h-100">
                <img
                  src={`http://localhost:8080${product.imagePath}`}  // 이미지 경로
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: '250px',  // 이미지 높이 조정
                    objectFit: 'contain',  // 이미지 크기 맞추기
                    borderRadius: '30px',  // 이미지 모서리 둥글게
                    margin: '20px',  // 카드에 맞지 않게 여백 추가
                    display: 'block',  // 이미지 가운데 정렬
                    marginLeft: 'auto',
                    marginRight: 'auto',  // 가운데 정렬
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">가격: {product.price.toLocaleString()}원</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 주문하기 버튼 추가 */}
        <div className="d-flex justify-content-center mt-4">
          <button 
            className="btn btn-dark"
            style={{ width: '200px' }} // 버튼 크기를 카드 크기에 맞추기
            onClick={handleOrderClick}  // 버튼 클릭 시 주문 페이지로 이동
          >
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
