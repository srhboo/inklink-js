import React, { useState } from "react";

export const EnterNickname = ({ setNickname }) => {
  const [nicknameInput, updateNicknameInput] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    setNickname(nicknameInput);
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
