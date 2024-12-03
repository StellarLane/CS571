// This is where your JS goes!

// You can fetch data from https://cs571api.cs.wisc.edu/rest/f24/ice/chili
// When you are complete, you should also be able to fetch data from...
//  https://cs571api.cs.wisc.edu/rest/f24/ice/pasta
//  https://cs571api.cs.wisc.edu/rest/f24/ice/pizza

let recipe, reviews;
let reviewInd = 0;
let baseAmount = [];

function updateRecipe() {
    const select = document.getElementById("recipeSelector")["value"];
    fetch(`https://cs571.org/rest/f24/ice/${select}`, {
        method: "GET",
        headers: {
            "X-CS571-ID": CS571.getBadgerId(),
        }
    })
        .then((response) => response.json())
        .then((data) => {
            recipe = JSON.parse(JSON.stringify(data));
            const pic = recipe['img'];
            const ingredients = recipe['ingredients'];
            const steps = recipe['recipe'];
            reviews = recipe['reviews'];
            document.getElementById("recipeAuthor").innerText = "By " + recipe['author'];
            document.getElementById("recipePicture").src = pic['location'];
            document.getElementById("recipePicture").alt = pic['description'];
            document.getElementById("recipeName").innerText = recipe['name'];

            const ingredientsHTML = document.getElementById("ingredients-body");
            ingredientsHTML.innerHTML = '';
            baseAmount = [];
            for (let ingredientName in ingredients) {
                let ingredient = ingredients[ingredientName];
                const thisRow = document.createElement("tr");
                const thisAmount = document.createElement("td");
                const thisUnit = document.createElement("td");
                const thisMisc = document.createElement("td");
                baseAmount.push(ingredient['amount']);
                thisAmount.innerText = ingredient['amount'];
                if (ingredient['unit']) thisUnit.innerText = ingredient['unit'];
                if (ingredient['misc']) {
                    thisMisc.innerText = ingredientName + " " + ingredient['misc'];
                } else {
                    thisMisc.innerText = ingredientName
                }
                thisRow.appendChild(thisAmount);
                thisRow.appendChild(thisUnit);
                thisRow.appendChild(thisMisc);
                ingredientsHTML.appendChild(thisRow);
            }

            const instructionsHTML = document.getElementById("instructions");
            instructionsHTML.innerHTML = '';
            for (let stepName in steps) {
                const oneStep = document.createElement("li");
                oneStep.innerText = steps[stepName];
                instructionsHTML.appendChild(oneStep);
            }
        })
        .catch((error) => console.error(error))
}




let reviewNum = 0;

const BASE_AMNS = [1, 15, 14.5, 2, 1, 1, 1]

function updateYield() {
    if (!recipe) alert("loading");
    const select = document.getElementById("serving-selector")["value"];
    const rows = document
        .getElementById("ingredients")
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName("td")[0].innerText = select * baseAmount[i];
    }
}

function displayReview() {
    if (!recipe) alert("loading");
    alert(reviews[reviewNum % 4]["txt"]);
    reviewNum++
}

updateRecipe();