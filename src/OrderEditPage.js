import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function OrderEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');

  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!email) {
      alert('이메일 정보가 없습니다. 다시 조회해주세요.');
      navigate('/orders');
      return;
    }

    fetch(`http://localhost:8080/api/order/${id}?email=${email}`)
      .then((res) => {
        if (!res.ok) throw new Error('주문 정보를 불러올 수 없습니다.');
        return res.json();
      })
      .then((data) => {
        if (data.status !== 'BEFORE_SHIPPING') {
          alert('배송 중이거나 취소된 주문은 수정할 수 없습니다.');
          navigate('/orders');
        } else {
          setOrder({
            ...data,
            email: email, // 주문 수정할 때 필요한 email을 order 안에 저장
          });
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.message || '주문 조회 실패');
        navigate('/orders');
      });

    // 상품 목록도 함께 가져오기
    fetch('http://localhost:8080/api/products/list')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('상품 목록 불러오기 실패', err));
  }, [id, email, navigate]);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
  
    setOrder((prevOrder) => {
      const updatedProducts = prevOrder.orderProducts.map((product) => {
        if (product.productId === productId) {
          return { ...product, quantity: quantity }; // 수량만 수정
        }
        return { ...product }; // 다른 상품은 그대로 복사
      });
  
      return {
        ...prevOrder,
        orderProducts: updatedProducts,
      };
    });
  };  

  const handleSave = () => {
    if (saving) return;
    setSaving(true);

    const payload = {
      email: order.email,
      address: order.address,
      postcode: order.postcode,
      orderProducts: order.orderProducts.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
      })),
    };

    fetch(`http://localhost:8080/api/order/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text || '주문 수정 실패');
          });
        }
        return res.text();
      })
      .then(() => {
        navigate('/order/confirm', {
          state: {
            message: '주문이 성공적으로 수정되었습니다.',
            orderData: order,
            products: products,
            type: 'edit',
          },
        });
      })
      .catch((err) => {
        console.error(err);
        alert(err.message || '주문 수정 중 오류가 발생했습니다.');
      })
      .finally(() => setSaving(false));
  };

  if (!order) {
    return (
      <div className="container mt-5">
        <h2>불러오는 중...</h2>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#ddd', minHeight: '100vh', padding: '2rem' }}>
      <div className="container">
        <h2>주문 수정</h2>

        <div className="mb-3">
          <label>주소</label>
          <input
            type="text"
            className="form-control"
            value={order.address}
            onChange={(e) => setOrder({ ...order, address: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>우편번호</label>
          <input
            type="text"
            className="form-control"
            value={order.postcode}
            onChange={(e) => setOrder({ ...order, postcode: e.target.value })}
          />
        </div>

        <h5>상품 목록</h5>
        {order.orderProducts.map((p) => (
          <div key={p.productId} className="d-flex align-items-center mb-2">
            <div className="me-3" style={{ minWidth: '200px' }}>{p.productName}</div>
            <input
              type="number"
              className="form-control w-25"
              min={1}
              value={p.quantity}
              onChange={(e) => handleQuantityChange(p.productId, parseInt(e.target.value))}
            />
          </div>
        ))}

        <button
          className="btn btn-primary mt-4"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? '수정 중...' : '수정 완료'}
        </button>
      </div>
    </div>
  );
}

export default OrderEditPage;
