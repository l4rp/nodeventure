command('commands', function (rest, player, game) {
  player.write('Available commands: ' + _.keys(game.commands).join(", "));
});

command('help', function (rest, player, game) {
  player.write('TODO: write some help. Sorry!');
  player.write('Try typing "commands" to get a list of commands, "go <direction>" to move, "say <message>" to talk and "look" to look around');
});
