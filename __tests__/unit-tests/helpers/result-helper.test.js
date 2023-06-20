import BaccaratPlayer from "../../../src/helpers/baccarat-player";
import { generateResult, getSettlementResult, generateRawResultForHash, getCards } from "../../../src/helpers/result-helper";
import * as BaseCard from "../../../src/helpers/card";
describe("result-helper test", () => {
    describe("getCards", () => {
        it("should return array with 52 cards", () => {
            // act
            const actual = getCards();

            // assert
            expect(actual).toBeArrayOfSize(52);
        });
        it("should return array having card between 0 and 12", () => {
            // act
            const actual = getCards();

            // assert
            expect(actual).toSatisfyAll((result) => result.card >= 0 && result.card <= 12);
        });
        it("should return array having type between 0 and 3", () => {
            // act
            const actual = getCards();

            // assert
            expect(actual).toSatisfyAll((result) => result.type >= 0 && result.type <= 3);
        });
        it("should return shuffled cards", () => {
            // act
            const actual = getCards();

            // assert
            expect(actual).not.toStrictEqual(BaseCard.card);
        });
    });

    describe("generateResult test", () => {
        it("should return player having expected key", () => {
            // act
            const actual = generateResult();

            // assert
            expect(actual.player instanceof BaccaratPlayer);
            expect(actual.player).toContainAllKeys(["card1", "card2", "card3"]);
        });

        it("should return banker having expected key", () => {
            // act
            const actual = generateResult();

            // assert
            expect(actual.banker instanceof BaccaratPlayer);
            expect(actual.banker).toContainAllKeys(["card1", "card2", "card3"]);
        });

        it("should return 6 cards", () => {
            // act
            const actual = generateResult();

            // assert
            expect(actual.cards).toBeArrayOfSize(6);
        });

        it("should return cards having value card between 0 and 12", () => {
            // act
            const actual = generateResult();

            // assert
            expect(actual.cards).toSatisfyAll((result) => result.card >= 0 && result.card <= 12);
        });

        it("should return cards having type between 0 and 3", () => {
            // act
            const actual = generateResult();

            // assert
            expect(actual.cards).toSatisfyAll((result) => result.type >= 0 && result.type <= 3);
        });

        it("should return expected cards", () => {
            // act
            const actual = generateResult();

            // assert
            expect(actual.cards[0]).toStrictEqual(actual.player.card1);
            expect(actual.cards[2]).toStrictEqual(actual.player.card2);
            expect(actual.cards[1]).toStrictEqual(actual.banker.card1);
            expect(actual.cards[3]).toStrictEqual(actual.banker.card2);
        });
    });

    describe("Get the settlement result", () => {
        it("should player win when total score of player greater than banker", () => {
            // arrange
            const roundResult = {
                player: { card1: { card: 10, type: 2 }, card2: { card: 7, type: 0 } },
                banker: { card1: { card: 2, type: 2 }, card2: { card: 3, type: 0 } },
            };

            // act
            const expectedResult = getSettlementResult(roundResult);

            // assert
            expect(expectedResult.player).toBeTruthy();
        });

        it("should banker win when total score of banker greater than player", () => {
            // arrange
            const roundResult = {
                banker: { card1: { card: 10, type: 2 }, card2: { card: 7, type: 0 } },
                player: { card1: { card: 2, type: 2 }, card2: { card: 3, type: 0 } },
            };

            // act
            const expectedResult = getSettlementResult(roundResult);

            // assert
            expect(expectedResult.banker).toBeTruthy();
        });

        it("should tie when total score of banker equal player", () => {
            // arrange
            const roundResult = {
                banker: { card1: { card: 10, type: 2 }, card2: { card: 7, type: 0 } },
                player: { card1: { card: 10, type: 2 }, card2: { card: 7, type: 0 } },
            };

            // act
            const expectedResult = getSettlementResult(roundResult);

            // assert
            expect(expectedResult.tie).toBeTruthy();
        });

        it("should big win when total cards greater than 4", () => {
            // arrange
            const roundResult = {
                banker: { card1: { card: 10, type: 2 }, card2: { card: 7, type: 0 }, card3: { card: 7, type: 0 } },
                player: { card1: { card: 10, type: 2 }, card2: { card: 7, type: 0 } },
            };

            // act
            const expectedResult = getSettlementResult(roundResult);

            // assert
            expect(expectedResult.big).toBeTruthy();
        });

        it("should small win when total cards equal 4", () => {
            // arrange
            const roundResult = {
                banker: { card1: { card: 10, type: 2 }, card2: { card: 7, type: 0 } },
                player: { card1: { card: 10, type: 2 }, card2: { card: 7, type: 0 } },
            };

            // act
            const expectedResult = getSettlementResult(roundResult);

            // assert
            expect(expectedResult.small).toBeTruthy();
        });

        it("player pair", () => {
            // arrange
            const roundResult = {
                player: { card1: { card: 10, type: 2 }, card2: { card: 10, type: 0 } },
                banker: { card1: { card: 10, type: 2 }, card2: { card: 7, type: 0 } },
            };

            // act
            const expectedResult = getSettlementResult(roundResult);

            // assert
            expect(expectedResult.playerPair).toBeTruthy();
        });

        it("banker pair", () => {
            // arrange
            const roundResult = {
                player: { card1: { card: 10, type: 2 }, card2: { card: 3, type: 0 } },
                banker: { card1: { card: 7, type: 2 }, card2: { card: 7, type: 0 } },
            };

            // act
            const expectedResult = getSettlementResult(roundResult);

            // assert
            expect(expectedResult.bankerPair).toBeTruthy();
        });
    });

    describe("generateRawResultForHash test", () => {
        it("should return expected", () => {
            // arrange
            const cards = [
                { card: 0, type: 0 },
                { card: 10, type: 1 },
                { card: 11, type: 2 },
                { card: 12, type: 3 },
                { card: 7, type: 1 },
                { card: 9, type: 2 },
            ];
            const expected = "{A♥ J♦ Q♣ K♠ 8♦ 10♣}";

            // act
            const actual = generateRawResultForHash({ cards });

            // assert
            expect(actual).toBe(expected);
        });
    });
});
