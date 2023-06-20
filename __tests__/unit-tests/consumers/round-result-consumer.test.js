import RoundResultConsumer from "../../../src/consumers/round-result-consumer";
import { RoundResultConsumer as BaseRoundResultConsumer } from "sc-game-base/src/core/event-consumers";
import BaccaratPlayer from "../../../src/helpers/baccarat-player";
import * as resultHelper from "../../../src/helpers/result-helper";

jest.mock("../../../src/helpers/result-helper");
describe("RoundResultConsumer test", () => {
    it("inherit BaseRoundResultConsumer", () => {
        // act
        const consumer = new RoundResultConsumer();

        // assert
        expect(consumer instanceof BaseRoundResultConsumer);
    });

    describe("generateResult", () => {
        describe("when set result from admin", () => {
            // arrange
            const gameData = {
                roundId: 2,
                settlementResultFromAdmin: {
                    roundId: 2,
                    result: {
                        player: [
                            { card: 11, type: 2 },
                            { card: 3, type: 0 },
                            { card: 6, type: 1 },
                        ],
                        banker: [
                            { card: 5, type: 1 },
                            { card: 9, type: 2 },
                            { card: 3, type: 2 },
                        ],
                    },
                },
            };
            const tempCards = [
                { card: 10, type: 2 },
                { card: 2, type: 2 },
                { card: 10, type: 0 },
                { card: 9, type: 1 },
                { card: 8, type: 2 },
                { card: 7, type: 3 },
            ];
            beforeEach(() => {
                resultHelper.getCards.mockReturnValue([...tempCards]);
            });
            it("should return result from admin", () => {
                // arrange
                const consumer = new RoundResultConsumer(gameData);
                const player = new BaccaratPlayer();
                player.setCards(gameData.settlementResultFromAdmin.result.player);
                const banker = new BaccaratPlayer();
                banker.setCards(gameData.settlementResultFromAdmin.result.banker);
                const cards = [
                    { card: 11, type: 2 },
                    { card: 5, type: 1 },
                    { card: 3, type: 0 },
                    { card: 9, type: 2 },
                    { card: 6, type: 1 },
                    { card: 3, type: 2 },
                ];

                // act
                const actual = consumer.generateResult();

                // assert
                expect(actual).toStrictEqual({ player, banker, cards });
            });

            it("should not call generateResult from definition", () => {
                // arrange
                const definition = { generateResult: jest.fn().mockReturnValue({ player: {}, banker: {} }) };
                const consumer = new RoundResultConsumer(gameData, definition);

                // act
                consumer.generateResult();

                // assert
                expect(definition.generateResult).not.toHaveBeenCalled();
            });

            describe("when result from admin with 4 cards", () => {
                beforeEach(() => {
                    gameData.settlementResultFromAdmin.result = {
                        player: [
                            { card: 9, type: 2 },
                            { card: 12, type: 3 },
                        ],
                        banker: [
                            { card: 9, type: 0 },
                            { card: 7, type: 1 },
                        ],
                    };
                });

                it("should return 6 cards", () => {
                    // arrange
                    const consumer = new RoundResultConsumer(gameData);

                    // act
                    const actual = consumer.generateResult();

                    // assert
                    expect(actual.cards).toBeArrayOfSize(6);
                });

                it("should return expected cards", () => {
                    // arrange
                    const consumer = new RoundResultConsumer(gameData);
                    const cards = [
                        { card: 9, type: 2 },
                        { card: 9, type: 0 },
                        { card: 12, type: 3 },
                        { card: 7, type: 1 },
                        { card: 10, type: 2 },
                        { card: 2, type: 2 },
                    ];

                    // act
                    const actual = consumer.generateResult();

                    // assert
                    expect(actual.cards).toStrictEqual(cards);
                });
            });

            describe("when result from admin with 5 cards", () => {
                describe("when player has 3 cards", () => {
                    it("should return expected cards", () => {
                        // arrange
                        gameData.settlementResultFromAdmin.result = {
                            player: [
                                { card: 9, type: 2 },
                                { card: 12, type: 3 },
                                { card: 10, type: 2 },
                            ],
                            banker: [
                                { card: 9, type: 0 },
                                { card: 7, type: 1 },
                            ],
                        };
                        const consumer = new RoundResultConsumer(gameData);
                        const cards = [
                            { card: 9, type: 2 },
                            { card: 9, type: 0 },
                            { card: 12, type: 3 },
                            { card: 7, type: 1 },
                            { card: 10, type: 2 },
                            { card: 2, type: 2 },
                        ];

                        // act
                        const actual = consumer.generateResult();

                        // assert
                        expect(actual.cards).toStrictEqual(cards);
                    });
                });

                describe("when banker has 3 cards", () => {
                    it("should return expected cards", () => {
                        // arrange
                        gameData.settlementResultFromAdmin.result = {
                            banker: [
                                { card: 9, type: 2 },
                                { card: 12, type: 3 },
                                { card: 10, type: 2 },
                            ],
                            player: [
                                { card: 9, type: 0 },
                                { card: 7, type: 1 },
                            ],
                        };
                        const consumer = new RoundResultConsumer(gameData);
                        const cards = [
                            { card: 9, type: 0 },
                            { card: 9, type: 2 },
                            { card: 7, type: 1 },
                            { card: 12, type: 3 },
                            { card: 10, type: 2 },
                            { card: 2, type: 2 },
                        ];

                        // act
                        const actual = consumer.generateResult();

                        // assert
                        expect(actual.cards).toStrictEqual(cards);
                    });
                });
            });

            describe("when result from admin with 6 cards", () => {
                it("should return expected cards", () => {
                    // arrange
                    gameData.settlementResultFromAdmin.result = {
                        player: [
                            { card: 9, type: 2 },
                            { card: 12, type: 3 },
                            { card: 10, type: 2 },
                        ],
                        banker: [
                            { card: 9, type: 0 },
                            { card: 7, type: 1 },
                            { card: 2, type: 2 },
                        ],
                    };
                    const consumer = new RoundResultConsumer(gameData);
                    const cards = [
                        { card: 9, type: 2 },
                        { card: 9, type: 0 },
                        { card: 12, type: 3 },
                        { card: 7, type: 1 },
                        { card: 10, type: 2 },
                        { card: 2, type: 2 },
                    ];

                    // act
                    const actual = consumer.generateResult();

                    // assert
                    expect(actual.cards).toStrictEqual(cards);
                });
            });
        });

        describe("when not set result", () => {
            it("should call generateResult from definition", () => {
                // arrange
                const definition = { generateResult: jest.fn().mockReturnValue({ player: {}, banker: {} }) };
                const gameData = { roundId: 2, settlementResultFromAdmin: {} };
                const consumer = new RoundResultConsumer(gameData, definition);

                // act
                const actual = consumer.generateResult();

                // assert
                expect(actual).toStrictEqual({ player: {}, banker: {} });
            });
        });
    });
});
