import io from 'socket.io-client';

export const socket = io('http://192.168.1.65:3001');

export function SocketService() {}

SocketService.prototype.sendBoard = sendBoard;
SocketService.prototype.newRoom = newRoom;
SocketService.prototype.joinRoom = joinRoom;
SocketService.prototype.getRoomList = getRoomList;

function sendBoard(board, room) {
    socket.emit('send board', board, room);
}

function newRoom(name) {
    socket.emit('new room', name);
}

function joinRoom(roomId, myId) {
    socket.emit('join room', roomId, myId)
}

function getRoomList(myId) {
    socket.emit('room list', myId)
}