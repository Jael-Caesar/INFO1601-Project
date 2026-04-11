import { CONFIG } from './config.js';
let currentPage = 1;
let lastPage = 1;


const API_BASE = `https://perenual.com/api/v2/species-list?`;

// Function to fetch plants
// Added page and hardiness as parameters with default values
export async function getPlantData(searchQuery = '', page = 1) {
    try {
        currentPage = page; // Update our local tracker
        let url = `${API_BASE}page=${page}&indoor=true&key=${CONFIG.PERENUAL_KEY}`;
        
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
                    <a href="detail.html?id=${plant.id}" class="btn-details">View Details</a>
                </div>
            </div>
        `;
    });
}

getPlantData(); // Initial fetch to populate the page with plants on load