import { CONFIG } from './config.js';

const API_URL = `https://perenual.com/api/species-list?key=${CONFIG.PERENUAL_KEY}`;

// Function to fetch plants from the API
export async function fetchPlants(query = '') {
    try {
        // If there's a search query, add it to the URL
        const url = query ? `${API_URL}&q=${query}` : API_URL;
        
        const response = await fetch(url);
        const data = await response.json();
        
        // Perenual returns an array called "data"
        displayPlants(data.data);
    } catch (error) {
        console.error("Oops! The garden is wilting:", error);
        document.getElementById('plant-container').innerHTML = "<p>Could not load plants. Check your connection!</p>";
    }
}

// Function to inject HTML cards into your page
function displayPlants(plants) {
    const container = document.getElementById('plant-container');
    container.innerHTML = ''; // Clear previous results

    plants.forEach(plant => {
        // Use a default image if the API doesn't provide one
        const image = plant.default_image ? plant.default_image.regular_url : 'assets/placeholder.jpg';
        
        const card = `
            <div class="plant-card">
                <img src="${image}" alt="${plant.common_name}">
                <div class="card-content">
                    <h3>${plant.common_name}</h3>
                    <p><em>${plant.scientific_name[0]}</em></p>
                    <button class="btn-emerald" onclick="viewDetails(${plant.id})">View Details</button>
                    <button class="btn-pink" onclick="addToWishlist(${plant.id})">♥</button>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}
import { CONFIG } from './config.js';

const API_BASE = `https://perenual.com/api/species-list?key=${CONFIG.PERENUAL_KEY}`;

// Function to fetch plants
export async function getPlantData(searchQuery = '') {
    try {
        const url = searchQuery ? `${API_BASE}&q=${searchQuery}` : API_BASE;
        const response = await fetch(url);
        const json = await response.json();
        renderPlants(json.data);
    } catch (err) {
        console.error("Aqua Fern Error:", err);
    }
}

// Function to build the UI cards
function renderPlants(plants) {
    const shopContainer = document.querySelector('#shop-grid');
    if (!shopContainer) return; // Only runs if we are on shop.html

    shopContainer.innerHTML = ''; 

    plants.forEach(plant => {
        const img = plant.default_image ? plant.default_image.thumbnail : 'assets/placeholder.png';
        shopContainer.innerHTML += `
            <div class="plant-card">
                <img src="${img}" alt="${plant.common_name}">
                <h3>${plant.common_name}</h3>
                <button onclick="saveToWishlist(${plant.id}, '${plant.common_name}')">♥ Wishlist</button>
                <a href="detail.html?id=${plant.id}">View Details</a>
            </div>
        `;
    });
}