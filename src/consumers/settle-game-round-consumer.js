import { Table } from "sc-game-base";
import constants from "../constants";

export default class SettleGameRoundConsumer extends Table.EventConsumers.TableSettleGameRoundConsumer {
    calculateBetResult(settlementResult, bet, odds) {
        const { choices } = this.definition;

        const betResult = Object.entries(settlementResult)
            .filter(([choice, win]) => choices.includes(choice))
            .reduce(
                (result, [choice, win]) => {
                    if (choice === constants.choiceNames.tie && win) {
                        const dragonBet = bet[constants.choiceNames.dragon] ?? 0;
                        const tigerBet = bet[constants.choiceNames.tiger] ?? 0;
                        const refund = (dragonBet + tigerBet)/2;

                        result.totalWin += refund;
                    }

                    const betAmount = bet[choice] ?? 0;
                    const originalOdds = odds[choice] || 1;
                    const winAmount = win ? betAmount * originalOdds : 0;

                    result.totalBetAmount += betAmount;
                    result.totalWin += winAmount;
                    result.winningByChoices[choice] = winAmount;

                    if (winAmount > 0) {
                        result.netWin += winAmount - betAmount;
                    } else {
                        result.totalLost += betAmount;
                    }

                    return result;
                },
                {
                    totalBetAmount: 0,
                    totalWin: 0,
                    netWin: 0,
                    totalLost: 0,
                    winningByChoices: {},
                }
            );

        betResult.totalWin = parseFloat(betResult.totalWin.toFixed(4));
        betResult.netWin = parseFloat(betResult.netWin.toFixed(4));

        return betResult;
    }
}
