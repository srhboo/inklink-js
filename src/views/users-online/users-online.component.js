import React, { useEffect, useState } from "react";

import { io } from "../../socket-client";

export const UsersOnline = () => {
  const [currentUsersOnline, updateUsersOnline] = useState([]);
  useEffect(() => {
    io.registerOnReceiveUsersOnline(({ usersOnline }) => {
      updateUsersOnline(usersOnline);
    });
    return () => {
      io.unregisterOnReceiveUsersOnline();
    };
  }, []);

  return (
    <>
      <h3>Users Online</h3>
      <ul>
        {currentUsersOnline.map(({ nickname, userId }) => (
          <li key={userId}>{nickname}</li>
        ))}
      </ul>
    </>
  );
};
UsersOnline.propTypes = {};
