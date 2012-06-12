// Console client
var Game = require('./game').Game,
    game = new Game(),
    player = game.createPlayer("tom"),
    readline = require('readline'),
    interface = readline.createInterface(process.stdin, process.stdout, null);

game.createRoom('room1', {description: "This is the first room", exits: {north: 'room2'}});
game.createRoom('room2', {description: "This is the second room", exits: {south: 'room1'}});

console.log(game.rooms);

interface.setPrompt('> ');
interface.on('line', function (line) {
  player.execute(line);
  interface.prompt();
});

player.on('write', function (string) {
  console.log(string);
});

player.execute('look')

interface.prompt();
