const PORT = 3000;
const app = require("express")(PORT);
const http = require("http").createServer(app);

app.get("/", (req, res) => res.send("hello!"));
http.listen(3000, () => {
  console.log(`The server is listening on :${PORT}`);
});
