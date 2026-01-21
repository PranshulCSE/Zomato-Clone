const restaurantsDB = [
    {
        id: 1,
        name: "P-P High Bar & Restaurant",
        image: "./Assets/Restraunt1.png",
        rating: 4.2,
        cuisines: ["North Indian", "Chinese"],
        price: 2800,
        location: "Railway Road, Karnal",
        distance: 2.5,
        discount: 25,
        category: "dining"
    },
    {
        id: 2,
        name: "Munshi Ram & Sons",
        image: "./Assets/Restraunt2..png",
        rating: 4.4,
        cuisines: ["North Indian", "Chinese", "Bakery"],
        price: 800,
        location: "Guru Nanak Pura, Karnal",
        distance: 1.9,
        discount: 25,
        category: "delivery"
    },
    {
        id: 3,
        name: "Thrones",
        image: "./Assets/Restraunt1.png",
        rating: 4.6,
        cuisines: ["North Indian", "Chinese", "Bar"],
        price: 2200,
        location: "Alpha International City, Karnal",
        distance: 5.9,
        discount: 10,
        category: "nightlife"
    },
    {
        id: 4,
        name: "Vatika Bar & Restaurant",
        image: "./Assets/Restraunt2..png",
        rating: 3.9,
        cuisines: ["Bar", "Chinese", "North Indian"],
        price: 6000,
        location: "Super Mall 12 Sec, Karnal",
        distance: 4.6,
        discount: 15,
        category: "dining"
    },
    {
        id: 5,
        name: "Surinder Vaishno Dhaba",
        image: "./Assets/Restraunt2..png",
        rating: 4.4,
        cuisines: ["North Indian", "Snacks"],
        price: 800,
        location: "Railway Road, Karnal",
        distance: 3.8,
        discount: 0,
        category: "delivery"
    },
    {
        id: 6,
        name: "Kalra Sweets & Restaurant",
        image: "./Assets/Restraunt1.png",
        rating: 4.1,
        cuisines: ["Sweets", "Snacks", "North Indian", "Chinese"],
        price: 900,
        location: "Sec 13, Karnal",
        distance: 4.3,
        discount: 25,
        category: "delivery"
    },
    {
        id: 7,
        name: "Cafe Grillz",
        image: "./Assets/Restraunt2..png",
        rating: 3.9,
        cuisines: ["Italian", "Continental", "Chinese"],
        price: 1200,
        location: "Model Town, Karnal",
        distance: 5.1,
        discount: 25,
        category: "dining"
    },
    {
        id: 8,
        name: "KFC",
        image: "./Assets/Restraunt1.png",
        rating: 4.6,
        cuisines: ["Fast Food", "Beverages"],
        price: 1000,
        location: "National Highway, Karnal",
        distance: 7.2,
        discount: 0,
        category: "delivery"
    },
    {
        id: 9,
        name: "Neelkanth Star",
        image: "./Assets/Restraunt1.png",
        rating: 4.7,
        cuisines: ["North Indian", "Snacks", "Fast Food"],
        price: 600,
        location: "National Highway, Karnal",
        distance: 7.2,
        discount: 25,
        category: "delivery"
    },
    {
        id: 10,
        name: "Sukoon",
        image: "./Assets/Restraunt2..png",
        rating: 3.9,
        cuisines: ["Fast Food", "Beverages", "Snacks"],
        price: 600,
        location: "Sec 12, Karnal",
        distance: 4.8,
        discount: 0,
        category: "nightlife"
    },
    {
        id: 11,
        name: "Wadhwa Bhojnalya",
        image: "./Assets/Restraunt1.png",
        rating: 4.3,
        cuisines: ["North Indian", "Breads"],
        price: 500,
        location: "Meerut Road, Karnal",
        distance: 6.2,
        discount: 30,
        category: "delivery"
    },
    {
        id: 12,
        name: "Burger King",
        image: "./Assets/Restraunt2..png",
        rating: 4.5,
        cuisines: ["Fast Food", "Beverages"],
        price: 500,
        location: "Old Bus Stand, Karnal",
        distance: 3.8,
        discount: 15,
        category: "delivery"
    }
];

const collectionsDB = [
    {
        title: "New in Town",
        subtitle: "Top-Places",
        image: "./Assets/Interior1.jpg"
    },
    {
        title: "Trending Now",
        subtitle: "Popular Choices",
        image: "./Assets/Interior1.jpg"
    },
    {
        title: "Premium Dining",
        subtitle: "High-End Experience",
        image: "./Assets/Interior1.jpg"
    }
];


// STATE MANAGEMENT

const state = {
    restaurants: [...restaurantsDB],
    filteredRestaurants: [...restaurantsDB],
    activeCategory: "all",
    selectedLocation: "karnal",
    searchQuery: "",
    sortBy: "trending",
    priceFilter: "",
    debounceTimer: null
};

// DOM SELECTORS
// ============================================

