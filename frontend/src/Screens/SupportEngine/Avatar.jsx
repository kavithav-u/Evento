import React, {useState} from 'react';
import { styles } from './style';
import ChatWindow from './ChatWindow';

const Avatar = props => {
    const [hovered, setHovered] = useState(false)
    const [chatOpen, setChatOpen] = useState(false);

    const handleAvatarClick = () => {
      setChatOpen(!chatOpen);
    };
    return (
        <div style={{position:'fixed', botom:'24px', right:'24px',zIndex:1000000000000000}} >
            <div 
                className='transition-3 z-50'
                style={{
                    ...styles.avatarHello,
                    ...{ opacity: hovered ? '1' : '0' }
                }}
            >
                Hey it's Admin 🤙
            </div>

            <div 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleAvatarClick}
                className='transition-3'
                style={{
                  ...styles.chatWithMeButton,
                  ...{ border: hovered ? '1px solid #f9f0ff' : '4px solid #7a39e0' },
                }}
              />
        
              {/* Render the ChatWindow component */}
              <ChatWindow isOpen={chatOpen} onClose={() => setChatOpen(false)} />
            </div>
        
  )
}

export default Avatar


