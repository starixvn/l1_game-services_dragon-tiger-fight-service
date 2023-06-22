import { generateResult, getSettlementResult, generateRawResultForHash } from "../../../src/helpers/result-helper";
describe("result-helper test", () => {   
    describe("generateRawResultForHash", () => {
        it("should return as expected", () => {
            // arrange
            const roundResult = {
                dragon: { card: 0, type: 0 },
                tiger: { card: 10, type: 1 },                
            };
            const expected = "{A♥ J♦}";

            // act
            const actual = generateRawResultForHash(roundResult);

            // assert
            expect(actual).toBe(expected);
        });
    });
});