const dom = {
    // Navbar
    locationSelect: document.getElementById("location"),
    searchInput: document.getElementById("search-input"),
    
    // Category buttons
    categoryButtons: document.querySelectorAll(".category-btn"),
    
    // Filters
    sortSelect: document.getElementById("sort-select"),
    costFilter: document.getElementById("cost-filter"),
    resetBtn: document.getElementById("reset-filters"),
    
    // Content
    restaurantsGrid: document.getElementById("restaurants-grid"),
    collectionsGrid: document.getElementById("collections-grid"),
    emptyState: document.getElementById("empty-state"),
    loadingSpinner: document.getElementById("loading-spinner")
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to optimize search performance
 */
const debounce = (callback, delay) => {
    return (...args) => {
        clearTimeout(state.debounceTimer);
        state.debounceTimer = setTimeout(() => callback(...args), delay);
    };
};

/**
 * Calculate price range category
 */
const getPriceCategory = (price) => {
    if (price < 500) return "budget";
    if (price < 2000) return "moderate";
    return "premium";
};

/**
 * Format price with Indian rupee
 */
const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;


/**
 * Filter restaurant by search query
 */
const matchesSearch = (restaurant, query) => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    return (
        restaurant.name.toLowerCase().includes(lowerQuery) ||
        restaurant.cuisines.some(c => c.toLowerCase().includes(lowerQuery))
    );
};

// ============================================
// FILTER & SORT FUNCTIONS
// ============================================

/**
 * Apply all filters and sorts
 */
const applyFilters = () => {
    let filtered = state.restaurants.filter(restaurant => {
        // Category filter
        if (state.activeCategory !== "all" && restaurant.category !== state.activeCategory) {
            return false;
        }

        // Search filter
        if (!matchesSearch(restaurant, state.searchQuery)) {
            return false;
        }

        // Price filter
        if (state.priceFilter) {
            const priceCategory = getPriceCategory(restaurant.price);
            if (priceCategory !== state.priceFilter) {
                return false;
            }
        }

        return true;
    });

    // Apply sorting
    filtered = sortRestaurants(filtered, state.sortBy);

    state.filteredRestaurants = filtered;
    renderRestaurants();
    updateEmptyState();
};

/**
 * Sort restaurants based on selected criteria
 */
const sortRestaurants = (restaurants, sortType) => {
    const sorted = [...restaurants];

    switch (sortType) {
        case "rating-high":
            return sorted.sort((a, b) => b.rating - a.rating);
        case "rating-low":
            return sorted.sort((a, b) => a.rating - b.rating);
        case "distance":
            return sorted.sort((a, b) => a.distance - b.distance);
        case "cost-low":
            return sorted.sort((a, b) => a.price - b.price);
        case "cost-high":
            return sorted.sort((a, b) => b.price - a.price);
        case "trending":
        default:
            return sorted.sort((a, b) => b.rating - a.rating);
    }
};

// ============================================
// RENDER FUNCTIONS
// ============================================

/**
 * Render a single restaurant card
 */
const createRestaurantCard = (restaurant) => {
    const priceRange = `₹${restaurant.price} for two`;
    const discountBadge = restaurant.discount 
        ? `<div class="card__discount">Flat ${restaurant.discount}% OFF</div>`
        : "";

    return `
        <div class="card">
            <div class="card__image">
                <img 
                    src="${restaurant.image}" 
                    alt="${restaurant.name}"
                    loading="lazy"
                >
                ${discountBadge}
            </div>
            <div class="card__content">
                <div class="card__header">
                    <h3 class="card__name">${restaurant.name}</h3>
                    <span class="card__rating">${restaurant.rating} ★</span>
                </div>
                <p class="card__cuisine">${restaurant.cuisines.join(", ")}</p>
                <div class="card__meta">
                    <span class="card__price">${formatPrice(restaurant.price)}</span>
                    <span class="card__distance">${restaurant.distance} km</span>
                </div>
                <p class="card__location">📍 ${restaurant.location}</p>
            </div>
        </div>
    `;
};

/**
 * Render all restaurants
 */
const renderRestaurants = () => {
    dom.restaurantsGrid.innerHTML = state.filteredRestaurants
        .map(restaurant => createRestaurantCard(restaurant))
        .join("");

    // Add stagger animation
    const cards = dom.restaurantsGrid.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });
};

/**
 * Render collections
 */
const renderCollections = () => {
    dom.collectionsGrid.innerHTML = collectionsDB
        .map(collection => `
            <div class="collection-card">
                <img 
                    src="${collection.image}" 
                    alt="${collection.title}"
                    loading="lazy"
                >
                <div class="collection-info">
                    <h3>${collection.title}</h3>
                    <p>${collection.subtitle}</p>
                </div>
            </div>
        `)
        .join("");
};

/**
 * Show/Hide empty state
 */
const updateEmptyState = () => {
    if (state.filteredRestaurants.length === 0) {
        dom.emptyState.classList.remove("hidden");
        dom.restaurantsGrid.innerHTML = "";
    } else {
        dom.emptyState.classList.add("hidden");
    }
};

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle location change
 */
const handleLocationChange = (e) => {
    state.selectedLocation = e.target.value;
    applyFilters();
};

/**
 * Handle search input with debounce
 */
const handleSearch = debounce((e) => {
    state.searchQuery = e.target.value.trim();
    applyFilters();
}, 300);

/**
 * Handle category filter
 */
const handleCategoryClick = (e) => {
    // Remove active class from all buttons
    dom.categoryButtons.forEach(btn => btn.classList.remove("active"));

    // Add active class to clicked button
    e.currentTarget.classList.add("active");

    state.activeCategory = e.currentTarget.dataset.category;
    applyFilters();
};

/**
 * Handle sort change
 */
const handleSortChange = (e) => {
    state.sortBy = e.target.value;
    applyFilters();
};

/**
 * Handle price filter change
 */
const handlePriceFilterChange = (e) => {
    state.priceFilter = e.target.value;
    applyFilters();
};
