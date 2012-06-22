// Server for websockets based client
var Loader  = require('./loader').Loader,
    loader  = new Loader(process.argv[2] || './world'),
    game    = loader.game,
    fs      = require("fs"),
    express = require("express"),
    app     = express.createServer(),
    io      = require('socket.io').listen(app);


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
