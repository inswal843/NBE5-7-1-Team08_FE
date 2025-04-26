import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { message, orderData, products } = location.state || {};

  // 상품 ID를 상품명으로 변환하는 함수
  const getProductNameById = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : '상품 이름 없음';
  };

  const getProductImageById = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      return `http://localhost:8080${product.imagePath}`;  // 이미지 경로를 반환
    }
    return '/default-image.png';  // 기본 이미지 경로
  };

  // 주문한 상품들의 총합을 계산하는 함수
  const calculateTotal = () => {
    return orderData?.orderProducts.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        return total + product.price * item.quantity;
      }
      return total;
    }, 0).toLocaleString(); // 가격 총합
  };

  return (
    <div style={{ backgroundColor: '#ddd', minHeight: '100vh', padding: '2rem' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div
          style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '800px',
            position: 'relative',
          }}
        >
          {/* 메인으로 가는 버튼 */}
          <button
            onClick={() => navigate('/')}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '10px 15px',
              borderRadius: '8px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
            }}
          >
            메인으로 가기
          </button>

          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>주문 내역 확인</h1>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>{message}</p>

          <h3>주문 정보</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><strong>이메일:</strong> {orderData?.email}</li>
            <li><strong>주소:</strong> {orderData?.address}</li>
            <li><strong>우편번호:</strong> {orderData?.postcode}</li>
          </ul>

          <h4>주문한 상품</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orderData?.orderProducts.map((item, index) => (
              <div
                key={index}
                style={{
                  background: '#fff',
                  padding: '1rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={getProductImageById(item.productId)}
                    alt={getProductNameById(item.productId)}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', marginRight: '16px' }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{getProductNameById(item.productId)}</div>
                    <div style={{ color: 'gray' }}>수량: {item.quantity}</div>
                  </div>
                </div>
                <div style={{ fontWeight: 'bold' }}>
                  {(products.find(p => p.id === item.productId)?.price * item.quantity).toLocaleString()}원
                </div>
              </div>
            ))}
          </div>

          {/* 총 합계 표시 (카드 안쪽 하단에 배치) */}
          <div
            style={{
              backgroundColor: '#fff',
              padding: '10px 15px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              marginTop: '20px', // 주문한 상품 목록과 겹치지 않게 여백을 줌
              textAlign: 'right',
            }}
          >
            <h4>총 합계: {calculateTotal()}원</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
