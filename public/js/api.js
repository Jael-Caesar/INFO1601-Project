import { CONFIG } from './config.js';
let currentPage = 1;
let lastPage = 1;

const API_BASE = `https://perenual.com/api/v2/species-list?`;

export async function getPlantData(page = 1, filters = {}) {
    try {
        currentPage = page; 
        let url = `${API_BASE}page=${page}&key=${CONFIG.PERENUAL_KEY}`;
        
        Object.keys(filters).forEach(key => {
            if (filters[key] !== undefined && filters[key] !== null) {
                url = `${API_BASE}page=${page}`;
                url += `&${key}=${filters[key]}&key=${CONFIG.PERENUAL_KEY}`;
            }
        });

        console.log("Fetching this URL:", url);

        const response = await fetch(url);
        const json = await response.json();
        
        lastPage = json.last_page; 
        updatePaginationUI(json);
        renderPlants(json.data);
    } catch (err) {
        console.error("Filter Fetch Error:", err);
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

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) getPlantData('', currentPage - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < lastPage) getPlantData('', currentPage + 1);
    });
};

function renderPlants(plants) {
    const container = document.getElementById('plant-list');
    container.innerHTML = '';
    if (!container) {
        console.error("Shop grid container not found");
        return;
    }

    plants.forEach(plant => {
        const img = plant.default_image ? plant.default_image.regular_url : 'assets/placeholder.png';
     
        container.innerHTML += `
            <div class="product-card">
                <img src="${plant.default_image?.regular_url || 'images/placeholder.png'}" alt="${plant.common_name}">
                <h3>${plant.common_name}</h3>
                <p>$50.00</p>
                <div>
                    <button class="btn" onclick="addToCart(${plant.id}, '${plant.common_name}', '${plant.default_image?.regular_url}')">Add to Cart</button>
                </div>
                <a href="details.html?id=${plant.id}" class="btn-details">View Details</a>

            </div>
        `;
    });
}

export async function loadPlantDetails(plantId) {
    const API_URL = `https://perenual.com/api/v2/species/details/${plantId}?key=${CONFIG.PERENUAL_KEY}`;

    try {
        const response = await fetch(API_URL);
        const plant = await response.json();
        
        renderDetails(plant); 

    } catch (error) {
        console.error("Error loading plant details:", error);
    }
}

function renderDetails(plant) {
    const cleanData = (value, fallback) => {
        if (!value || String(value).includes("Upgrade Plan")) return fallback;
        return value;
    };

    document.getElementById('plant-name').innerText = plant.common_name || "Boutique Plant";
    document.getElementById('plant-img').src = plant.default_image?.regular_url || 'images/placeholder.png';
    document.getElementById('plant-description').innerText = plant.description || "A lovely addition to your home.";
    
    document.getElementById('plant-scientific').innerText = plant.scientific_name?.[0] || 'N/A';
    document.getElementById('plant-watering').innerText = cleanData(plant.watering, 'Moderate');
    document.getElementById('plant-sun').innerText = cleanData(plant.sunlight?.join(', '), 'Partial Shade');
    document.getElementById('plant-care').innerText = cleanData(plant.care_level, 'Easy');
    document.getElementById('plant-growth').innerText = cleanData(plant.growth_rate, 'Moderate');
}

const urlParams = new URLSearchParams(window.location.search);
const plantId = urlParams.get('id');

if (plantId) {
    loadPlantDetails(plantId);
} else if (document.getElementById('plant-list')) {
    getPlantData();
}

window.applyFilter = (type, value) => {
    const activeFilters = {};
    activeFilters[type] = value;
    
    getPlantData(1, activeFilters);
};