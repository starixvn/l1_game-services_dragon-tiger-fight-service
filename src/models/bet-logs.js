import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },

    dragon: { type: Number, default: 0 },
    tiger: { type: Number, default: 0 },
    tie: { type: Number, default: 0 },
    blackDragon: { type: Number, default: 0 },
    redDragon: { type: Number, default: 0 },
    blackTiger: { type: Number, default: 0 },
    redTiger: { type: Number, default: 0 },

    rebet: { type: Boolean, default: false },
    clientSentTime: { type: Date },
    receivedTime: { type: Date },

    time: { type: Date },

    siteId: { type: String },

    currency: { type: String, required: true },
    rate: { type: Number, required: true },

    playerId: { type: Number },
    operatorId: { type: String, required: true },
    roundId: { type: Number, default: 0, required: true },
});

export default mongoose.model("dragontigerfight_bets", Schema);
