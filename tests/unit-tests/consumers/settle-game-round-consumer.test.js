import { stub } from "jest-micro-auto-stub";
import { Core, Table } from "sc-game-base";

import SettleGameRoundConsumer from "../../../src/consumers/settle-game-round-consumer";
import { card } from "../../../src/helpers/;
import { getCards } from "../../../src/helpers/result-helper";

jest.mock("../../../src/helpers/result-helper.js");
describe("SettleGameRoundConsumer tests", () => {
    const definition = new Table.TableGameDefinition({ id: 1, name: "game name" });
    definition.choices = ["player", "banker", "big", "small", "tie", "playerPair", "bankerPair"];
    definition.generateResult = jest.fn();
    definition.settle = jest.fn();
    const gameData = new Table.TableGameData(0);
    const roundResultPublisher = stub(Core.BaseEventPublishers.RoundResultPublisher);
    const userBetResultPublisher = stub(Core.BaseEventPublishers.UserBetResultPublisher);
    const endGame = jest.fn();
    getCards.mockReturnValueOnce(card);

    /** @type {mongoose.Model}*/
    const roundsRepository = { find: () => {}, create: () => {} };
    /** @type {mongoose.Model}*/
    const betsRepository = { find: () => {} };

    /** @type {mongoose.Model}*/
    const tempBetsRepository = { find: () => {} };

    const consumer = new SettleGameRoundConsumer({
        definition,
        gameData,
        roundResultPublisher,
        userBetResultPublisher,
        endGame,
        roundsRepository,
        betsRepository,
        tempBetsRepository,
    });

    it("_inherit Table.EventConsumers.TableSettleGameRoundConsumer", () => {
        expect(consumer instanceof Table.EventConsumers.TableSettleGameRoundConsumer).toBeTruthy();
    });

    describe("_settleRound", () => {
        beforeEach(() => {
            spyOn(consumer, "settleBets");
        });
        it("_create round successful_calls settleBets", () => {
            // arrange
            roundsRepository.create = jest.fn(() => {
                return { id: 1, time: Date.now() };
            });
            const result = { player: {}, banker: {} };
            spyOn(consumer, "generateResult").and.callFake(() => result);

            // act
            consumer.settleRound();

            // assert
            expect(roundsRepository.create).toHaveBeenCalled();
        });

        it("_create round failed_doesn't call settleBets", () => {
            // arrange
            roundsRepository.create = jest.fn(() => {
                return null;
            });
            const result = { player: {}, banker: {} };
            spyOn(consumer, "generateResult").and.callFake(() => result);

            // act
            consumer.settleRound();

            // assert
            expect(consumer.settleBets).not.toHaveBeenCalled();
        });
    });

    describe("_calculateBetResult", () => {
        it("_always_returns correct result", () => {
            const settlementResult = {
                player: false,
                banker: false,
                big: false,
                small: false,
                tie: true,
                playerPair: false,
                bankerPair: false,
                natural: false,
            };
            const result = consumer.calculateBetResult(settlementResult, { tie: 10 }, { player: 2, banker: 2, tie: 10 });

            expect(result.netWin).toEqual(90);
            expect(result.winningByChoices.tie).toEqual(100);
        });
    });
});
