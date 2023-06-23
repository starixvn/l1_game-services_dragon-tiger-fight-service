import { stub, stubMongooseModelStupidly } from "jest-micro-auto-stub";
import mongoose from "mongoose";
import { Core, Table } from "sc-game-base";

import Bot from "../../../src/crons/bot";
import gameSettings from "../../../src/game-settings";
import appConfigs from "../../../src/app-configs";

describe("bot test", () => {
    const definition = new Table.TableGameDefinition(gameSettings);
    const gameData = new Table.TableGameData(0);
    gameData.gameConfigs = {
        choices_maxbet: {
            dragon: 10000,
            tiger: 10000,
            tie: 500,
            blackDragon: 500,
            redDragon: 200,
            blackTiger: 200,
            redTiger: 200,
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

    it("Inherit Table.Crons.TableGameBot", () => {
        expect(baccaratBot instanceof Table.Crons.TableGameBot).toBeTruthy();
    });

    describe("resetAllBets", () => {
        it("Returns default values", () => {
            baccaratBot.smallTickets = 10;
    
            // act
            baccaratBot.resetAllBets();
    
            // assert
            expect(baccaratBot.smallTickets).toEqual(0);
        });
    })

    describe("getBetChoice", () => {
        beforeEach(() => {
            baccaratBot.resetAllBotData();
        });

        it("should return dragon tiger options when they are not reached", () => {
            baccaratBot.allBets = {
                dragon: 400,
                tiger: 300,
                tie: 200,
                blackDragon: 200,
                redDragon: 100,
                blackTiger: 100,
                redTiger: 100,
            };

            const choice = baccaratBot.getBetChoice(bot);

            expect(baccaratBot.dragonTigerOpts).toContain(choice);
        });

        it("should return dragon tiger options as default", () => {
            baccaratBot.resetAllBets();

            const choice = baccaratBot.getBetChoice(bot);

            expect(baccaratBot.dragonTigerOpts).toContain(choice);
        });
    });

    describe("getMaxBet", () => {
        it("should return value between min and max bet config", () => {
            const choice = "dragon";
            const { bot_maxbet, minbet, choices_maxbet } = gameData.gameConfigs;
            const maxBet = Math.min(bot_maxbet, choices_maxbet[choice]);

            const actualResult = baccaratBot.getMaxBet(bot, choice);

            expect(actualResult).toBeWithin(minbet, maxBet);
        });
    });

    describe("updateBotInRoomData", () => {
        it("calls super.updateBotInRoomData", () => {
            // arrange
            spyOn(Table.Crons.TableGameBot.prototype, "updateBotInRoomData");
    
            // act
            baccaratBot.updateBotInRoomData(bot, "dragon", 10, 100);
    
            // assert
            expect(Table.Crons.TableGameBot.prototype.updateBotInRoomData).toHaveBeenCalled();
        });
    })    

    describe("resetAllBotData", () => {
        it("Calls specific functions", () => {
            // arrange
            spyOn(Table.Crons.TableGameBot.prototype, "resetAllBotData");
            spyOn(baccaratBot, "resetAllBets");
    
            // act
            baccaratBot.resetAllBotData();
    
            // assert
            expect(Table.Crons.TableGameBot.prototype.resetAllBotData).toHaveBeenCalled();
            expect(baccaratBot.resetAllBets).toHaveBeenCalled();
        });
    })
   
    describe("shouldAddBot", () => {
        it("should add bot when botsInRoom < maxNumberOfBots and random is inOutValues", () => {
            // arrange
            baccaratBot.botsInRoom = {"1": {}, "2": {}};
            baccaratBot.maxNumberOfBots = 3;
    
            // act
            const result = baccaratBot.shouldAddBot(3);
    
            // assert
            expect(result).toBe(true);
        })

        it("should NOT add bot when botsInRoom >= maxNumberOfBots", () => {
            // arrange
            baccaratBot.botsInRoom = {"1": {}, "2": {}};
            baccaratBot.maxNumberOfBots = 2;
    
            // act
            const result = baccaratBot.shouldAddBot(3);
    
            // assert
            expect(result).toBe(false);
        })

        it("should NOT add bot when random is not inOutValues", () => {
            // arrange
            baccaratBot.botsInRoom = {"1": {}, "2": {}};
            baccaratBot.maxNumberOfBots = 3;
    
            // act
            const result = baccaratBot.shouldAddBot(4);
    
            // assert
            expect(result).toBe(false);
        })
    })

    describe("getBotsToBet", () => {
        it("when botsToBet < max numberBotsToBet - return all botsToBet", () => {
             // arrange
             baccaratBot.botsInRoom = {"1": {totalBet: 10, remainTickets: 2}, "2": {totalBet: 11, remainTickets: 2}};
     
             // act
             const result = baccaratBot.getBotsToBet();
     
             // assert
             expect(result.length).toBe(2);
        })

        it("when botsToBet > max numberBotsToBet - return max numberBotsToBet", () => {
            // arrange
            baccaratBot.botsInRoom = {
                "1": {totalBet: 10, remainTickets: 2}, 
                "2": {totalBet: 11, remainTickets: 2},  
                "3": {totalBet: 11, remainTickets: 2},  
                "4": {totalBet: 11, remainTickets: 2},
                "5": {totalBet: 11, remainTickets: 2},
                "6": {totalBet: 11, remainTickets: 2},
                "7": {totalBet: 11, remainTickets: 2}
            };
            baccaratBot.gameData.remainingTime = 10;
    
            // act
            const result = baccaratBot.getBotsToBet();
    
            // assert
            expect(result.length).toBe(5);
       })
    })
});
