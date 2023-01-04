import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const getSongByTrackName = async (artist, song) => {
  try {
    const {data} = await axios.get(
      `${BASE_URL}/deezer/song?artist=${artist}&song=${song}`
    );
    // console.log(searchedSong);
    return data
  } catch (error) {
    console.log(error);
  }
};
