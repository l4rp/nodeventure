#drawRoom = (player) ->
  #resp = []
  #for seen in Object.keys(seen)
    #resp.push seen.id
  #return resp.join " -> "

handler "enterRoom", (player, room, game) ->
  #home is 0,0
  console.log player.pos
  {x,y,z} = player.pos
  #player.map ||= []
  #player.map[x][y][z] ||= room
  #console.log player.map

#command "map", (rest, player, game) ->
  #player.rooms_seen ||= {}
  #player.write drawMap(player)


