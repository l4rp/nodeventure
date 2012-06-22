command('fart', function (rest, player, game) {
  if (rest == 'silently') {
    player.write('You fart silently, yet deadly');
    setTimeout(function () {
      player.getCurrentRoom().broadcast('A nasty smell wafts around the room');
    }, 2000);
  } else {
    player.write('You fart');
    player.getCurrentRoom().broadcast(player.name + ' farts!', player);
  }
});

command('emote', function (rest, player, game) {
  player.getCurrentRoom().broadcast(player.name + ' ' + rest);
});
