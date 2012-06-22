command('go',function (rest, player, game) {
  var currentRoom = player.getCurrentRoom(),
      destination = currentRoom.getExit(rest.toLowerCase());
  if (destination) {
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
	if (player.getCurrentRoom().items!==undefined) {
		player.write('There are items here!');
	}
  player.execute('exits');
});

command('exits',function (rest, player, game) {
  var exits = Object.keys(player.getCurrentRoom().exits);
  player.write("Exits: " + exits.join(","));
});
 
