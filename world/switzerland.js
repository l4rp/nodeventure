room('switzerland', {
    description: "You are standing on a mountain. Full of snow. Lots of snow. There is a slope down to a large, glistening lake. Above you is a huge pine tree. Back to the west is the *Lab for the Recently Possible*.",
    exits: {west: 'home', up: 'pine-tree', down: 'swiss-slope'},
    items: [{short: 'a lemon', name: 'lemon', description: 'A small lemon, dressed in a wooly hat and scarf. His name is Lawrence.'}]
});
    
room('pine-tree', {
    description: "You are up inside the branches of a huge pine tree. Amongst the swathes of pine needles are huge birds, caring for their babies in their nests. You can see down below.",
    exits: {down: 'switzerland'},
items: [{short: 'a nest', name: 'nest', description: 'A rather large and twiggy bird\'s nest.'}]
});
