import React, { useState, useEffect } from "react";

import { equals, values, pathOr } from "ramda";

import { io } from "../../socket-client";
import { GameRoom } from "../game-room";

export const Lobby = ({ user, setCurrentRoomId }) => {
  const [gameRoomsById, updateGameRooms] = useState([]);
  useEffect(() => {
    io.registerOnReceiveGameRooms(({ gameRoomsById }) => {
      updateGameRooms(gameRoomsById);
    });
    return () => {
      io.unregisterOnReceiveGameRooms();
    };
  }, []);
  useEffect(() => {
    io.registerOnJoinRoomSuccess(({ roomId }) => {
      setCurrentRoomId(roomId);
    });
    return () => {
      io.unregisterOnJoinRoomSuccess();
    };
  }, [setCurrentRoomId]);
  useEffect(() => {
    io.fetchGameRooms();
  }, []);
  const handleClickRoom = ({ roomId }) => {
    io.joinRoom({ roomId });
  };
  const gameRooms = values(gameRoomsById);
  const { currentRoomId } = user;
  const currentRoomName = pathOr("N/A", [currentRoomId, "name"], gameRoomsById);
  return (
    <>
      {equals(user.currentRoomId, "lobby") ? (
        <div>
          <h2>game rooms</h2>
          <ul>
            {gameRooms.map(({ name, roomId }) => (
              <li key={roomId}>
                {name}
                <button
                  onClick={() => {
                    handleClickRoom({ roomId, name });
                  }}
                >
                  join room
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <GameRoom roomId={currentRoomId} name={currentRoomName} />
      )}
    </>
  );
};
Lobby.propTypes = {};
