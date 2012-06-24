command('fart', 'Let one off. You can also let a silent one off.', function (rest, player, game) {
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

command('emote', 'Make an emotion. Example: emote smiles.', function (rest, player, game) {
  player.getCurrentRoom().broadcast(player.name + ' ' + rest);
});

command('fnarr', 'Snigger at some innuendo', function (rest,player, game) {
  player.write('fnar! fnar! you exclaim');
  player.getCurrentRoom().broadcast('fnar! fnar! exclaims ' + player.name, player);
});
