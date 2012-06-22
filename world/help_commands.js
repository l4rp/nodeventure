command('commands', function (rest, player, game) {
  player.write('Available commands: ' + _.keys(game.commands).join(", "));
});

command('help', function (rest, player, game) {
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
