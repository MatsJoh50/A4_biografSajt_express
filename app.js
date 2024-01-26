import express, { response } from "express";
import fs from "fs/promises";
import {engine} from "express-handlebars";

//Port for express to listen to
const port = 5080;

const app = express();

app.engine('handlebars', engine({partialsDir: './templates/partials'}));
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
]



//Fetch data from the specified file using the fetchData function
const data = await fetchData("https://plankton-app-xhkom.ondigitalocean.app/api/movies").catch((error) => console.log(error.message));

//function to fetch data from specific file using fetch API
async function fetchData(file) {
  //Use the fetch function to make an async http request
  const response = await fetch(file);
  
  //check if response status is ok
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Something went wrong with the request. Error code: ${response.status}`);
  }
}

//Giving movies the value of all the movies in the data variable.
const impData = data.data.map((obj) =>{
  return{
    id: obj.id,
    ...obj.attributes,
  }
});


async function renderPage(response, page) {
  response.render(page, {
    menu: menuItems.map(item => {
    return{
      lable: item.lable,
      link: item.link,
    };
  }),
  api: impData,
});
}

async function renderPageId(response, page, id) {
  response.render(page, {
    menu: menuItems.map(item => {
      return{
        lable: item.lable,
        link: item.link,
      };
    }),
    movie: impData[impData.findIndex(item => item.id == id)],
  });
}


app.get("/", async (request, response) => {
  renderPage(response, "index");
});

app.get("/filmer", async (request, response) => {
  renderPage(response, "filmer");
});

app.get("/filmer/:id", async (request, response) => {
  const id = request.params.id;

  if(!(impData.find(item => item.id == id))){
    response.status(404);
    renderPage(response, "404");
  }
  else {
    renderPageId(response, "movieinfo", id);
  }
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

//404 Status
app.use("*", (request, response) => {
  response.status(404);
  renderPage(response, "404");
});

export default app;