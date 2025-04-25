import React from 'react';

function Summary({ cart, total }) {
  return (
    <>
      <h5><b>Summary</b></h5>
      <hr />
      {Object.entries(cart).map(([name, quantity]) => (
        <h6 key={name}>
          {name} <span className="badge bg-dark">{quantity}개</span>
        </h6>
      ))}

      <div className="total-row">
        <h5>총금액</h5>
        <h5>{total.toLocaleString()}원</h5>
      </div>

    </>
  );
}

export default Summary;
