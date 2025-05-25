const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const detailDiv = document.getElementById("recipe-detail");

let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

if (id === null || !recipes[id]) {
    detailDiv.innerHTML = "<p>Recipe not found.</p>";
} else {
    const recipe = recipes[id];

    detailDiv.innerHTML = `
        <h2>${recipe.name}</h2>
        <p><strong>Ingredients:</strong><br>${recipe.ingredients.replace(/\n/g, "<br>")}</p>
        <p><strong>Process:</strong><br>${recipe.process.replace(/\n/g, "<br>")}</p>
        <p id="avg">Average Rating: ${getAvg(recipe.rating)}</p>
        <label>Rate this recipe:</label>
        <select id="rate">
            <option value="">--Rate--</option>
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐⭐</option>
            <option value="3">3 ⭐⭐⭐</option>
            <option value="4">4 ⭐⭐⭐⭐</option>
            <option value="5">5 ⭐⭐⭐⭐⭐</option>
        </select>
    `;

    document.getElementById("rate").addEventListener("change", function () {
        const val = parseInt(this.value);
        if (!recipes[id].rating) recipes[id].rating = [];
        recipes[id].rating.push(val);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        document.getElementById("avg").innerText = `Average Rating: ${getAvg(recipes[id].rating)}`;
        this.disabled = true;
        alert("Thanks for rating!");
    });
}
function getAvg(ratings) {
    if (!ratings || ratings.length === 0) return "No ratings yet.";
    const sum = ratings.reduce((a, b) => a + b, 0);
    return `${(sum / ratings.length).toFixed(1)} ⭐`;
}
