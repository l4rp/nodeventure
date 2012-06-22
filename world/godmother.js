command('godmother', function (rest, player, game) {
  player.getCurrentRoom().broadcast(player.name + "'s fairy godmother appears in a flash of helpfulness");
  player.getCurrentRoom().broadcast(player.name + "'s fairy godmother: oh dear! what have you done, do you need help getting home?");
  player.getCurrentRoom().broadcast(player.name + "'s fairy godmother: click your heels by typing 'clickheels' and I'll help you home.");
  player.godmotherPresent = true;
});

command('clickheels', function (rest, player, game) {
  player.write('You click your heels');
  player.getCurrentRoom().broadcast(player.name + ' clicks their heels', player);
  if (player.godmotherPresent) {
    player.health = 100;
    player.getCurrentRoom().broadcast(player.name + "'s fairy godmother: Ok, but don't get yourself lost again!");
    player.setCurrentRoom('home');
    player.execute('look');
    player.godmotherPresent = false;
  } else {
    player.getCurrentRoom().broadcast('Nothing happens in a definitive way.');
  }
});
