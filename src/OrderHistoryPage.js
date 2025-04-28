import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAlert from './CustomAlert';

function OrderHistoryPage() {
  const [emailInput, setEmailInput] = useState('');
  const [email, setEmail] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);  // alert 메시지 상태 관리
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/products/list');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data);
    } catch {
      setAlertMessage('상품 리스트 조회 실패');
    }
  };

  const fetchOrders = (targetEmail) => {
    fetch(`http://localhost:8080/api/order?email=${targetEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        localStorage.setItem('userEmail', targetEmail);
        setEmail(targetEmail);
        setOrders(data.reverse());
      })
      .catch(() => setAlertMessage('해당하는 이메일의 주문 내역이 없습니다'));
  };

  const handleEmailSubmit = () => {
    if (!emailInput || !emailInput.includes('@')) {
      setAlertMessage('올바른 이메일을 입력해주세요');
      return;
    }
    fetchOrders(emailInput);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      fetchOrders(savedEmail);
    }
    fetchProducts();
  }, []);

  const cancelOrder = (id) => {
    const userEmail = localStorage.getItem('userEmail');
    fetch(`http://localhost:8080/api/order/${id}/cancel?email=${userEmail}`, {
      method: 'PUT',
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setAlertMessage('주문이 성공적으로 취소되었습니다.');
        window.location.reload();
      })
      .catch(() => setAlertMessage('주문 취소 실패'));
  };

  const resetEmail = () => {
    localStorage.removeItem('userEmail');
    setEmail(null);
    setOrders([]);
  };

  const goHome = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'BEFORE_SHIPPING':
        return '배송전';
      case 'CANCELED':
        return '취소됨';
      case 'SHIPPING':
        return '배송중';
      default:
        return status;
    }
  };

  const getProductImageByName = (productName) => {
    const product = products.find((p) => p.name === productName);
    if (product) {
      return `http://localhost:8080/api/products/${product.id}/image`;
    }
    return '/default-image.png';
  };

  return (
    <div style={{ backgroundColor: '#ddd', minHeight: '100vh', padding: '2rem' }}>
      <div className="container">
        {/* CustomAlert 컴포넌트 사용 */}
        {alertMessage && <CustomAlert message={alertMessage} onClose={() => setAlertMessage(null)} />}

        {/* 상단 타이틀 + 버튼 */}
        <div className="d-flex justify-content-between align-items-center mb-4 position-relative">
          <button
            className="btn btn-outline-dark"
            style={{ height: '40px', minWidth: '80px', position: 'absolute', left: 0 }}
            onClick={goHome}
          >
            홈으로
          </button>

          <h1 className="m-0" style={{ fontSize: '1.8rem', textAlign: 'center', width: '100%' }}>
            주문 내역
          </h1>

          {email && (
            <button
              className="btn btn-outline-secondary"
              style={{ height: '40px', minWidth: '100px', position: 'absolute', right: 0 }}
              onClick={resetEmail}
            >
              다른 이메일로 조회
            </button>
          )}
        </div>

        {/* 이메일 입력창 */}
        {!email && (
          <div className="mb-5 d-flex justify-content-center gap-2">
            <input
              type="email"
              className="form-control"
              placeholder="이메일을 입력해주세요"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              style={{ maxWidth: '400px', height: '45px' }}
            />
            <button
              className="btn btn-dark"
              style={{ width: '150px', height: '45px' }}
              onClick={handleEmailSubmit}
            >
              조회
            </button>
          </div>
        )}

        {/* 주문 내역이 없는 경우 */}
        {orders.length === 0 && email && !alertMessage && (
          <p className="text-muted text-center" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#555' }}>
            주문 내역이 없습니다.
          </p>
        )}

        {/* 주문 내역 리스트 */}
        {orders.map((order) => {
          const total = order.orderProducts.reduce(
            (sum, p) => sum + p.price * p.quantity,
            0
          );

          return (
            <div key={order.id} className="d-flex justify-content-center mb-4">
              <div
                className="bg-white p-4 rounded"
                style={{
                  border: '1px solid #ccc',
                  width: '100%',
                  maxWidth: '600px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <h5 className="mb-2">주문 번호: {order.id}</h5>
                <p>상태: <strong>{getStatusLabel(order.status)}</strong></p>
                <p>주문일자: {order.createdAt}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                  {order.orderProducts.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        background: '#fff',
                        padding: '1rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={getProductImageByName(p.productName)}
                          alt={p.productName}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginRight: '16px',
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{p.productName}</div>
                          <div style={{ color: 'gray' }}>수량: {p.quantity}</div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 'bold' }}>
                        {(p.price * p.quantity).toLocaleString()}원
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: 'right', marginTop: '20px', fontWeight: 'bold' }}>
                  총 가격: {total.toLocaleString()}원
                </div>

                {/* 수정/취소 버튼 */}
                {order.status === 'BEFORE_SHIPPING' && (
                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => navigate(`/order/update/${order.id}`)}
                    >
                      수정
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => cancelOrder(order.id)}
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderHistoryPage;
