command('get', function (rest, player, game) {
  _.map(player.getCurrentRoom().items, function(item) {
    if (item.name === rest) {
      // remove item from room & add to player inventory
      player.write("You pick up the " + rest);
      player.getCurrentRoom().broadcast(player.name + ' picks up the ' + rest, player);
      player.getCurrentRoom().items = _.without(player.getCurrentRoom().items, item);
      player.inventory.push(item);
    } else {
      player.write("Sorry, the item: " + rest + ", is not here.");
    }
  });
});

command('drop', function (rest, player, game) {
  _.map(player.inventory, function(item) {
    if (item.name === rest) {
      // remove item from player inventory & add to current room
      player.write("You drop the " + rest);
      player.getCurrentRoom().broadcast(player.name + ' drops the ' + rest, player);
      player.inventory = _.without(player.inventory, item);
      player.getCurrentRoom().items.push(item);
    } else {
      player.write("The item: " + rest + ", is not in your inventory.");
    }
  });
});
