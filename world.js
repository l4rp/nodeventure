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
  this.handler = _.bind(this.on, this);
}

util.inherits(WorldModule, events.EventEmitter);
