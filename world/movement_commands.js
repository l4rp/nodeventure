command('go',function (rest, player, game) {
  var currentRoom = player.getCurrentRoom(),
      direction = rest.toLowerCase(),
      destination = currentRoom.getExit(direction);
  if (destination) {
    player.setCurrentRoom(destination);
    player.write("You go " + rest);
    player.execute("look");
  } else {
    player.write("There is no " + rest + " exit");
  }
});

command('n',function (rest, player, game) {
  var currentRoom = player.getCurrentRoom(),
      direction = 'north',
      destination = currentRoom.getExit(direction);
  if (destination) {
    player.setCurrentRoom(destination);
    player.write("You go " + direction);
    player.execute("look");
  } else {
    player.write("There is no " + rest + " exit");
  }
});

command('e',function (rest, player, game) {
  var currentRoom = player.getCurrentRoom(),
      direction = 'east',
      destination = currentRoom.getExit(direction);
  if (destination) {
    player.setCurrentRoom(destination);
    player.write("You go " + direction);
    player.execute("look");
  } else {
    player.write("There is no " + rest + " exit");
  }
});

command('s',function (rest, player, game) {
  var currentRoom = player.getCurrentRoom(),
      direction = 'south',
      destination = currentRoom.getExit(direction);
  if (destination) {
    player.setCurrentRoom(destination);
    player.write("You go " + direction);
    player.execute("look");
  } else {
    player.write("There is no " + rest + " exit");
  }
});

command('w',function (rest, player, game) {
  var currentRoom = player.getCurrentRoom(),
      direction = 'west',
      destination = currentRoom.getExit(direction);
  if (destination) {
    player.setCurrentRoom(destination);
    player.write("You go " + direction);
    player.execute("look");
  } else {
    player.write("There is no " + rest + " exit");
  }
});

command('exits',function (rest, player, game) {
  var exits = Object.keys(player.getCurrentRoom().exits);
  player.write("Exits: " + exits.join(","));
});
 
