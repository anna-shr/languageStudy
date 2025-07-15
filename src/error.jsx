// ErrorDisplay.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './error.css'; // Стили подключим ниже

const ErrorDisplay = ({ error, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h3 className="error-title">Произошла ошибка</h3>
        <p className="error-message">{error}</p>
        
        {onRetry && (
          <button 
            className="error-retry-button" 
            onClick={onRetry}
          >
            Повторить попытку
          </button>
        )}
        
        <div className="error-details">
          <small>Если ошибка повторяется, попробуйте позже</small>
        </div>
      </div>
    </div>
  );
};

ErrorDisplay.propTypes = {
  error: PropTypes.string.isRequired,
  onRetry: PropTypes.func
};

export default ErrorDisplay;