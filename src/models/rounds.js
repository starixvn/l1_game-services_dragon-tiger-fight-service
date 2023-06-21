import mongoose from "mongoose";

const modelName = "dragontigerfight_rounds";

const card = {
    card: Number,
    type: Number,
};

const resultSchema = new mongoose.Schema(
    {
        dragon: { type: card },
        tiger: { type: card },
    },
    { _id: false }
);


const settlementResultSchema = new mongoose.Schema(
    {
        dragon: { type: Boolean, default: false },
        tiger: { type: Boolean, default: false },
        tie: { type: Boolean, default: false },
        blackDragon: { type: Boolean, default: false },
        redDragon: { type: Boolean, default: false },
        blackTiger: { type: Boolean, default: false },
        redTiger: { type: Boolean, default: false },        
    },
    { _id: false }
);

const Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    result: resultSchema,
    settlementResult: settlementResultSchema,
    time: { type: Date, default: new Date() },
    exchangeRateId: { type: Number, required: true },
});

export default mongoose.model(modelName, Schema);
