command('attack', function (rest, player, game) {
  var victim = getTarget(player, rest.trim(), game);

  if (victim) {
    player.getCurrentRoom().broadcast(player.name + ' attacks ' + victim.name, player);
    player.write('You attack ' + victim.name + ", it's super effective!");
  } else {
    player.write('No one to attack by that name');
  }
});

function getTarget (player, target, game) {
  var rtn = _.filter(game.players, function (otherPlayer) {
    return target === otherPlayer.name && 
      otherPlayer.location === player.location &&
      player.name !== otherPlayer.name;
  });

  return rtn.length > 0 ? rtn[0] : null;
}