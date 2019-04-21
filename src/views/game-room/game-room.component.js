import React, { useState, useEffect } from "react";

import { UserContext } from "../../App";

import { io } from "../../socket-client";
export const GameRoom = ({ roomId, name }) => {
  const [messageInput, updateMessageInput] = useState("");
  const [messageLog, updateMessageLog] = useState([]);

  useEffect(() => {
    io.registerOnReceiveChatMessage(({ message, user }) => {
      updateMessageLog([...messageLog, { message, user }]);
    });
    return () => {
      io.unregisterOnReceiveChatMessage();
    };
  }, [messageLog]);

  const handleSubmit = user => e => {
    e.preventDefault();
    io.sendChatMessage({ message: messageInput, user });
    updateMessageInput("");
  };

  return (
    <UserContext.Consumer>
      {currentUser => (
        <div>
          <h3>{name}</h3>
          <div>{`chatting as: ${currentUser.nickname}`}</div>
          <div>
            <ul>
              {messageLog.map(({ message, user }, i) => (
                <li key={`${user ? user.userId : roomId}-${i}`}>{`${
                  user ? `${user.nickname} :` : ""
                } ${message}`}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSubmit(currentUser)}>
            <label htmlFor="chat-message" />
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
    </UserContext.Consumer>
  );
};
