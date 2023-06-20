import { Core } from "sc-game-base";

export default class RoundQuery extends Core.QueryApis.RoundQuery {
    async getList(limit, projections) {
        const rounds = await this.roundsRepository
            .find({}, projections, { sort: { _id: -1 }, limit: limit })
            .lean()
            .exec();

        return rounds.map((round) => {
            const result = this.convertResult(round);
            const settlementResult = round.result;

            return {
                roundId: round.id,
                result,
                settlementResult,
            };
        });
    }

    async getOne(id, projections = { _id: false }) {
        const round = await this.roundsRepository.findOne({ id }, projections).lean().exec();

        round.settlementResult = round.result;
        round.result = this.convertResult(round);

        return round;
    }

    convertResult(round) {
        return {
            dragon: round.dragon,
            tiger: round.tiger,
        };
    }
}
