room('switzerland', {
    description: "You are standing on a mountain. Full of snow. Lots of snow. There is a slope down to a large, glistening lake. Above you is a huge pine  tree. Back to the west is the \'Lab for the Recently Possible\'.",
    exits: {west: 'home', up: 'pine-tree', down: 'swiss-slope'},
    items: [
        {short: 'a lemon', name: 'lemon', description: 'A small lemon, dressed in a woolly hat and scarf. His name is Lawrence.'},
        {short: 'a pair of skis', name: 'skis', description: 'A pair of red and white skis.'}
        ]
    });
    
    room('pine-tree', {
        description: "You are up inside the branches of a huge pine tree. Amongst the swathes of pine needles are a family of huge, Italian-Swiss speaking birds. They seem pre-occupied with feeding their babies. You can see a lot of snow below.",
        exits: {down: 'switzerland'},
    items: [{short: 'a nest', name: 'nest', description: 'A rather large and twiggy bird\'s nest.'}]
    });

    room('swiss-slope', {
        description: "Wow. You are falling. Fast. As the snow gathers around your ears, eyes and nostrils, and the wind rushes into the very soul of your fragile existence, you land on your feet on the soft ground. \nIn front of you is an immense expanse of water. The lake is bathed in golden green light. You feel at peace.",
        exits: {up: 'pine-tree'},
    items: [{short: 'water', name: 'water', description: 'Some water from a Swiss lake.'}]
    });