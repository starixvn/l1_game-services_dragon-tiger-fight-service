import BaccaratPlayer from "../../../src/helpers/baccarat-player";

describe("Baccarat player instance", () => {
    const baccaratPlayer = new BaccaratPlayer();

    describe("get cards", () => {
        it("when has third card", () => {
            // arrange
            baccaratPlayer.card1 = { card: 1, type: 0 };
            baccaratPlayer.card2 = { card: 2, type: 1 };
            baccaratPlayer.card3 = { card: 3, type: 2 };
            const expectedResult = [
                { card: 1, type: 0 },
                { card: 2, type: 1 },
                { card: 3, type: 2 },
            ];

            // act & assert
            expect(baccaratPlayer.getCards()).toEqual(expectedResult);
        });

        it("when hasn't third card", () => {
            // arrange
            baccaratPlayer.card1 = { card: 1, type: 0 };
            baccaratPlayer.card2 = { card: 2, type: 1 };
            baccaratPlayer.card3 = null;
            const expectedResult = [
                { card: 1, type: 0 },
                { card: 2, type: 1 },
            ];

            // act & assert
            expect(baccaratPlayer.getCards()).toEqual(expectedResult);
        });
    });

    describe("get third card", () => {
        it("should return correct value", () => {
            baccaratPlayer.card3 = { card: 1, type: 0 };

            expect(baccaratPlayer.getThirdCardValue()).toEqual(2);
        });
    });
});
