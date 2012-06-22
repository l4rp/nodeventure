room('home', {
  description: "You are in the Lab For the Recently Possible. A large table sits in the middle of the room around which geeks sit hard at work on some kind of text adventure...",
  exits: {west: 'meeting-room'},
  items: [{short: 'a mighty sword', name: 'sword', description: 'This sword is really really really mighty'}]});

room('meeting-room', {
  description: "This is the breakout meeting room for the Lab for the Recently Possible. There is a dark hole here.",
  exits: {east: 'home', down: 'hole', west: 'lobby'}});

room('hole', {
  description: "You are in a deep, dark hole.",
  exits: {up: 'hole2'}});

room('hole2', {
  description: "You scramble and fail to get out. You are trapped here forever. Perhaps you can cry?",
  exits: {up: 'hole2'}});

room('lobby', {
  description: "You are in the lobby. There is a door to the west. You can see a Window to the East, and there is chest in the corner to your left.",
  items: [{name: 'chest', short: 'an old chest', getable: false, description: 'old chest is old. Look at how old it is!'}],
  exits: {east: 'meeting-room', west: 'outside-dock'}});

room('outside-dock', {
  description: "You are outside the dock. You are surrounded by waving trees and tall buildings. Infront of you is a road leading to the south or the north.",
  exits: {north:"road-bridge", south: "road-crossing", east:"lobby"}});

room('road-crossing', {
  description: "You are at the crossing. Cars pass by you periodically.",
  exits: {north: 'outside-dock', south: 'beach'}});

room('beach', {
  description: "You are at the beach. There is a gang of intimidating seagulls here. Watch your bacon sandwhiches!",
  exits: {north: 'road-crossing'}})

room('road-bridge', {
  description: "You are on a bridge. Go back for now.",
  exits: {south: 'outside-dock'}});