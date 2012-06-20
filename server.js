// Console client
var Game    = require('./game').Game,
    game    = new Game(),
    fs      = require("fs"),
    express = require("express"),
    app     = express.createServer(),
    io      = require('socket.io').listen(app);


game.createRoom('room1', {description: "This is the first room", exits: {north: 'room2'}});
game.createRoom('room2', {description: "This is the second room", exits: {south: 'room1'}});

// Serve the index.html as the root
app.get("/", function(req, res) {
  fs.createReadStream("./client/index.html").pipe(res);
});

// Serve static files, the js and css
app.use("/", express.static("./client"));

io.sockets.on('connection', function (socket) {
  socket.on('login', function (name) {
    var player = game.createPlayer(name);
    player.on('write', function (string) {
      socket.emit('write', string);
    });
    socket.on('command', function (command) {
      player.execute(command);
    });
    player.execute('look')
  });
});

app.listen(8989);

console.log('Listening on port 8989');
