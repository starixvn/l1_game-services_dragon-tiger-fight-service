import { helpers } from "sc-common";
import { Table } from "sc-game-base";

export default class Bot extends Table.Crons.TableGameBot {
    constructor(definition, gameData, publisher, userInfosRepository, tempBetsRepository, appConfigs) {
        super(definition, gameData, publisher, userInfosRepository, tempBetsRepository);

        this.appConfigs = appConfigs;
        this.betChoiceRatio = { PlayerBanker: 95, PlayerBankerPair: 1, Tie: 1, BigSmall: 3 };

        this.playerBankerOpts = ["player", "banker"];
        this.playerBankerPairOpts = ["playerPair", "bankerPair"];
        this.tieOpts = ["tie"];
        this.bigSmallOpts = ["big", "small"];
    }

    resetAllBotData() {
        super.resetAllBotData();
        this.resetAllBets();
    }

    resetAllBets() {
        this.allBets = {
            player: 0,
            banker: 0,
            big: 0,
            small: 0,
            tie: 0,
            playerPair: 0,
            bankerPair: 0,
        };

        this.smallTickets = 0;
    }

    getBetChoice(bot) {
        const totalBotBet = this.getAllBetAmount();

        const betChoiceRatios = [
            {
                group: this.playerBankerOpts,
                underBetRatio:
                    (this.getTotalAmountOnChoiceGroup(this.playerBankerOpts) * 100) / totalBotBet < this.betChoiceRatio.PlayerBanker,
            },
            {
                group: this.playerBankerPairOpts,
                underBetRatio:
                    (this.getTotalAmountOnChoiceGroup(this.playerBankerPairOpts) * 100) / totalBotBet <
                    this.betChoiceRatio.PlayerBankerPair,
            },
            {
                group: this.tieOpts,
                underBetRatio: (this.getTotalAmountOnChoiceGroup(this.tieOpts) * 100) / totalBotBet < this.betChoiceRatio.Tie,
            },
            {
                group: this.bigSmallOpts,
                underBetRatio: (this.getTotalAmountOnChoiceGroup(this.bigSmallOpts) * 100) / totalBotBet < this.betChoiceRatio.BigSmall,
            },
        ];

        const underRatioGroups = helpers.arrayHelper.shuffle(betChoiceRatios.filter((data) => data.underBetRatio));

        const choice =
            underRatioGroups.length > 0
                ? this.getRandomChoiceFromGroup(underRatioGroups[0].group)
                : this.getRandomChoiceFromGroup(this.playerBankerOpts);

        const previousUniqueChoices = bot.choices.filter((betChoice) => this.playerBankerOpts.includes(betChoice));

        return previousUniqueChoices.length > 0 ? previousUniqueChoices[0] : choice;
    }

    getMaxBet(bot, choice) {
        const gameConfigs = this.gameData.gameConfigs;
        const minBet = this.getMinBet();
        const maxBetPerChoice = gameConfigs.choices_maxbet[choice];
        const botMaxBet = gameConfigs.bot_maxbet;
        const maxBet = Math.min(maxBetPerChoice, botMaxBet);

        if (this.playerBankerOpts.includes(choice) || this.bigSmallOpts.includes(choice)) {
            const isSmallTicket = this.totalTickets === 0 ? true : (this.smallTickets * 100) / this.totalTickets < this.smallTicketRatio;
            const maxBetOfSmallTicket = Math.min(minBet * 50, botMaxBet * 0.3);
            return isSmallTicket ? maxBetOfSmallTicket : maxBet;
        }

        return Math.min(minBet * 10, maxBet * 0.2);
    }

    getRandomChoiceFromGroup(group) {
        return this.chance.pickone(group);
    }

    getTotalAmountOnChoiceGroup(choices) {
        let total = 0;
        choices.forEach((choice) => (total += this.allBets[choice]));

        return total;
    }

    getTotalAmountOfBotOnChoiceGroup(bot, choices) {
        let total = 0;
        choices.forEach((choice) => (total += bot.betOnChoices[choice]));

        return total;
    }

    getAllBetAmount() {
        let total = 0;
        this.definition.choices.forEach((choice) => (total += this.allBets[choice]));

        return total;
    }

    isSmallTicket(amount) {
        return amount <= this.getMinBet() * 50;
    }

    updateBotInRoomData(bot, choice, amount, balance) {
        super.updateBotInRoomData(bot, choice, amount, balance);

        this.allBets[choice] = this.allBets[choice] ? this.allBets[choice] + amount : amount;
        this.smallTickets += this.isSmallTicket(amount) ? 1 : 0;
    }

    convertAmountToChip(amount) {
        const chipList = this.appConfigs.chips.filter((chip) => amount / chip >= 1);

        return chipList.length > 0 ? chipList[0] : this.getMinBet();
    }
}
