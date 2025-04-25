// ✅ OrderPage.js - 주문 및 결제 페이지
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialProducts = [
  { id: 1, name: 'Columbia Nariñó', price: 5000, image: 'https://i.imgur.com/HKOFQYa.jpeg' },
  { id: 2, name: 'Brazil Serra Do Caparaó', price: 5000, image: 'https://i.imgur.com/HKOFQYa.jpeg' },
  { id: 3, name: 'Kenya AA', price: 6000, image: 'https://i.imgur.com/HKOFQYa.jpeg' },
];

function OrderPage() {
  const [cart, setCart] = useState({});
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: (prevCart[product.id] || 0) + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const currentQty = prevCart[productId];
      if (!currentQty) return prevCart;

      if (currentQty === 1) {
        const { [productId]: _, ...rest } = prevCart;
        return rest;
      } else {
        return {
          ...prevCart,
          [productId]: currentQty - 1,
        };
      }
    });
  };

  const handleCheckout = () => {
    const orderProducts = Object.keys(cart).map((productId) => ({
      productId: parseInt(productId),
      quantity: cart[productId],
    }));

    const orderData = {
      email,
      address,
      postcode,
      orderProducts,
    };

    fetch('http://localhost:8080/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('주문 실패');
        }
        return res.text();
      })
      .then((message) => {
        alert(message);
        navigate('/'); // ✅ 메인 페이지로 이동
      })
      .catch((err) => {
        console.error(err);
        alert('결제 실패!');
      });
  };

  const total = Object.keys(cart).reduce((acc, id) => {
    const product = initialProducts.find(p => p.id === parseInt(id));
    return acc + (product?.price || 0) * cart[id];
  }, 0);

  return (
    <div style={{ backgroundColor: '#ddd', minHeight: '100vh', padding: '2rem' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-center m-0 flex-grow-1">Grids & Circle</h1>
          <button className="btn btn-outline-secondary ms-3" onClick={() => navigate(-1)}>← 뒤로가기</button>
        </div>

        <div className="row">
          {/* 왼쪽 상품 목록 */}
          <div className="col-md-8">
            <div className="p-4 h-100 d-flex flex-column">
              <h5><b>상품 목록</b></h5>
              <div className="flex-grow-1 d-flex flex-column gap-3 justify-content-start">
                {initialProducts.map(product => (
                  <div
                    key={product.id}
                    style={{
                      background: '#fff',
                      padding: '1rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid #ddd',
                      minHeight: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ marginRight: '16px' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <div className="text-muted small mb-1">커피콩</div>
                      <div className="fw-semibold fs-6">{product.name}</div>
                    </div>
                    <div className="text-center px-3 fw-semibold" style={{ whiteSpace: 'nowrap' }}>
                      {product.price.toLocaleString()}원
                    </div>
                    <div style={{ alignSelf: 'center' }}>
                      <button className="btn btn-outline-dark btn-sm" onClick={() => addToCart(product)}>추가</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽 Summary */}
          <div className="col-md-4">
            <div className="summary p-4 h-100">
              <h5><b>Summary</b></h5>
              <hr />
              {Object.entries(cart).length > 0 ? (
                <ul className="list-unstyled">
                  {Object.entries(cart).map(([id, qty]) => {
                    const product = initialProducts.find(p => p.id === parseInt(id));
                    return (
                      <li key={id} className="mb-2 d-flex justify-content-between align-items-center">
                        <span>
                          {product?.name} <span className="badge bg-dark">{qty}개</span>
                        </span>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFromCart(id)}
                        >
                          삭제
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-muted">장바구니가 비어 있습니다.</p>
              )}
              <div className="total-row">
                <span><b>총금액</b></span>
                <span>{total.toLocaleString()}원</span>
              </div>
              <input type="email" className="form-control my-2" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="text" className="form-control my-2" placeholder="주소" value={address} onChange={(e) => setAddress(e.target.value)} />
              <input type="text" className="form-control my-2" placeholder="우편번호" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
              <button className="btn btn-dark w-100 mt-2" onClick={handleCheckout}>결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;