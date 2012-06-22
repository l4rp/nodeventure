handler 'joinPlayer', (player, room, game) ->
  room.broadcast("player #{player} entered the game")

handler 'leavePlayer', (player, room, game) ->
  room.broadcast("player #{player} entered the game")

command 'coffee', (rest, player, game) ->
  player.write "Make it yourself"
