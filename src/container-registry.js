import awilix from "awilix";
import { Table, Core } from "sc-game-base";
import { SettleGameRoundConsumer, PlaceBetConsumer } from "./consumers";
import { bets, rounds, tmpBets, results, betLogs } from "./models/index";
import { Bot } from "./crons/index";
import { RebetContainerRegistry } from "sc-rebet-mode";

const { asClass, asValue } = awilix;

export default class ContainerRegistry extends Table.TableContainerRegistry {
    register(appConfigs, definition, gameData) {
        super.register(appConfigs, definition, gameData);

        this.container.register(new RebetContainerRegistry().registerTableGame(Core.Routers.BaseSocketRouter));

        return this.container;
    }

    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(rounds),
            betsRepository: asValue(bets),
            tempBetsRepository: asValue(tmpBets),
            betLogsRepository: asValue(betLogs),
            resultsRepository: asValue(results),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            placeBetConsumer: asClass(PlaceBetConsumer).singleton(),
            settleGameRoundConsumer: asClass(SettleGameRoundConsumer).singleton().proxy(),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            bot: asClass(Bot).singleton(),
        });
    }
}
