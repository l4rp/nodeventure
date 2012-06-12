var util = require("util");
var events = require("events");
var _ = require("underscore");

module.exports.Game = Game;

function Game() {
  events.EventEmitter.call(this);
  this.rooms = {};
  this.players = {};
  this.commands = {
    go: function (rest, player, game) {
      var currentRoom = player.getCurrentRoom(),
          destination = currentRoom.getExit(rest.toLowerCase());
      if (destination) {
        player.setCurrentRoom(destination);
        player.write("You go " + rest);
        player.execute("look");
      } else {
        player.write("There is no " + rest + " exit");
      }
    },
    look: function (rest, player, game) {
      // TODO: Support looking *at* things
      player.write(player.getCurrentRoom().description);
      player.execute('exits');
    },
    exits: function (rest, player, game) {
      var exits = Object.keys(player.getCurrentRoom().exits);
      player.write("Exits: " + exits.join(","));
    }
  };
}
util.inherits(Game, events.EventEmitter);

_.extend(Game.prototype, {
  createPlayer: function (name) {
    if (!(name in this.players)) {
      this.players[name] = new Player(this, name);
    } 
    return this.players[name];
  },
  createRoom: function (id, options) {
    var room = this.rooms[id] = this.rooms[id] || new Room(this,id);
    _.extend(room, options);
    return room;
  },
  createCommand: function (command, fun) {
    this.commands[command] = fun;
  },
  execute: function (player, string) {
    var command = string.trim().split(" ",1)[0].toLowerCase(),
        rest = string.trim().slice(command.length).trim();
    if (!this.commands.hasOwnProperty(command)) {
      player.write("Awfully sorry old chap, but I don't understand");
    } else {
      this.commands[command](rest, player, this);
    }
  }
});

function Room(game, id) {
  this.game = game;
  this.id = id;
  this.description = "This is a room";
  this.exits = {};
}

_.extend(Room.prototype, {
  getExit: function (name) {
    var exit = this.exits[name];
    return exit && this.game.rooms[exit];
  }
});


function Player(game, name) {
  events.EventEmitter.call(this);
  this.location = "room1";
  this.game = game;
  this.name = name;
}
util.inherits(Player, events.EventEmitter);

_.extend(Player.prototype, {
  // Run a command line as the player
  execute: function (string) {
    this.game.execute(this, string);
  },
  // Write out a string to the player's client
  write: function (string) {
    this.emit('write', string);
  },
  getCurrentRoom: function () {
    return this.game.rooms[this.location];
  },
  setCurrentRoom: function (id) {
    // Allow passing in a full room object, not just an id
    if (id.id) {
      id = id.id;
    }
    if (id in this.game.rooms) {
      this.location = id;
    }
  }
});
