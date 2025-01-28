const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');

// Search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    // Clear single meal
    single_mealEl.innerHTML = '';

    // Get search term
    const term = search.value;

    // Check for empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
                } else {
                    mealsEl.innerHTML = data.meals
                    .map(
                        meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-mealID="">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                        `
                    )
                }
            });
            // Clear search text
            search.value = '';
    } else {
        alert('Please enter a search term');
    }
}

// Event listeners
submit.addEventListener('submit', searchMeal);

// mealsEL.addEventListener('click', e => {
//     const mealInfo = e.composedPath(item => {
//         if (item.classList) {
//             // console.log('found')
//             return item.classList.contains('meal-info');
//         } else {
//             return false;
//             // console.log('nada')
//         }
//     });

//     if (mealInfo) {
//         const mealID = mealInfo.getAttribute('data-mealid');
//         console.log(mealID)
//     }
// });

// Fetch meal by ID
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });
}


mealsEl.addEventListener('click', e => {
    const mealInfo = e.composedPath(item => {
      if (item.classList) {
        return item.classList.contains('meal-info');
      } else {
        return false;
      }
    });
  
    if (mealInfo) {
      console.log('mealInfo true')
      const mealID = mealInfo.getAttribute('data-mealid');
      getMealById(mealID);
    }
    else {
          console.log('meal info false')

    }
  });