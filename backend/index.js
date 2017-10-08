const http = require('http').createServer();
const io = require('socket.io')(http);

const rooms = [];


io.on('connection', function (socket) {

	socket.on('new room', (data) => {
		const id = Date.now();
		rooms.push({
			id: id,
			title: data || `default${rooms.length}`,
			players: 1
		});
		joinToRoom(socket, rooms.length)
	});
	
	socket.on('join room', (id) => {
		joinToRoom(socket, id)
	})
	
	socket.on('send board', (board, room) => {
		console.log(room)
		socket.in(room).emit('get board', board);
	})
});

function joinToRoom(user, room) {
	console.log(user.id, user.rooms)
	io.emit('joined room', room);
	return user.join(room);
}

http.listen(3128, function () {
	console.log('Checkers server is start');
})