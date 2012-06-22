var fs = require('fs');

var playerSaveProperties = ["description", "location", "inventory"];

function savePlayer(player) {
  // Save the current player
  if (player.name.indexOf('/') != -1) {
    player.write('SANITY CHECK FAILED, BLUUUURG');
    return;
  }
  var toSave = {};
  _.each(playerSaveProperties, function (prop) {
    toSave[prop] = player[prop];
  });
  fs.writeFileSync('./players/player_' + player.name + '.json', JSON.stringify(toSave));
}

command('save', 'save your soul (and your game)', function (rest, player) {
  savePlayer(player);
});

handler('tick', function () {
  _.each(game.players, savePlayer);
});

handler('joinPlayer', function (player, game) {
  if (player.name.indexOf('/') != -1) {
    player.write('SANITY CHECK FAILED, BLUUUURG');
    return;
  }
  try {
    var data = fs.readFileSync('./players/player_' + player.name + '.json');
  } catch (e) {
    player.write('No load file found');
    return;
  }
  if (data) {
    player.write('Loading you!');
    _.extend(player, JSON.parse(data));
  }
});
