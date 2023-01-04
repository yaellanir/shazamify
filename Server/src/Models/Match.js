import mongoose from "mongoose";

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
  }
});

const Match = mongoose.model("Match", matchSchema);

export default Match;
