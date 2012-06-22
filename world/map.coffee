#drawRoom = (player) ->
  #resp = []
  #for seen in Object.keys(seen)
    #resp.push seen.id
  #return resp.join " -> "

handler "leaveRoom", (player, room, game) ->
  player.map ||= {}
  player.map[room.name] = { room: room }
  player.last_room = room

handler "enterRoom", (player, room, game) ->
  player.map ||= {}
  player.map[room.id] = { entered_from: player.last_room, room: room }
  player.map["__current"] = player.map[room.id]
  if player.last_room
    player.write "Entered #{room.id} from #{player.last_room.id}"
  console.log player.map
  #home is 0,0

#command "map", (rest, player, game) ->
  #player.rooms_seen ||= {}
  #player.write drawMap(player)


