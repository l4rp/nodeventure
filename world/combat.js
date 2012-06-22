command('attack', 'Attack another player! Example: attack bob', function (rest, player, game) {
  var victim = getTarget(player, rest.trim(), game);
  var damage = 1;

  if (victim) {
    player.getCurrentRoom().broadcast(player.name + ' attacks ' + victim.name, player);
    player.write('You attack ' + victim.name + ", it's super effective!");
    victim.health -= damage;
    victim.write(player.name + " hit you for " + damage + " damage! You have " + victim.health + " left.")
    victim.write({effect: 'attack'});
  } else {
    player.write('No one to attack by that name');
  }
});

function getTarget (player, target, game) {
  var rtn = _.filter(game.players, function (otherPlayer) {
    return target.toLowerCase() === otherPlayer.name.toLowerCase() && 
      otherPlayer.location === player.location &&
      player.name.toLowerCase() !== otherPlayer.name.toLowerCase();
  });

  return rtn.length > 0 ? rtn[0] : null;
}

command('shove', 'Shove another player somewhere! Example: shove bob north', function (rest, player, game) {
  var bits       = rest.trim().split(' ');
  var victim     = getTarget(player, bits[0], game);
  var exits      = game.rooms[player.location].exits;
  var directions = _.keys(exits);
  var validDir   = _.any(directions, function(d){return d===bits[1]});

  if (validDir && victim) {
    var direction = bits[1];

    player.write("You shove " + victim.name + " " + direction + ", lol!");
    victim.write(player.name + " shoved you " + direction + "!");
    player.getCurrentRoom().broadcast(player.name + ' shoves ' + victim.name + ' ' + direction);
    victim.location = exits[direction];
    victim.execute('look');
  } else {
    player.write("You can't shove " + victim.name + " in that direction.");
  }
});

command('health', "Check your character's current health", function (rest, player, game) {
  player.write("Health: " + player.health);
});
