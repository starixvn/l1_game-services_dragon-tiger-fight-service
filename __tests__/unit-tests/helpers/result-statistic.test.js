import { generateResult, getSettlementResult } from "../../../src/helpers/result-helper";

describe("result statistic: 100,000 times", () => {
    // arrange
    const total = 100_000;
    for (let index = 0; index < 3; index++) {
        it(`should generate results statistically correct with mode ${index + 1}`, () => {
            // arrange
            const statisticResult = {
                player: 0,
                banker: 0,
                tie: 0,
                big: 0,
                small: 0,
            };

            // act
            for (let i = 0; i < total; i++) {
                const settlementResult = getSettlementResult(generateResult(index + 1));
                statisticResult.player += +settlementResult.player;
                statisticResult.banker += +settlementResult.banker;
                statisticResult.tie += +settlementResult.tie;
                statisticResult.big += +settlementResult.big;
                statisticResult.small += +settlementResult.small;
            }

            // assert
            const resultPercentage = Object.keys(statisticResult).reduce((percentage, key) => {
                percentage[key] = +parseFloat((statisticResult[key] / total) * 100).toFixed(2);

                return percentage;
            }, {});
            console.log(
                `Mode:${index + 1}, countResult: ${JSON.stringify(statisticResult)}, percentageResult: ${JSON.stringify(resultPercentage)}`
            );
            expect(resultPercentage.player).toBeGreaterThanOrEqual(44);
            expect(resultPercentage.banker).toBeGreaterThanOrEqual(44);
            expect(resultPercentage.tie).toBeLessThanOrEqual(10);
        });
    }
});
