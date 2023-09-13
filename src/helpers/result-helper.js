import { cards, ranks, suits } from "./card";
import { Chance } from "chance";
import _ from "lodash";
import { shuffle as d3Shuffle } from "d3-array";
import { Random as RandomJS, MersenneTwister19937 } from "random-js";

const shuffleCards = (deskOfCards) => {
    const chance = new Chance();

    for (let i = deskOfCards.length - 1; i >= 0; i -= 2) {
        const randomCardIndex = Math.floor(chance.floating({ min: 0, max: 1 }) * (i + 1));
        const term = deskOfCards[i];

        deskOfCards[i] = deskOfCards[randomCardIndex];
        deskOfCards[randomCardIndex] = term;
    }
};

const random1 = (arr) => {
    const deskOfCards = [...arr];

    shuffleCards(deskOfCards);
    shuffleCards(deskOfCards);
    shuffleCards(deskOfCards);

    return deskOfCards.slice(0, 2);
};

const random2 = (arr) => {
    const chance = new Chance();
    return chance.shuffle(chance.shuffle(chance.shuffle(arr)));
};

const random3 = (arr) => {
    return d3Shuffle(d3Shuffle(d3Shuffle(arr)));
};

const random4 = (arr) => {
    let result = arr;
    const r = new RandomJS(MersenneTwister19937.autoSeed());

    for (let i = 0; i < 3; i++) {
        result = r.shuffle(arr);
    }

    return result;
};

const random5 = (arr) => {
    return _.shuffle(_.shuffle(_.shuffle(arr)));
};

const randomModes = {
    1: [random1],
    2: [random2, random3],
    3: [random4, random5],
};

const settlementRuleEntries = Object.entries({
    dragon: (roundResult) => roundResult.dragon.rank > roundResult.tiger.rank,
    tiger: (roundResult) => roundResult.tiger.rank > roundResult.dragon.rank,
    tie: (roundResult) => roundResult.tiger.rank === roundResult.dragon.rank,
    blackDragon: (roundResult) => ["♣", "♠"].includes(suits[roundResult.dragon.suit]),
    redDragon: (roundResult) => ["♥", "♦"].includes(suits[roundResult.dragon.suit]),
    blackTiger: (roundResult) => ["♣", "♠"].includes(suits[roundResult.tiger.suit]),
    redTiger: (roundResult) => ["♥", "♦"].includes(suits[roundResult.tiger.suit]),
});

export const generateResult = (randomMode) => {
    const randomShuffles = randomModes[randomMode] || randomModes[1];
    const chance = new Chance();
    const shuffle = chance.pickone(randomShuffles);
    const deck = shuffle(cards);

    return { dragon: deck[0], tiger: deck[1] };
};

export const getSettlementResult = (roundResult) => {
    return settlementRuleEntries.reduce((result, [choice, rule]) => {
        result[choice] = rule(roundResult);

        return result;
    }, {});
};

export const generateRawResultForHash = ({dragon, tiger}) => {
    return `{${ranks[dragon.rank]}${suits[dragon.suit]} ${ranks[tiger.rank]}${suits[tiger.suit]}}`;
};
