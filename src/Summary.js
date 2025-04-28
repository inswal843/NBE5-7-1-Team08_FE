// ✅ Summary.js - 장바구니 요약 및 결제 영역
import React from 'react';

function Summary({ cart, products, total, email, address, postcode, setEmail, setAddress, setPostcode, handleCheckout, removeFromCart }) {
  return (
    <div className="summary p-4 h-100">
      <h5><b>Summary</b></h5>
      <hr />
      {Object.entries(cart).length > 0 ? (
        <ul className="list-unstyled">
          {Object.entries(cart).map(([id, qty]) => {
            const product = products.find(p => p.id === parseInt(id));
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
        <span>{total.toLocaleString()} 원</span>
      </div>
      <input type="email" className="form-control my-2" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" className="form-control my-2" placeholder="주소" value={address} onChange={(e) => setAddress(e.target.value)} />
      <input type="text" className="form-control my-2" placeholder="우편번호" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
      <button className="btn btn-dark w-100 mt-2" onClick={handleCheckout}>결제하기</button>
    </div>
  );
}

export default Summary;
