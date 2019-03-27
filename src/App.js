import React, { Component, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { io } from "./index";

const App = () => {
  const [messageInput, updateMessageInput] = useState("");
  const [messageLog, updateMessageLog] = useState([]);
  useEffect(() => {
    io.registerHandler(newMessage => {
      updateMessageLog([...messageLog, newMessage]);
    });
    return () => {
      io.unregisterHandler();
    };
  });
  const handleSubmit = e => {
    e.preventDefault();
    io.message(messageInput);
    updateMessageInput("");
  };

  return (
    <>
      <div>
        <ul>
          {messageLog.map(message => (
            <li>{`anon user: ${message}`}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <label for="chat-message" />
        <input
          id="chat-message"
          type="text"
          value={messageInput}
          onChange={e => updateMessageInput(e.target.value)}
        />
        <button type="submit">send</button>
      </form>
    </>
  );
};

export default App;
