var tripThings = ['stares intently at their hands',
                  'looks at a wall and mumbles',
                  'disagrees with gravity',
                  'falls over their own toes',
                  'explodes, in their mind',
                  'sits and giggles',
                  'realises that the universe is infinite, and that icecream would be awesome',
                  'is argumentative with a peanut',
		  'has lost all sense of time'];

command('eat', function (rest, player) {
//   game.emit('eat:' + rest, player);
// });

// handler('east:mushroom', function (player) 
        // {

  if (rest == 'mushroom') {
    var mushroom = player.getItem('mushroom') || player.getCurrentRoom().getItem('mushroom');
    mushroom.name = 'remnants';
    mushroom.short = 'mushroom remnants';
    mushroom.description = 'crumbs remaining from that mushroom ' + player.name + ' ate';
    player.write({effect: 'woah'});
    player.getCurrentRoom().broadcast(player.name + ' scoffs the mushroom', player);
    player.write('you scoff the mushroom');
    function trip() {
      setTimeout(function () {
        player.write({effect: 'unwoah'});
        var message = tripThings[Math.floor(Math.random()*tripThings.length)];
        player.getCurrentRoom().broadcast(player.name + ' ' + message);
        if (Math.random() > 0.2) {
          trip();
        } else {
          player.getCurrentRoom().broadcast(player.name + ' looks a lot more normal', player);
          player.write('you feel a lot more normal')
        }
      }, Math.random() * 10000);
    }
    trip();
  } else {
    player.write("You can't eat that");
  }
});
