import gameSetting from "./../../../src/game-settings";

const game = {
    id: gameSetting.id,
    name: gameSetting.name,
};

const currencyData = { code: "USD", name: "$US" };

const socketOptions = {
    socketUri: "http://localhost:8087/user/" + game.name.toLowerCase(),
    gameName: game.name,
    proxyRoute: "/socket.io",
};

const gameConfig = {
    type: 0,
    name: gameSetting.name.toLowerCase(),
    minBet: 1,
    maxBet: 3000,
    maxBetPerChoices: { player: 3000, banker: 3000, big: 3000, small: 3000, tie: 1000, playerPair: 1000, bankerPair: 3000 },
    odds: { player: 2, banker: 1.96, big: 1.54, small: 2.4, tie: 8, playerPair: 11, bankerPair: 11 },
};

const rounds = [
    {
        id: 1190119,
        exchangeRateId: 1,
        player: { card1: { card: 3, type: 2 }, card2: { card: 9, type: 1 }, card3: { card: 1, type: 0 } },
        banker: { card1: { card: 6, type: 3 }, card2: { card: 7, type: 1 }, card3: null },
        result: { player: true, banker: false, big: true, small: false, tie: false, playerPair: false, bankerPair: false },
    },
    {
        id: 1190118,
        exchangeRateId: 1,
        player: { card1: { card: 6, type: 1 }, card2: { card: 0, type: 2 }, card3: null },
        banker: { card1: { card: 2, type: 2 }, card2: { card: 5, type: 0 }, card3: null },
        result: { player: false, banker: true, big: false, small: true, tie: false, playerPair: false, bankerPair: false },
    },
    {
        id: 1190117,
        exchangeRateId: 1,
        player: { card1: { card: 5, type: 1 }, card2: { card: 8, type: 0 }, card3: null },
        banker: { card1: { card: 6, type: 1 }, card2: { card: 6, type: 3 }, card3: { card: 9, type: 3 } },
        result: { player: true, banker: false, big: true, small: false, tie: false, playerPair: false, bankerPair: true },
    },
];

const userBetData = (uid) => {
    return [
        {
            freeBet: false,
            roundId: 1190119,
            uid: uid,
            operatorId: "OW",
            currency: "$US",
            playerId: 1,
            name: "NormalUser",
            odds: gameConfig.odds,
            partnerId: "dummy-partner-id",
            rate: 1,
            siteId: "111",
            paid: true,
            betwin: 77,
            banker: 100,
            bankerPair: 0,
            big: 50,
            player: 0,
            playerPair: 0,
            small: 0,
            tie: 0,
        },
        {
            freeBet: false,
            roundId: 1190118,
            uid: uid,
            operatorId: "OW",
            currency: "$US",
            playerId: 1,
            name: "NormalUser",
            odds: gameConfig.odds,
            partnerId: "dummy-partner-id",
            rate: 1,
            siteId: "111",
            paid: true,
            betwin: 0,
            banker: 0,
            bankerPair: 0,
            big: 0,
            player: 100,
            playerPair: 0,
            small: 0,
            tie: 0,
        },
    ];
};

export { game, currencyData, socketOptions, gameConfig, rounds, userBetData };
