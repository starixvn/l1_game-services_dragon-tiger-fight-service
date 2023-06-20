import { stubMongooseModelStupidly } from "jest-micro-auto-stub";
import mongoose from "mongoose";

import RoundQuery from "../../../src/query-apis/round-query";

describe("RoundQuery test", () => {
    /** @type {mongoose.Model}*/
    const roundsRepository = stubMongooseModelStupidly(mongoose.Model);

    const roundQuery = new RoundQuery(roundsRepository);
    it("getList_always_returns correct data", async () => {
        roundsRepository
            .find()
            .lean()
            .exec.mockReturnValue([
                {
                    id: 1,
                    player: { card1: { card: 1, type: 0 }, card2: { card: 5, type: 1 } },
                    banker: { card1: { card: 1, type: 0 }, card2: { card: 3, type: 1 } },
                    result: {
                        player: true,
                        banker: false,
                        big: false,
                        small: true,
                        playerPair: false,
                        bankerPair: false,
                        natural: false,
                    },
                },
            ]);
        const expectedResult = [
            {
                roundId: 1,
                result: {
                    player: { card1: { card: 1, type: 0 }, card2: { card: 5, type: 1 } },
                    banker: { card1: { card: 1, type: 0 }, card2: { card: 3, type: 1 } },
                },
                settlementResult: {
                    player: true,
                    banker: false,
                    big: false,
                    small: true,
                    playerPair: false,
                    bankerPair: false,
                    natural: false,
                },
            },
        ];

        // act
        const actualResult = await roundQuery.getList(8, {});

        //assert
        expect(actualResult).toEqual(expectedResult);
    });

    it("getOne_always_returns correct data", async () => {
        roundsRepository
            .findOne()
            .lean()
            .exec.mockReturnValue({
                id: 1,
                player: { card1: { card: 1, type: 0 }, card2: { card: 5, type: 1 } },
                banker: { card1: { card: 1, type: 0 }, card2: { card: 3, type: 1 } },
                result: {
                    player: true,
                    banker: false,
                    big: false,
                    small: true,
                    playerPair: false,
                    bankerPair: false,
                    natural: false,
                },
            });
        const expectedResult = {
            id: 1,
            player: { card1: { card: 1, type: 0 }, card2: { card: 5, type: 1 } },
            banker: { card1: { card: 1, type: 0 }, card2: { card: 3, type: 1 } },
            result: {
                player: { card1: { card: 1, type: 0 }, card2: { card: 5, type: 1 } },
                banker: { card1: { card: 1, type: 0 }, card2: { card: 3, type: 1 } },
            },
            settlementResult: {
                player: true,
                banker: false,
                big: false,
                small: true,
                playerPair: false,
                bankerPair: false,
                natural: false,
            },
        };

        // act
        const actualResult = await roundQuery.getOne(8, {});

        //assert
        expect(actualResult).toEqual(expectedResult);
    });
});
