room('home', {
  description: "You are in the Lab For the Recently Possible. A large table sits in the middle of the room around which geeks sit hard at work on some kind of text adventure...",
  exits: {west: 'meeting-room'}});

room('meeting-room', {
  description: "This is the breakout meeting room for the Lab for the Recently Possible",
  exits: {east: 'home'}});
