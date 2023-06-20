import { RoundResultConsumer as BaseRoundResultConsumer } from "sc-game-base/src/core/event-consumers";
import { BaccaratGame, resultHelper } from "../helpers";

export default class RoundResultConsumer extends BaseRoundResultConsumer {
    generateResult() {
        const { roundId } = this.gameData;
        const resultFromAdmin = this.gameData.settlementResultFromAdmin;

        if (roundId === resultFromAdmin.roundId) {
            const tmpCards = resultHelper.getCards();
            const { player, banker } = resultFromAdmin.result;
            const cardsFromAdmin = player.concat(banker);
            const newCards = tmpCards.filter((card) => !cardsFromAdmin.find((c) => c.card === card.card && c.type === card.type));
            const baccaratGame = new BaccaratGame([...newCards]);
            baccaratGame.setResult(resultFromAdmin.result);

            let action = "";

            do {
                action = baccaratGame.getAction();
                baccaratGame[action]();
            } while (action !== BaccaratGame.Actions.finalComparison);

            const cards = [];
            [1, 2].forEach((index) => {
                cards.push(baccaratGame.player[`card${index}`] || newCards.shift());
                cards.push(baccaratGame.banker[`card${index}`] || newCards.shift());
            });

            if (baccaratGame.player.card3) {
                cards.push(baccaratGame.player.card3);
                cards.push(baccaratGame.banker.card3 || newCards.shift());
            } else {
                if (baccaratGame.banker.card3) {
                    cards.push(baccaratGame.banker.card3);
                    cards.push(newCards.shift());
                } else {
                    cards.push(newCards.shift());
                    cards.push(newCards.shift());
                }
            }

            return { player: baccaratGame.player, banker: baccaratGame.banker, cards };
        } else {
            return this.definition.generateResult();
        }
    }
}
