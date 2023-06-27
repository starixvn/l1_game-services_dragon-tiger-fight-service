export default {
    id: 67,
    name: "DragonTigerFight",
    durations: {
        wholeRound: 40,
        placingBets: 25,
        lockingBet: 5,
        dealCards: 2,
    },
    choices: ["dragon", "tiger", "tie", "blackDragon", "redDragon", "blackTiger", "redTiger"],
    choicesMapper: { dragon: 1, tiger: 2, tie: 3, blackDragon: 4, redDragon: 5, blackTiger: 6, redTiger: 7 },
    hedgeBetGroups: [
        ["dragon", "tiger"]
    ],
    numberOfRoundHistory: 102,
};
