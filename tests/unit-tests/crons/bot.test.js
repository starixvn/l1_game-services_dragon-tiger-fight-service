import { stub, stubMongooseModelStupidly } from "jest-micro-auto-stub";
import mongoose from "mongoose";
import { Core, Table } from "sc-game-base";

import Bot from "../../../src/crons/bot";
import gameSettings from "../../../src/game-settings";
import appConfigs from "../../../src/app-configs";

xdescribe("bot test", () => {
    const definition = new Table.TableGameDefinition(gameSettings);
    const gameData = new Table.TableGameData(0);
    gameData.gameConfigs = {
        choices_maxbet: {
            player: 10000,
            banker: 10000,
            big: 500,
            small: 500,
            tie: 200,
            playerPair: 200,
            bankerPair: 200,
        },
        minbet: 1,
        bot_maxbet: 2000,
    };
    const publisher = stub(Core.BaseEventPublishers.BaseEventPublisher);

    /** @type {mongoose.Model}*/
    const tempBetsRepository = stubMongooseModelStupidly(mongoose.Model);

    /** @type {mongoose.Model}*/
    const userInfosRepository = stubMongooseModelStupidly(mongoose.Model);
    const baccaratBot = new Bot(definition, gameData, publisher, userInfosRepository, tempBetsRepository, appConfigs);
    const bot = {
        id: 1,
        name: "bot1",
        red: 1000,
        type: true,
        choices: [],
        remainTickets: 3,
        totalBet: 0,
    };

    it("_inherit Table.Crons.TableGameBot", () => {
        expect(baccaratBot instanceof Table.Crons.TableGameBot).toBeTruthy();
    });

    it("_resetAllBets_always_returns default values", () => {
        baccaratBot.smallTickets = 10;

        // act
        baccaratBot.resetAllBets();

        // assert
        expect(baccaratBot.smallTickets).toEqual(0);
    });

    describe("getBetChoice", () => {
        beforeEach(() => {
            baccaratBot.resetAllBotData();
        });

        it("should return player banker options when they are not reached", () => {
            baccaratBot.allBets = {
                player: 400,
                banker: 300,
                big: 200,
                small: 200,
                tie: 100,
                playerPair: 100,
                bankerPair: 100,
            };

            const choice = baccaratBot.getBetChoice(bot);

            expect(baccaratBot.playerBankerOpts).toContain(choice);
        });

        it("should return player banker options as default", () => {
            baccaratBot.resetAllBets();

            const choice = baccaratBot.getBetChoice(bot);

            expect(baccaratBot.playerBankerOpts).toContain(choice);
        });
    });

    describe("getMaxBet test", () => {
        it("should return value between min and max bet config", () => {
            const choice = "player";
            const { bot_maxbet, minbet, choices_maxbet } = gameData.gameConfigs;
            const maxBet = Math.min(bot_maxbet, choices_maxbet[choice]);

            const actualResult = baccaratBot.getMaxBet(bot, choice);

            expect(actualResult).toBeWithin(minbet, maxBet);
        });
    });

    it("updateBotInRoomData_always_calls super.updateBotInRoomData", () => {
        spyOn(Table.Crons.TableGameBot.prototype, "updateBotInRoomData");

        // act
        baccaratBot.updateBotInRoomData(bot, "player", 10, 100);

        // assert
        expect(Table.Crons.TableGameBot.prototype.updateBotInRoomData).toHaveBeenCalled();
    });

    it("_resetAllBotData_always_calls specific functions", () => {
        // arrange
        spyOn(Table.Crons.TableGameBot.prototype, "resetAllBotData");
        spyOn(baccaratBot, "resetAllBets");

        // act
        baccaratBot.resetAllBotData();

        // assert
        expect(Table.Crons.TableGameBot.prototype.resetAllBotData).toHaveBeenCalled();
        expect(baccaratBot.resetAllBets).toHaveBeenCalled();
    });
});
