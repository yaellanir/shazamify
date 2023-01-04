import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  creator: {
    type: Number,
    required: true,
    default: 0,
  },
  opponent: {
    type: Number,
    required: true,
    default: 0,
  },
});

const matchSchema = new mongoose.Schema({
  gameType: {
    type: String,
    required: true,
    trim: true,
  },
  participants: {
    type: Array,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  winner: {
    type: String,
  },
  rounds: {
    type: Array,
    default: [],
  },
  currentRound: {
    type: Number,
    default: 0,
  },
  lastPlayed: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  wins: {
    type: ScoreSchema,
    default: {
      creator: 0,
      opponent: 0,
    },
  },
});

const Match = mongoose.model("Match", matchSchema);

export default Match;
