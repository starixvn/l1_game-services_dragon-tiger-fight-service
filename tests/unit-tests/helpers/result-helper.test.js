import BaccaratPlayer from "../../../src/helpers/baccarat-player";
import { generateResult, getSettlementResult, generateRawResultForHash, getCards } from "../../../src/helpers/result-helper";
import {cards, cardNames, cardTypes} from "../../../src/helpers/card";
describe("result-helper test", () => {   

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
