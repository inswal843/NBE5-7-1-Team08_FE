import React from 'react';

function CheckoutForm() {
  return (
    <form className="p-4">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">이메일</label>
        <input type="email" className="form-control mb-1" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">주소</label>
        <input type="text" className="form-control mb-1" id="address" />
      </div>
      <div className="mb-3">
        <label htmlFor="postcode" className="form-label">우편번호</label>
        <input type="text" className="form-control" id="postcode" />
      </div>
      <div>당일 오후 2시 이후의 주문은 다음날 배송을 시작합니다.</div>
    </form>
  );
}

export default CheckoutForm;
