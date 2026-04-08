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
