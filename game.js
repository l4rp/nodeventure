var util = require("util");
var events = require("events");
var _ = require("underscore");

module.exports.Game = Game;

function Game() {
  events.EventEmitter.call(this);
  this.rooms = {};
  this.players = {};
  this.commands = {
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
  // Broadcast out a message to all logged in users
  broadcast: function (message) {
    _.each(this.players, function (player) {
      player.write(message);
    });
  },
  execute: function (player, string) {
    var command = string.trim().split(" ",1)[0].toLowerCase(),
        rest = string.trim().slice(command.length).trim();
    if (!this.commands.hasOwnProperty(command)) {
      player.write("Awfully sorry old chap, but I don't understand");
    } else {
      try {
        this.commands[command](rest, player, this);
      } catch (e) {
        console.log('Error running command: ' + string);
        console.log(e);
        console.trace();
        player.write("OH NO! There was an error handling your command. Watch out for the stack trace!");
        player.write(e);
        player.write(e.stack);
      }
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
  },
  // Get all players in the room
  getPlayers: function () {
    var _this = this;
    return _.filter(_.values(this.game.players), function (player) {return player.location == _this.id;})
  },
  // Send a message to all players in the room. Optionally you can
  // pass in a player to exclude from the message (for example, if
  // they are the source of the message you might not want them to
  // receive it)
  broadcast: function (message, excludePlayer) {
    if (excludePlayer && excludePlayer.name) {
      excludePlayer = excludePlayer.name;
    }
    _.each(this.getPlayers(), function (player) {
      if (excludePlayer !== player.name) {
        player.write(message);
      }
    });
  }
});

function Player(game, name) {
  events.EventEmitter.call(this);
  this.location = "home";
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
      this.game.emit('leaveRoom', this, this.getCurrentRoom(), this.game);
      this.location = id;
      this.game.emit('enterRoom', this, this.getCurrentRoom(), this.game);
    }
  }
});
