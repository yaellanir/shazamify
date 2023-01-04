import server from "./app.js";

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
