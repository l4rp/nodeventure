itemCommand 'use', 'mirror', (rest, player, game) ->
  if player.mirrored
    player.mirrored = false
    player.write {effect: "unmirror"}
  else
    player.mirrored = true
    player.write {effect: "mirror"}
    player.write "Hi, Sexy"
