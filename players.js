let players = [
    {
        name: 'Player 1',
        avatar: require('./assets/img/player-1.png'),
        startDie: 0,
        turn: false,
        turnEnded: false,
        score: 0,
        lastDieNumbers: [
            0,
            0,
            0,
        ],
        pinstripes: 5,
        throws: 0,
        disabled: true
    },
    {
        name: 'Player 2',
        avatar: require('./assets/img/player-2.png'),
        startDice: 0,
        turn: false,
        turnEnded: false,
        score: 0,
        lastDieNumbers: [
            0,
            0,
            0,
        ],
        pinstripes: 5,
        throws: 0,
        disabled: true
    }
];

  export default players;