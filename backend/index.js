const http = require('http').createServer();
const io = require('socket.io')(http);

let rooms = [{
        title: 'New York',
        id: 0,
        players: []
    },
    {
        title: 'Lviv',
        id: 1,
        players: []
    },
    {
        title: 'Berlin',
        id: 2,
        players: []
    }
];

// trash collector
setInterval(() => {
    let before = rooms.length,
        now = Date.now();
    rooms = rooms.filter(el => {
        return ((now - +el.date) < 1000*60*20) || el.id < 3
    });
    console.log(`rooms cleared: ${before - rooms.length}`);
}, 1000*60*20)

io.on('connection', function (socket) {

    socket.on('new room', (data) => {
        rooms.push({
            id: rooms.length,
            title: data || `default${rooms.length}`,
            players: [],
            date: Date.now()
        });
        io.emit('room list', filterOpenedRooms(rooms));
    });
    
    socket.on('join room', (roomId, userId) => {
        joinToRoom(socket, roomId, userId)
    })
    
    socket.on('send board', (board, roomId) => {
        rooms[roomId].board = board;
        checkToFinal(board, (winner) => {
            socket.to(roomId).emit('get board', board);
            rooms[roomId].finished = !!winner;
            io.to(roomId).emit('finished game', winner);
        });
    })
    
    socket.on('room list', (userId) => {
        socket.emit('room list', filterOpenedRooms(rooms, userId));
    })
});

function joinToRoom(user, roomId, userId) {
    if (!rooms[roomId].players.includes(userId)) {
        rooms[roomId].players.push(userId);
    }

    let data = {
        room: roomId,
        fields: rooms[roomId].board
    }

    user.emit('joined room', data, rooms[roomId].title, rooms[roomId].players.indexOf(userId));
    user.join(roomId);
    io.emit('room list', filterOpenedRooms(rooms, userId));
}

function filterOpenedRooms(rooms, userId) {
    return rooms.filter((elem) => {
        return (((elem.players.length < 2) || elem.players.includes(userId)) && !elem.finished)
    })
}

function checkToFinal(board, callback) {
    let yellow = 0,
        blue = 0;
    board.forEach((elem) => {
        if (elem.checker) {
            if (elem.myCheckers === 0) {
                yellow++
            } else if (elem.myCheckers === 1) {
                blue++
            }
        }
    })

    if (!(yellow && blue) && yellow) {
        callback('0');
    } else if (!(yellow && blue) && blue) {
        callback('1');
    } else {
        callback();
    }
    
}

http.listen(3001, function () {
	console.log('Checkers server is start');
})