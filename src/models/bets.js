import mongoose from "mongoose";

const bet = {
    uid: { type: String, required: true },
    name: { type: String, required: true },

    dragon: { type: Number, default: 0 },
    tiger: { type: Number, default: 0 },
    tie: { type: Number, default: 0 },
    blackDragon: { type: Number, default: 0 },
    redDragon: { type: Number, default: 0 },
    blackTiger: { type: Number, default: 0 },
    redTiger: { type: Number, default: 0 },

    betwin: { type: Number, default: 0 },
    time: { type: Date },
    odds: { type: Object },

    siteId: { type: String },
    freeBet: { type: Boolean, default: false },

    playerId: { type: Number },
    operatorId: { type: String },
    roundId: { type: Number, default: 0, required: true },
    paid: { type: Boolean, default: false },
};

const bets = mongoose.model(
    "dragontigerfight_bets",
    new mongoose.Schema({
        ...bet,
        currency: { type: String },
        rate: { type: Number, required: true },
    })
);
const tmpBets = mongoose.model("dragontigerfight_tmpbets", new mongoose.Schema(bet));

export { bets, tmpBets };
