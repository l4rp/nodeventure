var _ = require('underscore');
var util = require("util");
var events = require("events");

module.exports.WorldModule = WorldModule;

function WorldModule(game) {
  events.EventEmitter.call(this);
  var _this = this;
  this._listenersAdded = [];
  // Make all regular globals available within the modules (is this a
  // good idea?)
  _.extend(this, global);
  // Inject underscore
  this._ = _;
  this.game = game;
  // Make available world creation commands
  this.command = _.bind(game.createCommand, game);
  this.room = _.bind(game.createRoom, game);
  this.handler = function (event, fn) {
    _this.on(event, function () {
      try {
        fn.apply(_this, arguments);
      } catch (e) {
        game.broadcast('Error running handler for event: ' + event);
        game.broadcast(e);
        game.broadcast(e.stack);
        console.log('Error running handler for event: ' + event);
        console.trace();
      }
    });
  };
}

util.inherits(WorldModule, events.EventEmitter);
