const http = require('http').createServer();
const io = require('socket.io')(http);

const rooms = [{
        title: 'Easy',
        id: 0,
        players: []
    },
    {
        title: 'Amateur',
        id: 1,
        players: []
    },
    {
        title: 'Pro',
        id: 2,
        players: []
    }
];
// setInterval(() => {
//     console.log('\n\n');
//     console.log(rooms);
// }, 5000)

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
    
    socket.on('join room', (roomId, userId) => {
        joinToRoom(socket, roomId, userId)
    })
    
    socket.on('send board', (board, room) => {
        rooms[room].board = board;
        socket.to(room).emit('get board', board);
    })
    
    socket.on('room list', (userId) => {
        socket.emit('room list', filterOpenedRooms(rooms, userId));
    })
});

function joinToRoom(user, roomId, userId) {
    console.log(userId, !rooms[roomId].players.includes(userId));
    if (!rooms[roomId].players.includes(userId)) {
        rooms[roomId].players.push(userId);
    }

    let data = {
        room: roomId,
        fields: rooms[roomId].board
    }

    user.emit('joined room', data);
    user.join(roomId);
    io.emit('room list', filterOpenedRooms(rooms, userId));
}

function filterOpenedRooms(rooms, userId) {
    return rooms.filter((elem) => {
        return ((elem.players.length < 2) || elem.players.includes(userId))
    })
}

http.listen(3001, function () {
	console.log('Checkers server is start');
})