/* Nodeventure loader: loads room and item definitions and sets up a
 * game object. It also handles reloading world modules as they change.
 *
 */
var vm = require('vm'),
    fs      = require("fs"),
    game    = require('./game'),
    cs      = require('coffee-script'),
    _       = require('underscore'),
    WorldModule = require('./world').WorldModule;

module.exports.Loader = Loader;

function Loader(path) {
  var _this = this;
  this.game = new game.Game();
  this.path = path;
  this.modules = {};
  this.update();
  setInterval(_.bind(this.update, this), 5000);
  // Game's emit has been extended to emit an 'all' event on any event
  this.game.on('all', function (event /* ,args...*/) {
    var args = _.toArray(arguments);
    _.each(_this.modules, function (module) {
      module.emit.apply(module, args);
    });
  });
}

_.extend(Loader.prototype, {
  update: function () {
    var files = fs.readdirSync(this.path),
        _this = this;
    for (var i = 0; i < files.length; i++) {
        var file = files[i],
            fullPath = this.path + "/" + file,
            type = file.match(/^[^.~].*\.(js|coffee)$/);
        // Check if it's a .js file.
        // TODO: Add support for coffeescript, maybe for JSON also?
        // Ignore files starting with ~ or .(it's an Emacs thing)
        if (type && fs.statSync(fullPath).isFile()) {
          var mtime = fs.statSync(fullPath).mtime + '';
          // Check if the file has changed
          if (!this.modules[file] || mtime !== this.modules[file].mtime) {
            console.log('Reloading world module:', file);
            this.game.broadcast('SYSTEM STATUS: Reloading world module:' + file);
            // Ok, lets (re)load it!
            var code = fs.readFileSync(fullPath, 'utf8'),
                // Giving the module full access to node, could change
                // this....
                module = new WorldModule(this.game);

            if(type[1] == 'coffee') {
              code = cs.compile(code);
            }

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
