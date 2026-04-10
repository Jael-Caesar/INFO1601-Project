import { CONFIG } from './config.js';

// Updated to v2 based on your link
const API_BASE = `https://perenual.com/api/v2/species-list?`;

// Function to fetch plants
// Added page and hardiness as parameters with default values
export async function getPlantData(searchQuery = '', page = 3, hardiness = '4-8') {
    try {
        // Build the URL dynamically
        let url = `${API_BASE}page=${page}&hardiness=${hardiness}&key=${CONFIG.PERENUAL_KEY}`;
        
        // If the user is searching, add the 'q' parameter
        if (searchQuery) {
            url += `&q=${searchQuery}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const json = await response.json();
        
        // Perenual v2 returns data in a 'data' array
        renderPlants(json.data);
        
        // Optional: Update a page counter in your UI
        const pageLabel = document.getElementById('current-page-display');
        if (pageLabel) pageLabel.innerText = `Viewing Page ${json.current_page}`;

    } catch (err) {
        console.error("Aqua Fern Error:", err);
    }
}

// Function to build the UI cards
function renderPlants(plants) {
    const shopContainer = document.querySelector('#plant-list');
    if (!shopContainer) {
        console.error("Shop grid container not found");
        return;
    }

    shopContainer.innerHTML = ''; 

    plants.forEach(plant => {
        // Use regular_url for better quality if thumbnail is too small
        const img = plant.default_image ? plant.default_image.regular_url : 'assets/placeholder.png';
        
        shopContainer.innerHTML += `
            <div class="plant-card">
                <img src="${img}" alt="${plant.common_name}">
                <div class="card-content">
                    <h3>${plant.common_name}</h3>
                    <p class="scientific-name"><em>${plant.scientific_name[0]}</em></p>
                    <div class="card-buttons">
                        <button class="btn-wishlist" onclick="saveToWishlist(${plant.id}, '${plant.common_name}')">♥ Wishlist</button>
                        <a href="detail.html?id=${plant.id}" class="btn-details">View Details</a>
                    </div>
                </div>
            </div>
        `;
    });
}

getPlantData(); // Initial fetch to populate the page with plants on load