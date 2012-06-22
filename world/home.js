room('home', {
  description: "You are in the Lab For the Recently Possible. A large table sits in the middle of the room around which geeks sit hard at work on some kind of text adventure...",
  exits: {west: 'meeting-room'}});

room('meeting-room', {
  description: "This is the breakout meeting room for the Lab for the Recently Possible. There is a dark hole here.",
  exits: {east: 'home', down: 'hole'}});

room('hole', {
  description: "You are in a deep, dark hole.",
  exits: {up: 'hole2'}});

room('hole2', {
  description: "You scramble and fail to get out. You are trapped here forever. Perhaps you can cry?",
  exits: {up: 'hole2'}});

