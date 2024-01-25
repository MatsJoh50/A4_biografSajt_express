import express, { response } from "express";
import fs from "fs/promises";
import {engine} from "express-handlebars";

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

const menuItems = [
    {
        lable: 'Filmer',
        link: '/filmer',
    },
    {   
        lable: 'Om Oss',
        link: '/aboutus',
    },
    {
        lable: 'Nyheter',
        link: '/newsevents',
    },
    {
        lable: 'Sponsorer',
        link: '/ourSponsors',
    },
]


async function renderPage(response, page) {
/*
  const menuItemsList = menuItems.map((item) => {
    return `<a href="${item.link}" class="header__link">${item.lable}</a>`;
  });

  const menuString = menuItemsList.join('\n');

    const headerbuf = await fs.readFile(`./templates/header.html`);
    const headerhtml = headerbuf.toString().replaceAll('%%menu%%', menuString);

    const footerbuf = await fs.readFile(`./templates/footer.html`);
    const footerhtml = footerbuf.toString();


  const currentPath = (page == '/') ? "index" : page;
  console.log("Current page: " + currentPath);
  const buf = await fs.readFile(`./static/${currentPath}.html`);
  const html = buf.toString();

  response.send(html.replace('%%header%%', headerhtml).replace('%%footer%%', footerhtml));
  */
 response.render(page, {
  menu: menuItems.map(item => {
    return{
      lable: item.lable,
      link: item.link,
    };
  })
 });
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

app.get("/ourSponsors", async (request, response) => {
  renderPage(response, "ourSponsors");
});


app.use("/static", express.static("./static"));
app.use("/src", express.static("./src"));
app.use("/assets", express.static("./assets"));
app.use("/images", express.static("./images"));
app.use("/content", express.static("./content"));
app.use("/template", express.static("./template"));

const port = 5080
app.listen(port);

console.log("=============================")
console.log(`Listening to port: ${port}`);
console.log("============================")
