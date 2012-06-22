var yeti = character('yeti', {
  location: 'switzerland',
  description: 'half man, half monkey,half bear and all yeti. He seems to like the snow.'
});

handler('tick', function () {
  // every 30 minutes on average
  if (Math.random() * 30 < 1) {
    var room = yeti.getCurrentRoom(),
        exits = _.keys(room.exits),
        i = Math.floor(Math.random()*exits.length),
        exit = exits[i];
    room.broadcast('The Yeti picks himself up and heads to the ' + exit + ' exit');
    yeti.execute('go ' + exit);
    if (room === yeti.getCurrentRoom()) {
      room.broadcast('The Yeti is enraged to find himself back in the place');
      yeti.description = 'enraged';
    } else {
      room = yeti.getCurrentRoom();
      if (room.description.toLowerCase().indexOf('snow') === -1) {
        room.broadcast('The yeti seems dismayed not to find any snow here');
        yeti.description = 'half man, half monkey,half bear and all yeti. He seems to miss the snow.';
      } else {
        room.broadcast('The yeti seems delighted to find snow here!');
        yeti.description = 'Half man, half monkey, half bear and all yeti. He seems to like the snow.';
      }
    }
  }
});
