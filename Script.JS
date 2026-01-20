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
