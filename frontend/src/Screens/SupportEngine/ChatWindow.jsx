import React, { useState } from 'react';
import { styles } from './style.js';
const ChatWindow = ({ isOpen, onClose }) => {
  return (
    <div>
      {isOpen && (
        <div>
             <div 
            className='transition-5'
            style={{
                ...styles.supportWindow,
                
            }}
        >
             <div>Chat Window Content</div>
          <button onClick={onClose}>Close Chat</button>
        </div>
        </div>
 
      )}
    </div>
  );
};

export default ChatWindow;
