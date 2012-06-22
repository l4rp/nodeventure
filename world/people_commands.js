handler('enterRoom', function (player, room, game) {
  room.broadcast(player.name + ' enters the room', player);
})

handler('leaveRoom', function (player, room, game) {
  room.broadcast(player.name + ' leaves the room', player);
})

command('say', function (rest, player, game) {
  player.getCurrentRoom().broadcast(player.name + ' says: ' + rest.trim(), player);
  player.write('You say: ' + rest.trim());
});
