
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Chat from '../../components/Chat/Chat';
import ChatProvider from '../../Context/ChatProvider';
import Footer from '../../components/user/Footer'
import UserHeader from '../../components/user/userHeader';
function ChatScreen() {
  
  return (
    <>
    <UserHeader />
    
    <ChakraProvider>
       <ChatProvider>
      <Chat />
      </ChatProvider>
    </ChakraProvider>
      <Footer/>
    </>
  );
}

export default ChatScreen;