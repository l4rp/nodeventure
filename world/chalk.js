command('write', function (rest, player, game) {
  var item = player.getItem('chalk');
  if (!item) {
    player.write("You don't have anything to write with!");
    if (player.getCurrentRoom().getItem('chalk')) {
      player.write('Maybe you could get that piece of chalk?');
    }
  } else {
    player.write('You scrawl "' + rest + '" on a nearby wall');
    player.broadcast(player.name + ' scrawls "' + rest + '" on a nearby wall');
    player.getCurrentRoom().items.push({short: '"' + rest + '" scralwed in chalk on a nearby wall'});
    item.uses--;
    if (item.uses === 1) {
      player.write('The chalk is almost gone!');
      item.description = item.description + ' It is almost all gone.';
    } else if (item.uses === 0) {
      player.write('The chalk is all gone!');
      player.items = _.without(player.items, item);
    }
  }
});
