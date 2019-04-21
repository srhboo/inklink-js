import React, { useState, useEffect } from "react";
import { io } from "../../socket-client";

export const EnterNickname = ({ setUser }) => {
  const [nicknameInput, updateNicknameInput] = useState("");
  useEffect(() => {
    io.registerOnReceiveAddUserSuccess(({ user }) => {
      console.log("setting");
      setUser(user);
    });
    return () => {
      io.unregisterOnReceiveAddUserSuccess();
    };
  });
  const handleSubmit = e => {
    e.preventDefault();
    io.addUser({ nickname: nicknameInput, roomId: "lobby" });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nickname">Enter A Nickname</label>
      <input
        id="nickname"
        type="text"
        value={nicknameInput}
        onChange={e => updateNicknameInput(e.target.value)}
      />
      <button type="submit">Let's play!</button>
    </form>
  );
};
