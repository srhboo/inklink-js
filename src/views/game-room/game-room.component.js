import React, { useState, useEffect } from "react";

import { NicknameContext } from "../../App";

import { io } from "../../socket-client";
export const GameRoom = () => {
  const [messageInput, updateMessageInput] = useState("");
  const [messageLog, updateMessageLog] = useState([]);
  useEffect(() => {
    io.registerOnReceiveChatMessage(({ message, nickname }) => {
      updateMessageLog([...messageLog, { message, nickname }]);
    });
    return () => {
      io.unregisterOnReceiveChatMessage();
    };
  }, [messageLog]);

  const handleSubmit = nickname => e => {
    e.preventDefault();
    io.sendChatMessage({ message: messageInput, nickname });
    updateMessageInput("");
  };

  return (
    <NicknameContext.Consumer>
      {currentUserNickname => (
        <div>
          <div>{`chatting as: ${currentUserNickname}`}</div>
          <div>
            <ul>
              {messageLog.map(({ message, nickname }) => (
                <li>{`${nickname}: ${message}`}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSubmit(currentUserNickname)}>
            <label for="chat-message" />
            <input
              id="chat-message"
              type="text"
              value={messageInput}
              onChange={e => updateMessageInput(e.target.value)}
            />
            <button type="submit">send</button>
          </form>
        </div>
      )}
    </NicknameContext.Consumer>
  );
};
