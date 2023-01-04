import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyTurnMatchSum from "../../Containers/MyTurnMatchSum/MyTurnMatchSum";
import TheirTurnMatchSum from "../../Containers/TheirTurnMatchSum/TheirTurnMatchSum";
import categories from "../../constants";
import "./Main.css";

function Main({ user }) {
  const [clicked, setClicked] = useState(false);
  const [friendEmailInput, setFriendEmailInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("default");
  // const [base64, setBase64] = useState(null);
  const [matches, setMatches] = useState(null);

  const API_URL = process.env.API_URL || "http://localhost:3001";
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    async function getMatches() {
      try {
        const { data } = await axios.get(`${API_URL}/matches`);

        const myMatches = data.filter((match) =>
          match.participants.includes(user.id)
        );
        console.log(myMatches);
        setMatches(myMatches);
      } catch (error) {
        console.log(error);
      }
    }
    getMatches();
    // setBase64(user.avatar);
  }, [user]);

  function handleFriendGameClick() {
    setClicked(true);
  }

  function handleFriendInput(event) {
    const opponentEmail = event.target.value;
    console.log();
    setFriendEmailInput(opponentEmail);
    console.log(opponentEmail);
  }

  function fireSearch(event) {
    if (event.keyCode === 13) {
      createNewGame();
    }
  }

  async function createNewGame() {
    try {
      const opponent = await axios.post(`${API_URL}/users/find/email`, {
        email: friendEmailInput,
      });
      console.log(opponent);
      if (friendEmailInput === opponent.data.email) {
        const newMatch = await axios.post(`${API_URL}/matches`, {
          gameType: "one on one",
          participants: [opponent.data._id, user.id],
          currentRound: 1,
          lastPlayed: user.id,
          createdBy: user.id,
        });
        console.log(newMatch);
        navigate(
          `/matches/friend-mode/${newMatch.data._id}/${selectedCategory}`
        );
      } else {
        console.log("error - no email found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function startGameWithRandomUser() {
    try {
      const allUsers = await axios.get(`${API_URL}/users`);
      const allUsersMinusMe = allUsers.data.filter(
        (opponent) => opponent._id !== user.id
      );
      const randomUser =
        allUsersMinusMe[Math.floor(Math.random() * allUsersMinusMe.length)];

      const newRandomMatch = await axios.post(`${API_URL}/matches`, {
        gameType: "one on one",
        participants: [randomUser._id, user.id],
        lastPlayed: user.id,
        currentRound: 1,
        createdBy: user.id,
      });
      navigate(
        `/matches/random-mode/${newRandomMatch.data._id}/${selectedCategory}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main-container">
      {/* {base64 && (
        <img
          src={`data:image/png;base64,${base64}`}
          style={{ width: "100px" }}
          alt=""
        />
      )} */}
      {clicked ? (
        <div className="search-bar">
          <h3>Who's the Music Master?</h3>
          <div className="enter-email-wrap">
            <label htmlFor="enter email">
              Enter your friend's Email To see Who's the Music Master!
            </label>
            <input
              onChange={handleFriendInput}
              type="text"
              placeholder="Friend's Email"
              onKeyDown={fireSearch}
            />
          </div>
          {/* <div className="enter-email-wrap">
            <button
              className="main-container-button"
              onClick={startGameWithRandomUser}
            >
              Pick Random Opponent
            </button>
          </div> */}
          <div className="category-dropdown-wrap">
            <label>Random-Mode if not selected, </label>
            <select
              className="category-dropdown"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
              name="categories"
              id="categories"
            >
              <option value="default" disabled>
                Select a Category
              </option>
              <option value="rock">Rock</option>
              <option value="rap">Rap</option>
              <option value="pop">Pop</option>
              <option value="electronic">Electronic</option>
              <option value="reggae">Reggae</option>
              <option value="movies">Movies</option>
              <option value="boyBands">Boy Bands</option>
              <option value="latin">latin</option>
            </select>
          </div>
          <div className="go-btn" onClick={createNewGame}>
            Go
          </div>
        </div>
      ) : (
        <>
          <div className="main-btn-container">
            <button
              className="findgame-button"
              onClick={startGameWithRandomUser}
            >
              Find Random Opponent
            </button>
            <button className="findgame-button" onClick={handleFriendGameClick}>
              Find a Friend
            </button>
          </div>
          <div className="main-turns-container">
            <div className="main-turn">
              <h3>MY TURN</h3>
              <MyTurnMatchSum user={user} matches={matches} />
            </div>
            <div className="main-turn">
              <h3>THEIR TURN</h3>
              <TheirTurnMatchSum user={user} matches={matches} />
            </div>
          </div>
          {/* <button className="findgame-button">New Game - Party mode</button> */}
        </>
      )}
    </div>
  );
}

export default Main;
