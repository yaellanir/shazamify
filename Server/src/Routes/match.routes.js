import { Router } from "express";
import Match from "../Models/Match.js";
// import auth from "../Middleware/auth.js";
const matchesRouter = new Router();

matchesRouter.post("/matches", async (req, res) => {
  const match = new Match(req.body);

  try {
    await match.save();
    res.status(201).send(match);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

matchesRouter.get("/matches/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const match = await Match.findById(_id);

    if (!match) {
      return res.status(404).send("match not found");
    }

    res.status(200).send(match);
  } catch (e) {
    res.status(500).send("something went wrong");
  }
});

matchesRouter.get("/matches", async (req, res) => {
  try {
    const results = await Match.find({});
    console.log(results);
    res.status(200).send(results);
  } catch (error) {
    res.status(400).send("not able to get matches");
  }
});

matchesRouter.patch("/matches/me", async (req, res) => {
  const { matchId, currentRound, lastPlayed, roundSummary, wins } = req.body;
  console.log({ wins });
  try {
    const match = await Match.findById({ _id: matchId });
    match.rounds.push(roundSummary);
    match.currentRound = currentRound;
    match.lastPlayed = lastPlayed;
    if (wins) {
      match.wins = wins;
    }
    match.save();
    console.log(match);
    res.status(200).send(match);
  } catch (e) {
    res.status(400).send(e);
  }
});

matchesRouter.delete("/matches/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const result = await Match.findByIdAndDelete({ _id });
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

matchesRouter.delete("/matches/", async (req, res) => {
  try {
    console.log("delete all");
    const result = await Match.deleteMany();
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default matchesRouter;
