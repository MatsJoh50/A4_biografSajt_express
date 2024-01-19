import express, { response } from "express";
import fs from "fs/promises";

const app = express();

async function renderPage(response, page) {

    const headerbuf = await fs.readFile(`./templates/header.html`);
    const headerhtml = headerbuf.toString();

    const footerbuf = await fs.readFile(`./templates/footer.html`);
    const footerhtml = footerbuf.toString();


  const currentPath = page == "/" ? "index" : page;
  console.log("Current page: " + currentPath);
  const buf = await fs.readFile(`./static/${currentPath}.html`);
  const html = buf.toString();

  response.send(html.replace('%%header%%', headerhtml).replace('%%footer%%', footerhtml));
}


app.get("/", async (request, response) => {
  renderPage(response, "index");
});

app.get("/filmer", async (request, response) => {
  renderPage(response, "filmer");
});

app.get("/aboutus", async (request, response) => {
  renderPage(response, "aboutus");
});

app.get("/newsevents", async (request, response) => {
  renderPage(response, "newsevents");
});

app.use("/static", express.static("./static"));
app.use("/src", express.static("./src"));
app.use("/assets", express.static("./assets"));
app.use("/images", express.static("./images"));
app.use("/content", express.static("./content"));
app.use("/template", express.static("./template"));

app.listen(3080);

console.log("Listening to port: 3080");