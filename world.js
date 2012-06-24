var _ = require('underscore');
var util = require("util");
var events = require("events");

module.exports.WorldModule = WorldModule;

function WorldModule(game) {
  events.EventEmitter.call(this);
  var _this = this;
  this._listenersAdded = [];
  this._spawns = {};
  // Make all regular globals available within the modules (is this a
  // good idea?)
  _.extend(this, global);
  // Inject underscore
  this._ = _;
  this.game = game;
  this.require = require;
  // Make available world creation commands
  this.command = _.bind(game.createCommand, game);
  // Create a command that expects an item name following it. Will
  // automatically check that the item is present.
  this.itemCommand = function (command, item, description, fn) {
    game.createCommand(command + ' ' + item, description, fn);
  };
  this.room = _.bind(game.createRoom, game);
  this.character = function (name, properties) {
    var player = game.createPlayer(name);
    properties.npc = true;
    _.extend(player, properties);
    return player;
  };
  this.setTimeout = function (fn, time) {
    setTimeout(function () {
      try {
        fn();
      } catch(e) {
        game.broadcast('Error running timeout');
        game.broadcast(e);
        game.broadcast(e.stack);
        console.trace();
      }
    }, time);
  };
  this.handler = function (event, fn) {
    var wrapped = function () {
      try {
        fn.apply(_this, arguments);
      } catch (e) {
        game.broadcast('Error running handler for event: ' + event);
        game.broadcast(e);
        game.broadcast(e.stack);
        console.log('Error running handler for event: ' + event);
        console.trace();
        _this.removeListener(event, wrapped);
      }
    };
    _this.on(event,  wrapped);
  };
  // Create an item in the given room every spawnFrequency seconds if
  // one of the same name does not already exist.
  this.item = function (room, name, spawnFrequency, item) {
    item.name = name;
    _this._spawns[room + ':' + name] = {room: room, lastSpawn: 0, spawnFrequency: spawnFrequency, item: item};
  };

  // Set up a tick handler to check for spawns
  this.handler('tick', function () {
    _.each(_this._spawns, function (spawn) {
      var t = (new Date()).getTime()/1000,
          room = game.rooms[spawn.room];
      if (t-spawn.lastSpawn > spawn.spawnFrequency) {
        spawn.lastSpawn = t;
        if (!room.getItem(spawn.item.name)) {
          var item = _.clone(spawn.item);
          room.items.push(item);
          game.emit('spawn', room, item);
        }
      }
    });
  });
  
}

util.inherits(WorldModule, events.EventEmitter);
