const http = require('http').createServer();
const io = require('socket.io')(http);

const rooms = [{
        title: 'Easy',
        id: 1,
        players: []
    },
    {
        title: 'Amateur',
        id: 2,
        players: []
    },
    {
        title: 'Pro',
        id: 3,
        players: []
    }
];


io.on('connection', function (socket) {
    
    socket.on('new room', (data) => {
        rooms.push({
            id: rooms.length,
            title: data || `default${rooms.length}`,
            players: []
        });
        // joinToRoom(socket, rooms.length);
        io.emit('room list', filterOpenedRooms(rooms));
    });
    
    socket.on('join room', (id) => {
        joinToRoom(socket, id)
    })
    
    socket.on('send board', (board, room) => {
        rooms[room - 1].board = board;
        socket.to(room).emit('get board', board);
    })
    
    socket.on('room list', () => {
        socket.emit('room list', filterOpenedRooms(rooms));
    })
});

function joinToRoom(user, roomId) {
    rooms[roomId - 1].players.push(user.id);

    let data = {
        room: roomId,
        fields: rooms[roomId - 1].board
    }

    user.emit('joined room', data);
    user.join(roomId);
    io.emit('room list', filterOpenedRooms(rooms));
}

function filterOpenedRooms(rooms) {
    return rooms.filter((elem) => {
        return elem.players.length < 2
    })
}

http.listen(3001, function () {
	console.log('Checkers server is start');
})