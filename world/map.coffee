#drawRoom = (player) ->
  #resp = []
  #for seen in Object.keys(seen)
    #resp.push seen.id
  #return resp.join " -> "

handler "leaveRoom", (player, room, game) ->
  player.map ||= {}
  player.write "LEAVE"
  player.map[room.id] ||= { room: room }
  player.map["__previous"] = player.map[room.id]

handler "command:go", (rest, player, game) ->
  player.write "VIA #{rest}"
  player.map["__current"].entered_via = rest

handler "enterRoom", (player, room, game) ->
  player.write "ENTER"
  player.map ||= {}
  player.map[room.id] = 
    entered_via: player.last_exit
    entered_from: player.last_room
    room: room 
  player.map["__current"] = player.map[room.id]
  if player.last_room
    player.write "Entered #{room.id} from #{player.last_room.id}"
  console.log player.map
  #home is 0,0

  command 'retreat', 'go back from whence we came', (rest, player, game) ->
    via = player.map["__current"].entered_via
    if via
      game.execute(player, "go #{via}")
    else
      player.write "Can't retreat any further... Perhaps you need some www.bearsemen.com"

#command "map", (rest, player, game) ->
  #player.rooms_seen ||= {}
  #player.write drawMap(player)


