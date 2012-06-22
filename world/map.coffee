#drawRoom = (player) ->
  #resp = []
  #for seen in Object.keys(seen)
    #resp.push seen.id
  #return resp.join " -> "
opposite =
  west: 'east'
  east: 'west'
  south: 'north'
  north: 'south'
  up: 'down'
  down: 'up'

handler "leaveRoom", (player, room, game) ->
  player.map ||= {}
  player.map[room.id] ||= { room: room }
  player.map.__previous = player.map[room.id]

handler "command:go", (rest, player, game) ->
  player.map.__current?.entered_via = opposite[rest]
  player.map.__previous?.left_via = rest
  console.log player.map

handler "enterRoom", (player, room, game) ->
  player.map ||= {}
  player.map[room.id] ||= { room: room }
  player.map.__current = player.map[room.id]
  if player.last_room
    player.write "Entered #{room.id} from #{player.last_room.id}"

  command 'retreat', 'go back from whence we came', (rest, player, game) ->
    via = player.map["__current"].entered_via
    if via
      game.execute(player, "go #{via}")
    else
      player.write "Can't retreat any further... Perhaps you need some www.bearsemen.com"

default_room = """
            N
            N
            N
    XXXXXXXXXXXXXXXXXX
    X                X
    X                X
    X                X
WWWWXZZZZZZZZZZZZZZZZXEEEE
    X                X
    X OOOOOOOOOOOOOO X
    X                X
    XXXXXXXXXXXXXXXXXX
            S
            S
            S
"""

command "map", (rest, player, game) ->
  room = default_room
  map = player.map.__current
  #room = room.replace(/\s/g,"&nbsp;")
  #for d in ['N','S','E','W']
    #rx = new RegExp(d+"*")
    #room = room.replace(rx,"&nbsp;")
  player.write(room)



