import mongoose from "mongoose";

const bet = {
    uid: { type: String, required: true },
    name: { type: String, required: true },

    player: { type: Number, default: 0 },
    banker: { type: Number, default: 0 },
    big: { type: Number, default: 0 },
    small: { type: Number, default: 0 },
    tie: { type: Number, default: 0 },
    playerPair: { type: Number, default: 0 },
    bankerPair: { type: Number, default: 0 },

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
    "baccarat_cuoc",
    new mongoose.Schema({
        ...bet,
        currency: { type: String },
        rate: { type: Number, required: true },
    })
);
const tmpBets = mongoose.model("baccarat_tmpcuoc", new mongoose.Schema(bet));

export { bets, tmpBets };
