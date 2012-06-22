var seagull = character('seagull', {
  location: 'beach-stretch',
  description: 'a mischievious looking seagull.'
});

handler('tick', function () {
  var room = seagull.getCurrentRoom(),
      presentPlayers = room.getPlayers(),
      vitcim;

  if(Math.random() * 16 < 1){

    // if someone is present
    if (presentPlayers.length > 1){
      // choose random player
      victim = presentPlayers[Math.floor(Math.random()*presentPlayers.length)];
      // seagull doesnt attack itself
      if (victim.name != 'seagull') {
        room.broadcast('The seagull flaps its wings angrily and pecks at ' + victim.name);
        room.broadcast(victim.name + ' loses 1 point of health!');
        victim.health -= 1;
      }
    }
  }

  if (Math.random() * 10 < 1) {
    seagull.execute('say Caw! Caw!');
  }
});