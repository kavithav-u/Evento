import React from 'react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';
import {
  Chat,
  Channel,
  Window,
  TypingIndicator,
  MessageList,
  MessageCommerce,
  MessageInput,
  MessageInputFlat,
  withChannelContext
} from "stream-chat-react";

const Chats = () => {
  return (
    <div>
         <Chat  theme="commerce light">
        <Channel >
          <Window>
            <div className="stream-header">
              <div className="str-header-left">
                <p className="stream-header-left-title">
                  Customer Support Chat
                </p>
              </div>
              <div className="str-chat__header-livestream-right">
                Welcome, 
              </div>
            </div>
            <MessageList
             
            />
            <MessageInput  focus />
          </Window>
        </Channel>
      </Chat> <Chat  theme="commerce light">
        <Channel >
          <Window>
            <div className="stream-header">
              <div className="str-header-left">
                <p className="stream-header-left-title">
                  Customer Support Chat
                </p>
              </div>
              <div className="str-chat__header-livestream-right">
                Welcome, 
              </div>
            </div>
            <MessageList
              
            />
            <MessageInput  focus />
          </Window>
        </Channel>
      </Chat>
    </div>
  )
}

export default Chats