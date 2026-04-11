import { CONFIG } from './config.js';
let currentPage = 1;
let lastPage = 1;


const API_BASE = `https://perenual.com/api/v2/species-list?`;

// Function to fetch plants
// Added page and hardiness as parameters with default values
export async function getPlantData(searchQuery = '', page = 1) {
    try {
        currentPage = page; // Update our local tracker
        let url = `${API_BASE}page=${page}&key=${CONFIG.PERENUAL_KEY}`;
        
        const response = await fetch(url);
        const json = await response.json();
        
        // Use the meta-data from the JSON
        lastPage = json.last_page; 
        updatePaginationUI(json);
        
        renderPlants(json.data);
    } catch (err) {
        console.error("Aqua Fern Error:", err);
    }
}

function updatePaginationUI(meta) {
    const info = document.getElementById('page-info');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (info) {
        // Uses the current_page and last_page from your JSON
        info.innerText = `Page ${meta.current_page} of ${meta.last_page}`;
    }

    // Professional touch: Disable buttons if there's no page to go to
    prevBtn.disabled = (meta.current_page === 1);
    nextBtn.disabled = (meta.current_page === meta.last_page);
}

// Event Listeners for the buttons
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) getPlantData('', currentPage - 1);
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPage < lastPage) getPlantData('', currentPage + 1);
});

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
            <div class="products">
                <img src="${img}" alt="${plant.common_name}">
                <div class="product-grid">
                    <h2>${plant.common_name}</h2>
                    <p class="scientific-name"><em>${plant.scientific_name[0]}</em></p>
                    <p>Price: $ 50.00 TTD</p>
                    <button class="btn" onclick="saveToWishlist(${plant.id}, '${plant.common_name}')">💚 Wishlist</button> 
                    <button class="btn-details" onclick="getPlantDetails(${plant.id})">View Details</button>
                </div>
            </div>
        `;
    });
}

async function getPlantDetails() {
    // 1. Extract the ID from the URL (e.g., ?id=3000)
    const urlParams = new URLSearchParams(window.location.search);
    const plantId = urlParams.get('id');

    if (!plantId) {
        console.error("No plant ID found in URL");
        return;
    }

    const API_URL = `https://perenual.com/api/v2/species/details/${plant.id}?key=${CONFIG.PERENUAL_KEY}`;

    try {
        const response = await fetch(API_URL);
        const plant = await response.json();

        // 2. Populate the HTML elements
        document.getElementById('plant-img').src = plant.default_image?.regular_url || 'assets/placeholder.png';
        document.getElementById('plant-name').innerText = plant.common_name;
        document.getElementById('plant-scientific').innerText = plant.scientific_name[0];
        document.getElementById('plant-description').innerText = plant.description || "No description available for this species.";
        
        // 3. Populate Care Info
        document.getElementById('plant-watering').innerText = plant.watering || 'N/A';
        document.getElementById('plant-sun').innerText = plant.sunlight?.join(', ') || 'N/A';
        document.getElementById('plant-care').innerText = plant.care_level || 'N/A';
        document.getElementById('plant-growth').innerText = plant.growth_rate || 'N/A';

    } catch (error) {
        console.error("Aqua Fern Details Error:", error);
    }
    open('details.html', '_blank'); // Open details in a new tab
}

getPlantData(); // Initial fetch to populate the page with plants on load