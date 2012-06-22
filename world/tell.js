command('tell', function (rest, player, game) {
  var to     = rest.trim().split(' ');
  var msg    = rest.trim().substring(to[0].length+1);
  var target = getPlayer(to[0]);

  if (target) {
    privateMessage(player, target, msg);
  } else {
    player.write('No player connected with that name.');
  }
});

function privateMessage(from, to, msg) {
  from.write('You tell ' + to.name + ': ' + msg);
  to.write(from.name + ' tells you: ' + msg);
}

function getPlayer(playerName) {
  if (!playerName) {
    return null;
  }
  var rtn = _.filter(game.players, function(player) {
    return player && player.name && player.name.toLowerCase() === playerName.toLowerCase();
  });
  return rtn.length > 0 ? rtn[0] : null;
}
