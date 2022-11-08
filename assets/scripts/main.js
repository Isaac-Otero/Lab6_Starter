// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  let recipe=localStorage.getItem('recipes');
  if(recipe==null){
    return [];
  }
  //if nothing in the recipes, return empty array

  if(recipe.length==0){
    return [];
  }
  else{
    return JSON.parse(recipe);
  }

}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. TODO - Get a reference to the <main> element
  let mainRef=document.querySelector('main');
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  for(let i = 0; i <recipes.length; i++){
    let recipeElement=document.createElement('recipe-card');
    recipeElement.data={imgSrc:recipes[i].imgSrc,imgAlt:recipes[i].imgAlt,titleLnk:recipes[i].titleLnk,titleTxt:recipes[i].titleTxt,organization:recipes[i].organization,rating:recipes[i].rating,numRatings:recipes[i].numRatings,lengthTime:recipes[i].lengthTime,ingredients:recipes[i].ingredients};
    mainRef.append(recipeElement);
  }
 
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  let recipeString=JSON.stringify(recipes);
  localStorage.setItem("recipes", recipeString);
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. TODO - Get a reference to the <form> element
  let formRef=document.querySelector('form');
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  let submitListener=formRef.addEventListener("submit",function(event){
  // Steps B4-B9 will occur inside the event listener from step B3
  // B4. TODO - Create a new FormData object from the <form> element reference above
  let myformData= new FormData(formRef);
  // B5. TODO - Create an empty object (I'll refer to this object as recipeObject to
  //            make this easier to read), and then extract the keys and corresponding
  //            values from the FormData object and insert them into recipeObject
  let recipeObject = {};
    recipeObject["imgSrc"] = myformData.get("imgSrc");
    recipeObject["imgAlt"] = myformData.get("imgAlt");
    recipeObject["titleLnk"] = myformData.get("titleLnk");
    recipeObject["titleTxt"] = myformData.get("titleTxt");
    recipeObject["organization"] = myformData.get("organization");
    recipeObject["rating"] = myformData.get("rating");
    recipeObject["numRatings"] = myformData.get("numRatings");
    recipeObject["lengthTime"] = myformData.get("lengthTime");
    recipeObject["ingredients"] = myformData.get("ingredients");
 
  // B6. TODO - Create a new <recipe-card> element
  let recipeElement=document.createElement('recipe-card');
  // B7. TODO - Add the recipeObject data to <recipe-card> using element.data
  recipeElement.data=recipeObject;
  // B8. TODO - Append this new <recipe-card> to <main>
  let mainRef3=document.querySelector('main');
  mainRef3.append(recipeElement);
  // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
  //            then save the recipes array back to localStorage
  let recipes2 = getRecipesFromStorage();
  alert('step1');
  recipes2.push(recipeElement);
  alert('step2');
  saveRecipesToStorage(recipes2);
  alert('step3');
  });
 
  // B10. TODO - Get a reference to the "Clear Localad Storage" button
  let formRef1=document.querySelector(".danger");
  // B11. TODO - Add a click event listener to clear local storage button
  let clearListener=formRef1.addEventListener("click", function(event){
  // Steps B12 & B13 will occur inside the event listener from step B11
  // B12. TODO - Clear the local storage
  localStorage.clear();

  // B13. TODO - Delete the contents of <main>
  let mainRef2=document.querySelector('main');
  mainRef2.remove();
});

}
