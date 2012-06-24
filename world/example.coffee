handler 'joinPlayer', (player, game) ->
  game.broadcast("player #{player.name} entered the game")

handler 'partPlayer', (player, game) ->
  game.broadcast("player #{player.name} left the game")

command 'coffee', (rest, player, game) ->
  player.write "Make it yourself"

