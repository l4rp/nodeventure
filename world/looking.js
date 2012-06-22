command('look',function (rest, player, game) {
  var room = player.getCurrentRoom();
  if (rest == '') {
    // Look at the current room
    player.write(room.description);
    _.map(room.getPlayers(), function (p) {
      if (player.name !== p.name) {
        player.write(p.name + ' is here');
      };
    });
    // Show all items in the room
    _.map(room.items, function(item) {
          player.write((item.short || item.name) + ' is here');
    });
    player.execute('exits');
  } else {
    // Maybe we want to look at an item in the room or in the player's inventory
    var item = player.getItem(rest) || room.getItem(rest);
    if (item) {
      player.write(item.description || item.short || item.name);
    } else {
      var otherPlayer = room.getPlayer(rest);
      if (otherPlayer) {
        player.write(otherPlayer.name + ' is ' + (otherPlayer.description || 'kind of generic looking'));
      } else {
        player.write("I don't know how to look at that");
      }
    }
  }
});

command('iam', function (rest, player, game) {
  player.description = rest;
});
