room('hall-of-mirrors', {
  description: "You are in a hall of mirrors, try not to get lost!",
  exits: {north: 'mirrors-room-1', east: 'mirrors-room-2', west: 'mirrors-room-3'}});

room('mirrors-room-1', {
  description: "Great, more mirrors... Where to?",
  exits: {north: 'mirrors-room-2', east: 'mirrors-room-3', south: 'mirrors-room-1'}});

room('mirrors-room-2', {
  description: "Great, more mirrors... Where to?",
  exits: {south: 'hall-of-mirrors', east: 'mirrors-room-3', west: 'mirrors-room-1'}});

room('mirrors-room-3', {
  description: "Great, more mirrors... Where to?",
  exits: {north: 'mirrors-room-2', south: 'mirrors-room-1', west: 'mirrors-room-end'}});

room('mirrors-room-end', {
  description: "You can see an exit to the south! On the floor is a quantum gemerald",
  exits: {south: 'alleyway'},
  items: [{short: 'gemerald', name: 'gemerald', description: 'This gemerald is pretty shiny'}]});
