import React, { Component, useState, useEffect } from "react";
import "./App.css";

import { GameRoom } from "./views/game-room";
import { EnterNickname } from "./views/enter-nickname";

export const NicknameContext = React.createContext("");

export const App = () => {
  const [nickname, setNickname] = useState("");
  return nickname ? (
    <NicknameContext.Provider value={nickname}>
      <GameRoom />
    </NicknameContext.Provider>
  ) : (
    <EnterNickname setNickname={setNickname} />
  );
};
