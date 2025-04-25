import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, onAdd }) {
  return (
    <div
      className="col-md-8 product-list-container"
      style={{
        height: '100%',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}
    >
      <h5><b>상품 목록</b></h5>

      {products.map(product => (
        <div
          key={product.id}
          style={{
            background: '#fff',
            padding: '1.5rem 1.25rem',
            borderRadius: '12px',
            border: '1px solid #ddd',
            minHeight: '100px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <ProductItem product={product} onAdd={onAdd} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
