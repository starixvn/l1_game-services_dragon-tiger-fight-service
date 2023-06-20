import BaccaratGame from "../../../src/helpers/baccarat-game";
import { getCards } from "../../../src/helpers/result-helper";

describe("Baccarat game instance", () => {
    const baccaratGame = new BaccaratGame(getCards());

    describe("checkBankerHasReceiveThirdCard", () => {
        const testCases = [
            { score: { banker: 2 }, thirdCardOfPlayer: null },
            { score: { banker: 3 }, thirdCardOfPlayer: 2 },
            { score: { banker: 5 }, thirdCardOfPlayer: 5 },
            { score: { banker: 6 }, thirdCardOfPlayer: 6 },
        ];

        it.each(testCases)("should return true", ({ score, thirdCardOfPlayer }) => {
            expect(baccaratGame.checkBankerHasReceiveThirdCard(score, thirdCardOfPlayer)).toBeTruthy();
        });
    });

    describe("get action", () => {
        it("should return receiveTwoCards when number cards of player and banker are less than 2", () => {
            expect(baccaratGame.getAction()).toEqual("receiveTwoCards");
        });

        describe("player and banker have 2 cards", () => {
            it("should return finalComparison when player score or banker score greater than or equal 8", () => {
                // arrange
                baccaratGame.player.card1 = { card: 3, type: 1 };
                baccaratGame.player.card2 = { card: 4, type: 1 };
                baccaratGame.banker.card1 = { card: 1, type: 1 };
                baccaratGame.banker.card2 = { card: 2, type: 1 };

                expect(baccaratGame.getAction()).toEqual("finalComparison");
            });

            it("should return playerReceiveThirdCard when player score less than or equal 5", () => {
                // arrange
                baccaratGame.player.card1 = { card: 2, type: 1 };
                baccaratGame.player.card2 = { card: 1, type: 1 };
                baccaratGame.banker.card1 = { card: 1, type: 1 };
                baccaratGame.banker.card2 = { card: 2, type: 1 };

                expect(baccaratGame.getAction()).toEqual("playerReceiveThirdCard");
            });

            it("should return bankerReceiveThirdCard when banker score less than or equal 5", () => {
                // arrange
                baccaratGame.player.card1 = { card: 4, type: 1 };
                baccaratGame.player.card2 = { card: 1, type: 1 };
                baccaratGame.banker.card1 = { card: 1, type: 1 };
                baccaratGame.banker.card2 = { card: 2, type: 1 };

                expect(baccaratGame.getAction()).toEqual("bankerReceiveThirdCard");
            });

            it("should return finalComparison when banker and player score greater than than 5", () => {
                // arrange
                baccaratGame.player.card1 = { card: 3, type: 1 };
                baccaratGame.player.card2 = { card: 2, type: 1 };
                baccaratGame.banker.card1 = { card: 3, type: 1 };
                baccaratGame.banker.card2 = { card: 2, type: 1 };

                expect(baccaratGame.getAction()).toEqual("finalComparison");
            });
        });

        describe("player has 3 cards", () => {
            it("should return bankerReceiveThirdCard when checkBankerHasReceiveThirdCard return true", () => {
                // assert
                spyOn(baccaratGame, "checkBankerHasReceiveThirdCard").and.callFake(() => true);

                baccaratGame.player.card1 = { card: 3, type: 1 };
                baccaratGame.player.card2 = { card: 4, type: 1 };
                baccaratGame.player.card3 = { card: 5, type: 1 };
                baccaratGame.banker.card1 = { card: 1, type: 1 };
                baccaratGame.banker.card2 = { card: 2, type: 1 };

                expect(baccaratGame.getAction()).toEqual("bankerReceiveThirdCard");
            });

            it("should return finalComparison when checkBankerHasReceiveThirdCard return false", () => {
                // assert
                spyOn(baccaratGame, "checkBankerHasReceiveThirdCard").and.callFake(() => false);

                baccaratGame.player.card1 = { card: 3, type: 1 };
                baccaratGame.player.card2 = { card: 4, type: 1 };
                baccaratGame.player.card3 = { card: 5, type: 1 };
                baccaratGame.banker.card1 = { card: 1, type: 1 };
                baccaratGame.banker.card2 = { card: 2, type: 1 };

                expect(baccaratGame.getAction()).toEqual("finalComparison");
            });
        });
    });
});
