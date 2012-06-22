handler 'joinPlayer', (player, game) ->
  game.broadcast("player #{player} entered the game")

handler 'partPlayer', (player, game) ->
  game.broadcast("player #{player} left the game")

command 'coffee', (rest, player, game) ->
  player.write "Make it yourself"
