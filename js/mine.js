let alldata = [];

let links = document.getElementsByClassName("nav-link");

let linksArray = [...links];

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", (eventInfo) => {
        let query = eventInfo.target.innerHTML;

        getRecipes(query);
    });
}

async function getRecipes(klma) {
    let req = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${klma}`
    );
    let responseBody = await req.json();

    alldata = responseBody.recipes;

    displayData();

    console.log("salad");
}

let recipeDetails = {};

async function getSingleRecipe(id) {
    let req = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    let responseBody = await req.json();
    recipeDetails = responseBody.recipe;
    displaySingleRecipe();
    console.log(recipeDetails);
}




var rowData = document.getElementById("rowData");

function displayData() {
    var str = "";
    for (var i = 0; i < alldata.length; i++) {
        str += `<div class="col-md-3">
    <div class="item">
    <img src="${alldata[i].image_url}" 
    data-toggle="modal" data-target="#exampleModal" 
     onclick="getSingleRecipe('${alldata[i].recipe_id}')"  class="w-100" >
      <h1>${alldata[i].title}</h1>
      <p>${alldata[i].publisher}</p>
      <p>${alldata[i].recipe_id}</p>

    </div>

  </div>`;
    }

    rowData.innerHTML = str;
}

getRecipes("pizza");

function displaySingleRecipe() {

    let lis = '';
    for (let i = 0; i < recipeDetails.ingredients.length; i++) {
        lis += `<li>${recipeDetails.ingredients[i]}</li>`
    }

    let str = `
  <div>
    <img src="${recipeDetails.image_url}" class = "img-fluid" alt="">
    <h2>${recipeDetails.title}</h2>
    <p>${recipeDetails.publisher}</p>
    <ol>${lis}</ol>

  </div>
   `

    document.getElementById("recipeDetails").innerHTML = str;
}

//##############################
var imgs = document.getElementsByClassName("img-fluid");

var fixedBox = document.getElementById("fixedBox");

var smallBox = document.getElementById("smallBox");

var closeBtn = document.getElementById("closeBtn");
var nextBtn = document.getElementById("nextBtn");
var prevBtn = document.getElementById("prevBtn");

var imgsArr = [];

for (var i = 0; i < imgs.length; i++) {
    imgsArr.push(imgs[i]);
}

console.log(imgsArr);

var indexOfImg; //global

console.log(imgs);

for (var i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener("click", function(e) {
        var clickedImg = e.target;
        var imgsrc = clickedImg.getAttribute("src");

        indexOfImg = imgsArr.indexOf(clickedImg);

        console.log(imgsrc);

        fixedBox.style.display = "flex";
        smallBox.style.backgroundImage = `url(${imgsrc})`;
    });
}

function getNextSlide() {
    indexOfImg++;

    if (indexOfImg == imgsArr.length) {
        indexOfImg = 0;
    }
    var srcOfNextImg = imgsArr[indexOfImg].getAttribute("src");
    smallBox.style.backgroundImage = `url(${srcOfNextImg})`;
}

function getPrevSlide() {
    indexOfImg--;

    if (indexOfImg < 0) {
        indexOfImg = imgsArr.length - 1;
    }
    var srcOfNextImg = imgsArr[indexOfImg].getAttribute("src");
    smallBox.style.backgroundImage = `url(${srcOfNextImg})`;
}

prevBtn.addEventListener("click", getPrevSlide);

nextBtn.addEventListener("click", getNextSlide);

closeBtn.addEventListener("click", closeSlide);

document.addEventListener("keyup", function(eventInfo) {
    if (eventInfo.key == "Escape") {
        closeSlide();
    } else if (eventInfo.key == "ArrowRight") {
        getNextSlide();
    } else if (eventInfo.key == "ArrowLeft") {
        getPrevSlide();
    }
    console.log(eventInfo.key);
});

function closeSlide() {
    fixedBox.style.display = "none";
}