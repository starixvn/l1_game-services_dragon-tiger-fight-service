import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./init-user-session";

export const getHistoryTest = () => {
    describe("when get history", () => {
        it("should return history", (done) => {
            // Arrange
            const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
            client.handleSignedInEvent(() => {
                client.sendInGameEvent();
            });
            const expectedData = [
                {
                    betwin: 0,
                    banker: 0,
                    bankerPair: 0,
                    big: 0,
                    player: 100,
                    playerPair: 0,
                    small: 0,
                    tie: 0,
                    freeBet: false,
                    phien: 1190118,
                    roundId: 1190118,
                    name: "NormalUser",
                    odds: {
                        player: 2,
                        banker: 1.96,
                        big: 1.54,
                        small: 2.4,
                        tie: 8,
                        playerPair: 11,
                        bankerPair: 11,
                    },
                    rate: 1,
                    betLogDetails: [],
                },
                {
                    banker: 100,
                    bankerPair: 0,
                    big: 50,
                    player: 0,
                    playerPair: 0,
                    small: 0,
                    tie: 0,
                    betwin: 77,
                    freeBet: false,
                    phien: 1190119,
                    roundId: 1190119,
                    name: "NormalUser",
                    odds: {
                        player: 2,
                        banker: 1.96,
                        big: 1.54,
                        small: 2.4,
                        tie: 8,
                        playerPair: 11,
                        bankerPair: 11,
                    },
                    rate: 1,
                    betLogDetails: [],
                },
            ];

            client.on(socketOptions.gameName, (inGameData) => {
                if (inGameData.remainingTime) {
                    // Act
                    client.sendGetHistoryEvent();

                    // Assert
                    client.on(socketOptions.gameName, (data) => {
                        if (data.history) {
                            const actualBetLogs = data.history.betLogs.map((betLog) => {
                                delete betLog.result;
                                delete betLog.settlementResult;
                                return betLog;
                            });
                            expect(actualBetLogs).toEqual(expectedData);
                            expect(data.history.total).toBeGreaterThan(0);
                            expect(data.history.page).toBe(1);
                            expect(data.history.pageSize).toBe(8);

                            client.close();
                            done();
                        }
                    });
                }
            });
        });
    });
};
