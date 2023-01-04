// import axios from "axios";
// import { categories } from "./constants.js";

// const BASE_URL = "http://localhost:3001";

// const findInvalidSongs = async () => {
//   const dataForCalls = [];
//   const errors = [];
  // Object.keys(categories).forEach((category) => {
  //   categories[category].forEach((song) => dataForCalls.push(song));
  // });
  // const waitForMs = (ms) =>
  //   new Promise((resolve, reject) => setTimeout(() => resolve(), ms));
  // let batchSize = 1;
  // let curReq = 0;
  // while (curReq < dataForCalls.length) {
  //   // a batch is either limited by the batch size or it is smaller than the batch size when there are less items required
  //   const end = dataForCalls.length < curReq ? dataForCalls.length : curReq;
  //   // we know the number of concurrent request so reserve memory for this
  //   const concurrentReq = new Array(batchSize);
  //   // issue one request for each item in the batch
  //   for (let index = curReq; index < dataForCalls.length; index++) {
  //     concurrentReq.push(
  //       fetch(
  //         `${BASE_URL}/deezer/song` + new URLSearchParams(dataForCalls[index])
  //       )
  //     );
  //     console.log(`sending request ${curReq}...`);
  //     curReq++;
  //   }
  //   // wait until all promises are done or one promise is rejected
  //   await Promise.all(concurrentReq).catch((err) => console.log(err));
  //   console.log(`requests ${curReq - batchSize}-${curReq} done.`);
  //   if (curReq + 1 < dataForCalls.length) {
  //     // after requests have returned wait for one second
  //     console.log(
  //       `[${new Date().toISOString()}] Waiting a second before sending next requests...`
  //     );
  //     await waitForMs(3000);
  //     console.log(
  //       `[${new Date().toISOString()}] At least one second has gone.`
  //     );
  //   }
  // }
//   for (const category in categories) {
//     const arrOfSongs = categories[category];
//     arrOfSongs.forEach(async (song) => {
//       const { artist, song: title } = song;
//       const waitForMs = (ms) =>
//         new Promise((resolve, reject) => setTimeout(() => resolve(), ms));
//       try {
//         await waitForMs(3000);
//         const { data } = await axios.get(
//           `${BASE_URL}/deezer/song?artist=${artist}&song=${title}}`
//         );
//       } catch (error) {
//         errors.push(song);
//         console.table({ ...song, error: error.message });
//       }
//     });
//   }
// };

// findInvalidSongs();
