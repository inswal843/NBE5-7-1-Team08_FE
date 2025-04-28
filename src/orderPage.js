// ✅ OrderPage.js - 주문 및 결제 페이지 (DB에서 상품 불러옴)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Summary from './Summary';

function OrderPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/products/list')
      .then(res => {
        if (!res.ok) throw new Error('서버 응답 오류');
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => {
        console.error('상품 목록 불러오기 실패:', err);
        alert('상품을 불러오지 못했습니다.');
      });
  }, []);

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
        return res.text(); // 주문 성공 메시지 받기
      })
      .then((message) => {
        alert(message);
  
        // 👉 주문 정보와 메시지를 함께 주문 확인 페이지로 넘기기
        navigate('/order/confirm', {
          state: {
            message,
            orderData,
            products: products,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        alert('결제 실패!');
      });
  };
  

  const total = Object.keys(cart).reduce((acc, id) => {
    const product = products.find(p => p.id === parseInt(id));
    return acc + (product?.price || 0) * cart[id];
  }, 0);

  return (
    <div style={{ backgroundColor: '#ddd', minHeight: '100vh', padding: '2rem' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-center m-0 flex-grow-1">주문결제</h1>
          <button className="btn btn-outline-secondary ms-3" onClick={() => navigate(-1)}>← 뒤로가기</button>
        </div>

        <div className="row">
          {/* 왼쪽 상품 목록 */}
          <div className="col-md-8">
            <div className="p-4 h-100 d-flex flex-column">
              <h5><b>상품 목록</b></h5>
              <div className="flex-grow-1 d-flex flex-column gap-3 justify-content-start">
              {products.map(product => {
  console.log("📦 product:", product); // <- 이 줄 추가!

  return (
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
          src={`http://localhost:8080/images/${product.imagePath}`}
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
  );
})}
              </div>
            </div>
          </div>

          {/* 오른쪽 Summary */}
          <div className="col-md-4">
            <Summary
              cart={cart}
              products={products}
              total={total}
              email={email}
              address={address}
              postcode={postcode}
              setEmail={setEmail}
              setAddress={setAddress}
              setPostcode={setPostcode}
              handleCheckout={handleCheckout}
              removeFromCart={removeFromCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
