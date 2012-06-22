#drawRoom = (player) ->
  #resp = []
  #for seen in Object.keys(seen)
    #resp.push seen.id
  #return resp.join " -> "

#handler "enterRoom", (player, room, game) ->
  ##home is 0,0
  #player.pos ||= {x:0, y:0}
  #player.map ||= []
  #player.map[player.pos.x][player.pos.y] ||= room

#command "map", (rest, player, game) ->
  #player.rooms_seen ||= {}
  #player.write drawMap(player)


