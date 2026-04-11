import { CONFIG } from './config.js';
let currentPage = 1;
let lastPage = 1;

import { addToCart } from "cart.js";

const API_BASE = `https://perenual.com/api/v2/species-list?`;

export async function getPlantData(searchQuery = '', page = 1) {
    try {
        currentPage = page; 
        let url = `${API_BASE}page=${page}&key=${CONFIG.PERENUAL_KEY}`;
        
        const response = await fetch(url);
        const json = await response.json();
        
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
        info.innerText = `Page ${meta.current_page} of ${meta.last_page}`;
    }

    prevBtn.disabled = (meta.current_page === 1);
    nextBtn.disabled = (meta.current_page === meta.last_page);
}

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) getPlantData('', currentPage - 1);
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPage < lastPage) getPlantData('', currentPage + 1);
});

function renderPlants(plants) {
    const shopContainer = document.querySelector('#plant-list');
    if (!shopContainer) {
        console.error("Shop grid container not found");
        return;
    }

    shopContainer.innerHTML = ''; 

    plants.forEach(plant => {
        const img = plant.default_image ? plant.default_image.regular_url : 'assets/placeholder.png';
        
        shopContainer.innerHTML += `
            <div class="products">
                <img src="${img}" alt="${plant.common_name}">
                <div class="product-grid">
                    <h2>${plant.common_name}</h2>
                    <p class="scientific-name"><em>${plant.scientific_name[0]}</em></p>
                    <p>Price: $ 50.00 TTD</p>
                    <button class="btn" onclick="addToCart(${plant.id}, '${plant.common_name}', '${img}')">
                     Add to Cart
                     </button>

                    <a href="details.html?id=${plant.id}" class="btn-details">View Details</a>
                </div>
            </div>
        `;
    });
}


async function loadPlantDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const plantId = urlParams.get('id');

    if (!plantId || !document.getElementById('plant-name')) return;

    const API_URL = `https://perenual.com/api/v2/species/details/${plantId}?key=${CONFIG.PERENUAL_KEY}`;

    try {
        console.log("Fetching details for ID:", plantId); 
        const response = await fetch(API_URL);
        const plant = await response.json();

        document.getElementById('plant-img').src = plant.default_image?.regular_url || 'assets/placeholder.png';
        document.getElementById('plant-name').innerText = plant.common_name;
        document.getElementById('plant-scientific').innerText = plant.scientific_name[0];
        document.getElementById('plant-description').innerText = plant.description || "No description available.";
        
        document.getElementById('plant-watering').innerText = plant.watering || 'N/A';
        document.getElementById('plant-sun').innerText = plant.sunlight?.join(', ') || 'N/A';
        document.getElementById('plant-care').innerText = plant.care_level || 'N/A';
        document.getElementById('plant-growth').innerText = plant.growth_rate || 'N/A';

    } catch (error) {
        console.error("Aqua Fern Details Error:", error);
    }
}

getPlantData();  
loadPlantDetails();