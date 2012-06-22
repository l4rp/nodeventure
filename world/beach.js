
room('beach', {
  description: "You are at the beach. Waves crash against the shore. Towards the east you see a pier. To the west you see the beach stretch to the horizon.",
  exits: {north: 'road-crossing', east: 'pier', west: 'beach-stretch'}})

room('beach-stretch', {
  description: "You are at a stretch of beach. There is a gang of intimidating seagulls here. Watch your sandwhiches!",
  exits: {east: 'beach'}});

room('pier', {
  description: "You arrive at a rusty pier. The amusements and rides once running are abandoned and silent.",
  exits: {west:'beach'}});