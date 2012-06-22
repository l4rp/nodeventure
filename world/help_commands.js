command('commands', 'list all commands available in the game', function (rest, player, game) {
  player.write('Available commands: ' + _.keys(game.commands).join(", "));
});

command('help', 'get you some help! Example: "help <command>"', function (rest, player, game) {
	if (rest) {
	    var command = game.commands[rest];
	    if (command) {
	      player.write(rest + ': ' + command.description);
	    } else {
	      player.write("I don't recognise that command");
	    }
	  } else {
	    player.write('Try typing "commands" to get a list of commands then "help <command>" for more info.\nSome other thngs to try: "go <direction>" to move, "say <message>" to talk and "look" to look around');
	  }
});

command('roll', 'Broadcast a dice roll between 1-6: "roll". See also "dice".', function (rest, player, game) {
  game.execute(player, "dice");
});

command('dice', 'Broadcast a dice roll between 1-6: "dice". See also "roll"', function (rest, player, game) {
  var roll = Math.ceil(Math.random()*6);
  player.getCurrentRoom().broadcast(player.name + ' rolls a ' + roll, player);
  player.write('You rolled a ' + roll);
});