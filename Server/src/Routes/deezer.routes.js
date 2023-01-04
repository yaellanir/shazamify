import axios from "axios";
import { Router } from "express";

const deezerRouter = new Router();

const BASE_URL = "https://api.deezer.com";

export const getSongByTrackName = async (artist, trackName) => {
  try {
    const song = await axios.get(
      `${BASE_URL}/search?q=artist:"${artist}" track:"${trackName}"`
    );
    // console.log(song);
  } catch (error) {
    console.log(error);
  }
};

deezerRouter.get("/deezer/song", async (req, res) => {
  const { artist, song } = req.query;
  try {
    const { data } = await axios.get(
      `${BASE_URL}/search?q=artist:"${artist}" track:"${song}"`
    );
    // console.log(data.data[0]);
    const songObj = {
      artist: data.data[0].artist.name,
      image: data.data[0].artist.picture_medium,
      song_url: data.data[0].preview,
      title: data.data[0].title_short,
    };
    // console.log("songObj", songObj);
    res.send(songObj);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default deezerRouter;

// {
//   "id": 4762041,
//   "readable": true,
//   "title": "Everlong",
//   "title_short": "Everlong",
//   "title_version": "",
//   "link": "https://www.deezer.com/track/4762041",
//   "duration": 249,
//   "rank": 824050,
//   "explicit_lyrics": false,
//   "explicit_content_lyrics": 0,
//   "explicit_content_cover": 0,
//   "preview": "https://cdns-preview-5.dzcdn.net/stream/c-5ac995d4ffd81eccda77f35db0fc2fb4-5.mp3",
//   "md5_image": "266f01f1c7a04843d11cd08f9c07d11f",
//   "artist": {
//       "id": 566,
//       "name": "Foo Fighters",
//       "link": "https://www.deezer.com/artist/566",
//       "picture": "https://api.deezer.com/artist/566/image",
//       "picture_small": "https://e-cdns-images.dzcdn.net/images/artist/54c324b8651addd8c400de22f9dac5c8/56x56-000000-80-0-0.jpg",
//       "picture_medium": "https://e-cdns-images.dzcdn.net/images/artist/54c324b8651addd8c400de22f9dac5c8/250x250-000000-80-0-0.jpg",
//       "picture_big": "https://e-cdns-images.dzcdn.net/images/artist/54c324b8651addd8c400de22f9dac5c8/500x500-000000-80-0-0.jpg",
//       "picture_xl": "https://e-cdns-images.dzcdn.net/images/artist/54c324b8651addd8c400de22f9dac5c8/1000x1000-000000-80-0-0.jpg",
//       "tracklist": "https://api.deezer.com/artist/566/top?limit=50",
//       "type": "artist"
//   },
//   "album": {
//       "id": 401032,
//       "title": "Greatest Hits",
//       "cover": "https://api.deezer.com/album/401032/image",
//       "cover_small": "https://e-cdns-images.dzcdn.net/images/cover/266f01f1c7a04843d11cd08f9c07d11f/56x56-000000-80-0-0.jpg",
//       "cover_medium": "https://e-cdns-images.dzcdn.net/images/cover/266f01f1c7a04843d11cd08f9c07d11f/250x250-000000-80-0-0.jpg",
//       "cover_big": "https://e-cdns-images.dzcdn.net/images/cover/266f01f1c7a04843d11cd08f9c07d11f/500x500-000000-80-0-0.jpg",
//       "cover_xl": "https://e-cdns-images.dzcdn.net/images/cover/266f01f1c7a04843d11cd08f9c07d11f/1000x1000-000000-80-0-0.jpg",
//       "md5_image": "266f01f1c7a04843d11cd08f9c07d11f",
//       "tracklist": "https://api.deezer.com/album/401032/tracks",
//       "type": "album"
//   },
//   "type": "track"
// }
