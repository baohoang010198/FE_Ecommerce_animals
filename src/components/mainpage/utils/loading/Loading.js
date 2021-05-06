import React from 'react';
import './loading.css';
function Loading() {
    return (
        <div className="loading">
            <svg width="200" height="250" viewBox="0 0 50 50">
                <polygon strokeWidth="1" stroke="#000" fill="none"
                points="20,1 40,40 1,40"></polygon>
                <text fill="#000" x="4" y="52">Thú Cưng</text>
            </svg>
        </div>
    );
}

export default Loading;

