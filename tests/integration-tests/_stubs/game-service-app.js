import { Core, Table } from "sc-game-base";
import { initAPIStub, stubUserService } from "sc-game-service-integration-utils";
import ContainerRegistry from "../../../src/container-registry";

import gameSettings from "./game-settings";
import { generateResult, getSettlementResult, generateRawResultForHash } from "../../../src/helpers/result-helper";
import { buildConfigs } from "./helper";

export const run = async (processId, overrideConfigs) => {
    const appConfigs = Object.assign({}, buildConfigs(processId), overrideConfigs);      

    initAPIStub(appConfigs.apiSettings.apiUrl);
    stubUserService(appConfigs)
    const definition = new Table.TableGameDefinition(
        gameSettings,
        generateResult,
        getSettlementResult,
        generateRawResultForHash
    );
    const gameData = new Table.TableGameData(gameSettings.durations.wholeRound);

    const container = new ContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp(gameSettings.name, appConfigs);
    await app.run();
    await app.startGame(container);
};

const processId = process.argv[3];
const overrideConfigs = JSON.parse(process.argv[4]);
run(processId, overrideConfigs);
