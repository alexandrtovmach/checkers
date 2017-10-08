import io from 'socket.io-client';

const socket = io('http://localhost:3128');

class SocketService {

    sendBoard = (board, room) => {
        socket.emit('send board', board, room);
        // in(room || socket.id).
    }

    newRoom = () => {
        socket.emit('new room');
    }

    joinRoom = () => {
        socket.emit('join room')
    }
}

export default new SocketService();