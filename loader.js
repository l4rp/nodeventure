/* Nodeventure loader: loads room and item definitions and sets up a
 * game object. It also handles reloading world modules as they change.
 *
 */
var vm = require('vm'),
    fs      = require("fs"),
    game = require('./game'),
    _ = require('underscore');

module.exports.Loader = Loader;

function WorldModule(game) {
  var _this = this;
  this._listenersAdded = [];
  // Make all regular globals available within the modules (is this a
  // good idea?)
  _.extend(this, global);
  // Inject underscore
  this._ = _;
  // Make available world creation commands
  this.command = _.bind(game.createCommand, game);
  this.room = _.bind(game.createRoom, game);
  // Method to add event listners which can automatically remove them
  // if we reload the module
  this.on = function (event, fn) {
    game.on(event, fn);
    // Keep a record of events added so we can remove them later
    _this._listenersAdded.push({event: event, fn: fn});
  };
}


function Loader(path) {
  this.game = new game.Game();
  this.path = path;
  this.modules = {};
  this.update();
  setInterval(_.bind(this.update, this), 5000);
}

_.extend(Loader.prototype, {
  update: function () {
    var files = fs.readdirSync(this.path),
        _this = this;
    for (var i = 0; i < files.length; i++) {
        var file = files[i],
            fullPath = this.path + "/" + file;
        // Check if it's a .js file.
        // TODO: Add support for coffeescript, maybe for JSON also?
        // Ignore files starting with ~ or .(it's an Emacs thing)
        if (file.match(/^[^.~].*[.]js$/) && fs.statSync(fullPath).isFile()) {
          var mtime = fs.statSync(fullPath).mtime + '';
          // Check if the file has changed
          if (!this.modules[file] || mtime !== this.modules[file].mtime) {
            console.log('Reloading world module:', file);
            this.game.broadcast('SYSTEM STATUS: Reloading world module:' + file);
            if (this.modules[file]) {
              // There's an existing module, we want to remove all
              // event handlers from it
              _.each(this.modules[file]._listenersAdded, function (listener) {
                _this.game.removeListener(listener.event, listener.fn);
              });
            }
            // Ok, lets (re)load it!
            var code = fs.readFileSync(fullPath),
                // Giving the module full access to node, could change
                // this....
                module = new WorldModule(this.game);
            module.mtime = mtime;
            try {
              vm.runInNewContext(code, module, fullPath);
            } catch (e) {
              var message = "Error loading world module: " + fullPath + "\n" + e.stack;
              console.log(message);
              this.game.broadcast(message);
            }
            this.modules[file] = module;
          }
        }
    }
    return this;
  }
});
