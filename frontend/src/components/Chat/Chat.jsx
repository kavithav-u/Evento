import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

import { ChatState } from "../../Context/ChatProvider";
import SideDrawer from "./miscellaneous.jsx/sideDrawer";
import MyChat from "./miscellaneous.jsx/MyChat";
import ChatBox from "./miscellaneous.jsx/chatBox";


const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <div className="bg-gray-100 " style={{ width: "100%" }}>
    {user && <SideDrawer />}
    <Box
      display="flex"
      justifyContent="space-between "
      w="100%"
      h="91.5vh"
      p="10px"
    >
      {user && <MyChat fetchAgain={fetchAgain}/>}
      {user && (
         <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      )}
    </Box>
  </div>
   )
}

export default Chat