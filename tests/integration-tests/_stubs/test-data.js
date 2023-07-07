import gameSetting from "../../../src/game-settings";

const game = {
    id: gameSetting.id,
    name: gameSetting.name,
};

const currencyData = { code: "USD", name: "$US" };

const socketOptionsFunc = (port) => {
    return {
        socketUri: `http://localhost:${port}/user/${gameSetting.name.toLowerCase()}`,
        gameName: game.name,
        proxyRoute: "/socket.io",
    };
};

const gameConfig = {
    type: 0,
    name: gameSetting.name.toLowerCase(),
    minBet: 1,
    maxBet: 3000,
    maxBetPerChoices: { dragon: 3000, tiger: 3000, tie: 3000, blackDragon: 3000, redDragon: 3000, blackTiger: 3000, redTiger: 3000 },
    odds: { dragon: 1.97, tiger: 1.97, tie: 3.76, blackDragon: 3.76, redDragon: 14.5, blackTiger: 14.5, redTiger: 2.5 },
    botenabled: true,
    hour_maxbot: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    bot_maxbet: 1000,
    choices_maxbet: { player: 10000, banker: 10000, big: 10000, small: 10000, tie: 10000, playerPair: 10000, bankerPair: 10000 },
};

const roundsData = [
    {
        id: 1190119,
        result: { dragon: {rank: 2, suit: 1}, tiger: {rank: 3, suit: 2} },
        settlementResult: { dragon: true, tiger: false, tie: false, blackDragon: false, redDragon: true, blackTiger: true, redTiger: false},
        exchangeRateId: 1,
    },
    {
        id: 1190118,
        result: { dragon: {rank: 2, suit: 1}, tiger: {rank: 3, suit: 2} },
        settlementResult: { dragon: true, tiger: false, tie: false, blackDragon: false, redDragon: true, blackTiger: true, redTiger: false},
        exchangeRateId: 1,
    },
    {
        id: 1190117,
        result: { dragon: {rank: 2, suit: 1}, tiger: {rank: 3, suit: 2} },
        settlementResult: { dragon: true, tiger: false, tie: false, blackDragon: false, redDragon: true, blackTiger: true, redTiger: false},
        exchangeRateId: 1,
    },
];

const userBetData = (uid) => {
    return [
        {
            freeBet: false,
            uid: uid,
            betwin: 0,
            currency: "$US",
            playerId: 1,
            name: "NormalUser",
            odds: gameConfig.odds,
            operatorId: "dummy-operator-id",
            rate: 1,
            dragon: 102,
            tiger: 0,
            tie: 12,
            blackDragon: 0,
            redDragon: 0,
            blackTiger: 0,
            redTiger: 0,
            siteId: "111",
            roundId: 1190119,
            paid: true,
            totalAmount: 114,
        },
        {
            freeBet: false,
            uid: uid,
            betwin: 0,
            currency: "$US",
            playerId: 4,
            name: "NormalUser",
            odd: 0,
            odds: gameConfig.odds,
            operatorId: "dummy-operator-id",
            rate: 1,
            dragon: 10,
            tiger: 0,
            tie: 100,
            blackDragon: 0,
            redDragon: 0,
            blackTiger: 0,
            redTiger: 0,
            siteId: "111",
            roundId: 1190120,
            paid: true,
            totalAmount: 110,
        },
    ];
};


const userBetLogData = (uid) => {
    return [
        {
            uid: uid,
            currency: "$US",
            playerId: 1,
            name: "NormalUser",
            operatorId: "dummy-operator-id",
            rate: 1,
            siteId: "111",
            roundId: 1190120,
            dragon: 0,
            tiger: 0,
            tie: 100,
            blackDragon: 0,
            redDragon: 0,
            blackTiger: 0,
            redTiger: 0,
        },        
    ];
};

const promotions = [
    {
        gameId: gameSetting.id,
        startDateTime: new Date(new Date().setSeconds(new Date().getSeconds() + 15)),
        endDateTime: new Date(new Date().setSeconds(new Date().getSeconds() + 15 + 6)),
        isDaily: false,
        odds: { dragon: 1.98, tiger: 1.98, tie: 3.76, blackDragon: 3.76, redDragon: 14.5, blackTiger: 14.5, redTiger: 2.5 },
        status: "enabled",
    },
];

export { game, currencyData, socketOptionsFunc, gameConfig, roundsData, userBetData, promotions, userBetLogData };
