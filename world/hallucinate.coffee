handler "invuse:mirror", (rest, player, game) ->
  player.write {effect: "mirror"} 
  player.write "Hi, Sexy"

handler "invdrop:mirror", (rest, player, game) ->
  player.write {effect: "unmirror"} 
