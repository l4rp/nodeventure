command('go',function (rest, player, game) {
  var currentRoom = player.getCurrentRoom(),
      direction = rest.toLowerCase(),
      destination = currentRoom.getExit(direction);
  if (destination) {
    player.prevPos = player.pos;
    switch(direction) {
      case "north":
        player.pos.x++;
      case "south":
        player.pos.x--;
      case "east":
        player.pos.y++;
      case "west":
        player.pos.y--;
      case "down":
        player.pos.z--;
      case "up":
        player.pos.z++;
    };
    player.setCurrentRoom(destination);
    player.write("You go " + rest);
    player.execute("look");
  } else {
    player.write("There is no " + rest + " exit");
  }
});

command('look',function (rest, player, game) {
  // TODO: Support looking *at* things
  player.write(player.getCurrentRoom().description);
  _.map(player.getCurrentRoom().getPlayers(), function (p) {
    if (player.name !== p.name) {
      player.write(p.name + ' is here');
    };
  });
  _.map(player.getCurrentRoom().items, function(item) {
	player.write((item.short || item.name) + ' is here');
  });
  player.execute('exits');
});

command('exits',function (rest, player, game) {
  var exits = Object.keys(player.getCurrentRoom().exits);
  player.write("Exits: " + exits.join(","));
});
 
