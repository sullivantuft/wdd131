import recipes from './recipes.js';

function random(num){
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list){
    const listLength = list.length;
    const randomNum = random(listLength);

    return list[randomNum];
}

function recipeTemplate(recipe){
    return `
    <div class = "recipe">
        <div class="recipe-image">
            <img src="${recipe.image}" alt="${recipe.description}">
        </div>
        <div class = "recipe-details">
            <p id="tag">${tagsTemplate(recipe.tags)}</p>
            <h2>${recipe.name}</h2>
            ${ratingTemplate(recipe.rating)}
            <p>${recipe.description}</p>
        </div>
    </div>
    `
}

function tagsTemplate(tags){
    const html = tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
    return html;
}

function ratingTemplate(rating){
    let html = `<span
                class="rating"
                role="img"
                aria-label="Rating: ${rating} out of 5 stars"
            >`
    for(let i=1; i<=5; i++){
        if(i<=rating){
            html+=`<span aria-hidden="true" class="icon-star">⭐</span>`
        } 
        else{
            html+=`<span aria-hidden="true" class="icon-star-empty">☆</span>`
        }  
    }
    html += `</span>`;

    return html;
}
function renderRecipes(recipeList){
    const container = document.getElementById('recipes-container');

    const recipesHTML = recipeList.map(recipeTemplate).join('');
    container.innerHTML = recipesHTML;

}
function filterRecipes(query){
    const filtered = recipes.filter(recipe =>{
        const nameMatch = recipe.name.toLowerCase().includes(query);
        const descMatch = recipe.description.toLowerCase().includes(query);
        const tagMatch = recipe.tags.find(tag => tag.toLowerCase().includes(query));
        const ingredientMatch = recipe.recipeIngredient.find(ingredient => ingredient.toLowerCase().includes(query));

        return nameMatch || descMatch || tagMatch || ingredientMatch
    });

    const sorted = filtered.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if(nameA < nameB) return -1;
        if(nameA > nameB) return 1;
        return 0;

    })

    return sorted;
}
function searchHandler(e){
    e.preventDefault();
    const input = document.querySelector('.search-form input[name="query"]');
    const query = input.value.toLowerCase();
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
}
function init(){
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}
init();
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', searchHandler);

