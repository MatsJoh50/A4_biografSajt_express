
const fullApiJson = [];
getApi()
  .then((impData) => impData.forEach((challenge) => fullApiJson.push(challenge)))
  .then(randomHeroImage)
  .catch((err) => {
    console.log("errors: " + err.message);
  });

//Fetch Challange API
async function getApi() {
  if (fullApiJson.length == 0) {
    // const url = "/static/movies.json";
    const url = "https://plankton-app-xhkom.ondigitalocean.app/api/movies";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    const impData = data.data.map((obj) =>{
      return{
        id: obj.id,
        ...obj.attributes,
      }
    });

    return impData;
  } else console.log("Api alredy loaded");
}
//random movie title poster as bg for hero section

randomHeroImage();

function randomHeroImage() {
  const heroSection = document.querySelector(".filmer__hero");
  // Generate a random index within the length of the array
  var randomIndex = Math.floor(Math.random() * fullApiJson.length);

  // Access the element at the random index
  var randomElement = fullApiJson[randomIndex];
  console.log(randomElement);

  // Now you can use randomElement in your code
  // Create a linear gradient string
  var image = "url(" + randomElement.image.url + ")";
  heroSection.style.backgroundImage = image;
  // Get the .filmer__hero--title element
  var filmerTitle = document.querySelector(".filmer__hero--title");

  // Create a text node with the content from randomElement.title
  var titleTextNode = document.createTextNode(randomElement.title);

  console.log(randomElement.title.length);
  if (randomElement.title.length >= 40) {
    filmerTitle.classList.add("xlarge");
    console.log("added extra large");
  } else if (randomElement.title.length >= 30) {
    filmerTitle.classList.add("large");
    console.log("added large");
  }
  // Append the text node to .filmer__hero--title
  filmerTitle.appendChild(titleTextNode);
}
