document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from form
    const name = document.getElementById('name').value.trim();
    const category = document.getElementById('category').value;
    const ingredients = document.getElementById('ingredients').value.trim();
    const process = document.getElementById('process').value.trim();

    // Create recipe object
    const recipe = { name, category, ingredients, process };
    // Get existing recipes from localStorage or empty array
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Add new recipe
    recipes.push(recipe);

    // Save updated array back to localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    alert('Recipe submitted successfully!');

    // Optionally clear the form
    this.reset();
});
