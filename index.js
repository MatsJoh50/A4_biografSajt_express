import express, { response } from "express";
import fs from "fs/promises";

const app = express();

async function renderPage(response, page) {
  const currentPath = page == "/" ? "index" : page;
  console.log("Current page: " + currentPath);
  const buf = await fs.readFile(`./static/${currentPath}.html`);
  const html = buf.toString();

  response.send(html);
}

// app.get('/', async (request, response) => {
//     const buf = await fs.readFile('./static/index.html');
//     const html = buf.toString();

//     response.send(html);
// });

app.get("/", async (request, response) => {
  renderPage(response, "index");
});
// app.get("/index", async (request, response) => {
//   renderPage("index");
// });

app.get("/filmer", async (request, response) => {
  renderPage(response, "filmer");
});

app.get("/aboutus", async (request, response) => {
  renderPage(response, "aboutus");
});

app.get("/", async (request, response) => {
  renderPage(response, "newsevent");
});

app.use("/static", express.static("./static"));
app.use("/src", express.static("./src"));
app.use("/assets", express.static("./assets"));
app.use("/images", express.static("./images"));

app.listen(3080);

console.log("Listening to port: 3080");
