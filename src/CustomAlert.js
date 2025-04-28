import React, { useEffect } from 'react';

function CustomAlert({ message, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="custom-alert"
      style={{
        position: 'fixed',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'white',
        color: '#000',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        fontWeight: 'bold',
        zIndex: '9999',
        width: 'auto',  // 자동으로 가로 크기 조정
        minWidth: '200px',  // 최소 너비 설정
        maxWidth: '80%',  // 최대 너비 제한
        textAlign: 'center',
        border: '2px solid #ccc',
        whiteSpace: 'nowrap',  // 텍스트가 한 줄로 나오게 설정
        overflow: 'hidden',  // 텍스트가 창을 벗어나지 않도록 설정
        textOverflow: 'ellipsis',
        height: 'auto',  // 높이를 자동으로 조정
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: '10px',
          backgroundColor: 'transparent',
          border: 'none',
          color: '#721c24',
          cursor: 'pointer',
        }}
      >
        X
      </button>
    </div>
  );
}

export default CustomAlert;
