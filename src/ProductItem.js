import React from 'react';

function ProductItem({ product, onAdd }) {
  return (
    <div className="d-flex align-items-center w-100">
      <div style={{ marginRight: '16px' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            borderRadius: '8px'
          }}
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
        <button className="btn btn-outline-dark btn-sm" onClick={() => onAdd(product)}>추가</button>
      </div>
    </div>
  );
}

export default ProductItem;