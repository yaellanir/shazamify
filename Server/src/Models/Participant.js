import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  playerId: {
    type: int,
    required: true,
  },
  matchId: {
    type: int,
    required: true,
  },
  score: {
    type: int,
    required: true,
    trim: true,
  },
});

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;
