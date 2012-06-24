room('home', {
  description: "You are in the Lab For the Recently Possible. A large table sits in the middle of the room around which geeks sit hard at work on some kind of text adventure...",
  exits: {west: 'meeting-room', east:'switzerland'},
  items: []});

item('home', 'sword', 60, {short: 'a mighty sword', name: 'sword', description: 'This sword is really really really mighty'});

room('meeting-room', {
  description: "This is the 'Room of Ideas' at the Lab for the Recently Possible. There is a dark hole here.",
  items: [],
  exits: {east: 'home', down: 'hole', west: 'lobby'}});

item('meeting-room', 'mirror', 60, {short: 'a mirror', name: 'mirror', description: 'This mirror makes things look different...'});

room('hole', {
  description: "You are in a deep, dark hole.",
  exits: {up: 'hole2'}});

room('hole2', {
  description: "You scramble and fail to get out. You are trapped here forever. Perhaps you can cry? But wait a minute! Is that a rope?",
  items: [],
  exits: {up: 'hole2', rope: 'meeting-room'}});

item('hole2','chalk', 60, {short: 'white chalk' , uses: 3, name: 'chalk', description: 'A bit of white chalk. You could probably use it to "write <message>".'});

item('hole2', 'rum', 65, {short: 'a bottle of rum', name: 'rum', description: 'A large bottle full of rum.  The label says "Blackbeard\'s Hearty Rum - The Original Gutburner"'});

handler('roomTransition:hole2:meeting-room', function (player, from, to) {
  player.write('You climb the rope out of the hole');
  from.broadcast(player.name + ' climbs the rope out of the hole', player);
});


room('lobby', {
  description: "You are in the lobby. There is a door to the west. You can see a Window to the East, and there is chest in the corner to your left.",
  items: [{name: 'chest', short: 'an old chest', gettable: false, description: 'old chest is old. Look at how old it is!'},{name: 'window', short: 'a window', gettable: false, description: 'You look out the window, there are trees. A gentle breeze blows over a lily pond and a swan gracefully moves and turns to look at you. Life is good. Nothing to see here... move on.'}],
  exits: {east: 'meeting-room', west: 'outside-dock'}});

room('outside-dock', {
  description: "You are outside the dock. You are surrounded by waving trees and tall buildings. Infront of you is a road leading to the south or the north.",
  exits: {north:"road-bridge", south: "road-crossing", east:"lobby"}});

room('road-crossing', {
  description: "You are at the crossing. Cars pass by you periodically.",
  exits: {north: 'outside-dock', south: 'beach'}});


room('road-bridge', {
  description: "You are on a bridge. You can head north.",
  exits: {south: 'outside-dock', north: 'street'}});

room('street', {
  description: "You step into an eerily empty street. An alleyway is to east.",
  exits: {south: 'outside-dock', east: 'alleyway'}});

room('alleyway', {
  description: "You are in a dingey and spooky alleyway. To the north a suspicious wooden door awaits you...",
  exits: {west: 'street', north: 'hall-of-mirrors'}});
