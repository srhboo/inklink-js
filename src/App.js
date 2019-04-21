import React, { useState } from "react";
import "./App.css";

import { EnterNickname } from "./views/enter-nickname";
import { UsersOnline } from "./views/users-online";
import { Lobby } from "./views/lobby";

export const UserContext = React.createContext("");

export const App = () => {
  const [user, setUser] = useState({
    nickname: null,
    userId: null,
    currentRoomId: "lobby"
  });
  const setCurrentRoomId = currentRoomId => {
    setUser({ ...user, currentRoomId });
  };
  const { nickname, userId } = user;
  return (
    <>
      <UsersOnline />
      {nickname && userId ? (
        <UserContext.Provider value={user}>
          <Lobby user={user} setCurrentRoomId={setCurrentRoomId} />
        </UserContext.Provider>
      ) : (
        <EnterNickname setUser={setUser} />
      )}
    </>
  );
};
