trumpet = require('trumpet')
stream = require('stream')
room = """
<div class="map">
  <div class="room">
    <p class="name">Room Name</p>
  </div>
</div>
"""

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

command "map", (rest, player, game) ->
  #give a map of the local area
  map = player.map.__current
  tr = trumpet()
  tr.update("p.name", map.room.id)

  html = ""
  tr.on "data", (buffer) -> html += buffer

  tr.on "end", (buffer) ->
    console.log html
    player.write html: html

  tr.write(room)
  tr.end()
