import io from 'socket.io-client';

export const socket = io('http://localhost:3001');

export function SocketService() {}

SocketService.prototype.sendBoard = sendBoard;
SocketService.prototype.newRoom = newRoom;
SocketService.prototype.joinRoom = joinRoom;
SocketService.prototype.getRoomList = getRoomList;

function sendBoard(board, room) {
    console.log(room, board)
    socket.emit('send board', board, room);
}

function newRoom(name) {
    socket.emit('new room', name);
}

function joinRoom(room) {
    console.log(room);
    socket.emit('join room', room)
}

function getRoomList() {
    socket.emit('room list')
}
