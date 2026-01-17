# 🍕 Zomato Clone - Modern Frontend

A production-ready **Zomato clone** built with **pure HTML + CSS + ES6 JavaScript** (zero frameworks). Perfect for portfolio, interviews, and real-world learning.

---

## ✨ Features Implemented

### 🔍 Smart Search & Filter
- **Live Search** - Search by restaurant name, cuisine, or dish (with debounce optimization)
- **City Selection** - Filter restaurants by location
- **Category Filter** - Dining Out / Delivery / Nightlife with visual feedback
- **Price Range Filter** - Budget / Moderate / Premium options
- **Active State Indicators** - Visual feedback for selected filters

### ⭐ Advanced Sorting
- **Trending** - Default (sorted by rating)
- **Rating: High to Low** - Best rated first
- **Rating: Low to High** - Find undiscovered gems
- **Distance: Near to Far** - Closest restaurants first
- **Cost: Low to High** - Budget-friendly options
- **Cost: High to Low** - Premium dining

### 🎨 Modern UX/UX
- **Sticky Navbar** - Always accessible search and navigation
- **Smooth Animations** - Card hover effects, fade-in transitions
- **Empty State Message** - Friendly feedback when no results found
- **Active Category Highlight** - Visual confirmation of selected filter
- **Lazy Loading** - Images load efficiently with `loading="lazy"`
- **Collections Section** - Curated restaurant lists

### 📱 Responsive Design
- **Mobile-First** (< 640px) - Single column, optimized touch targets
- **Tablet** (640px - 1024px) - 2-column grid layout
- **Desktop** (> 1024px) - 3+ column grid with maximum width
- **Touch Friendly** - Large click areas for mobile users
- **Dark Mode Support** - Automatic dark mode detection

### 🏗️ Architecture
- **Data-Driven** - 12 restaurants in JSON array, easy to add more
- **Modular Code** - Reusable render functions, clear separation of concerns
- **State Management** - Single source of truth for app state
- **ES6+ Modern** - Arrow functions, destructuring, template literals, const/let
- **No External Dependencies** - Pure vanilla JavaScript

---

## 🚀 Quick Start

### Installation
1. Extract the files to your project folder
2. Ensure the `Assets` folder contains the restaurant images
3. Open `index.html` in your browser

```bash
# Simply open in browser
open index.html
```

### File Structure
```
Zomato/
├── index.html          # HTML structure
├── Style.Css           # Complete styling with animations
├── Script.js           # ES6+ JavaScript logic
└── Assets/             # Images (Dining.png, Delivery.png, etc.)
```

---

## 🎯 How It Works

### HTML Structure
```html
<!-- Sticky Navigation -->
<header class="navbar">
    <search-bar> + <category-filter>
</header>

<!-- Filters & Sort -->
<div class="filters-bar">
    <sort-dropdown> + <price-filter> + <reset-button>
</div>

<!-- Collections -->
<section class="collections">
    <collection-grid>
</section>

<!-- Main Content -->
<main class="restaurants-container">
    <restaurants-grid>
</main>
```

### CSS Architecture
**CSS Variables (Dark Mode Friendly)**
```css
:root {
    --primary-red: #ef4f5f;
    --rating-green: #1fa84f;
    --text-dark: #333;
    --shadow-lg: 0 15px 30px rgba(0, 0, 0, 0.2);
    --transition-smooth: 0.3s ease;
}
```

**BEM Naming Convention**
```css
.card { /* Block */ }
.card__image { /* Element */ }
.card__rating { /* Element */ }
.card.active { /* Modifier */ }
```

### JavaScript Logic (ES6+)

**State Management**
```javascript
const state = {
    restaurants: [...],      // Original data
    filteredRestaurants: [], // After filters
    activeCategory: "all",
    searchQuery: "",
    sortBy: "trending"
};
```

**Debounced Search (Optimization)**
```javascript
const handleSearch = debounce((e) => {
    state.searchQuery = e.target.value;
    applyFilters();
}, 300); // Waits 300ms after typing stops
```

**Filter Pipeline**
```javascript
applyFilters() → filter by category
             → filter by search query
             → filter by price range
             → sort results
             → render to DOM
```

---

## 📊 Restaurant Data Schema

```javascript
{
    id: 1,
    name: "Restaurant Name",
    image: "./Assets/image.png",
    rating: 4.5,                    // 0-5 scale
    cuisines: ["North Indian", "Chinese"],
    price: 800,                     // For two people
    location: "Area, City",
    distance: 2.5,                  // In KM
    discount: 25,                   // 0 = no discount
    category: "delivery"            // "dining" | "delivery" | "nightlife"
}
```

---

## 🎮 Interactive Features

### Live Search Example
```javascript
// Searches in 300ms debounce
User types: "north" 
→ Finds all restaurants with "north" in name/cuisines
→ Returns: "P-P High Bar", "Munshi Ram & Sons", etc.
```

### Dynamic Sorting
```javascript
User selects: "Rating: High to Low"
→ Sorts: 4.7★, 4.6★, 4.5★, 4.4★, 4.3★, ...
```

### Combined Filters
```javascript
Category: "Delivery" 
+ Price: "Budget (₹0-500)" 
+ Search: "fast food"
→ Shows only budget delivery fast food restaurants
```

---

## 🔧 Customization Guide

### Add More Restaurants
Edit `Script.js` and add to `restaurantsDB` array:

```javascript
{
    id: 13,
    name: "New Restaurant",
    image: "./Assets/newimage.png",
    rating: 4.5,
    cuisines: ["Chinese", "Thai"],
    price: 1500,
    location: "New Area, City",
    distance: 3.2,
    discount: 20,
    category: "dining"
}
```

### Customize Colors
Edit `Style.Css` CSS variables:

```css
:root {
    --primary-red: #your-color;
    --rating-green: #your-color;
    --text-dark: #your-color;
}
```

### Add More Categories
1. Update `restaurantsDB` category field
2. Add button in HTML:
```html
<button class="category-btn" data-category="new-category">
    <img src="./Assets/icon.png" alt="New">
    <span>New Category</span>
</button>
```

---

## 💡 Interview Talking Points

### What This Project Demonstrates

✅ **Vanilla JavaScript Skills**
- ES6+ features (arrow functions, destructuring, template literals)
- DOM manipulation and event handling
- Array methods (filter, map, sort)
- Closure-based debounce pattern

✅ **CSS Expertise**
- Responsive design with media queries
- CSS Grid for layouts
- Animations and transitions
- CSS variables for theming
- BEM methodology

✅ **Web Design Principles**
- Mobile-first approach
- Accessibility (alt text, aria labels)
- Performance (debouncing, lazy loading)
- UX best practices (empty states, feedback)

✅ **Architecture Patterns**
- State management
- Separation of concerns
- Reusable components
- Data-driven rendering

---

## 📈 Performance Optimizations

| Feature | Benefit |
|---------|---------|
| **Debounce (300ms)** | Prevents excessive filtering during typing |
| **Lazy Loading** | Images load on-demand instead of all at once |
| **CSS Grid** | GPU-accelerated layout calculations |
| **BEM Classes** | Reduces CSS specificity issues |
| **Event Delegation** | Fewer event listeners for better memory usage |

---

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎨 Design Highlights

### Color Scheme
- **Primary Red**: `#ef4f5f` (Zomato brand)
- **Success Green**: `#1fa84f` (Rating badge)
- **Neutral Gray**: `#626262` (Text secondary)
- **Light Gray**: `#e8e8e8` (Borders)

### Typography
- **Font Family**: Segoe UI, Tahoma, Helvetica Neue
- **Font Weights**: 600 (labels), 700 (titles), 400 (body)

### Spacing
- **Padding**: 12px (small), 20px (medium), 40px (large)
- **Gap**: 10-20px between elements
- **Border Radius**: 8px (inputs), 12px (cards)

---

## 🚀 Future Enhancements

- [ ] Add Firebase backend for real restaurant data
- [ ] Implement user authentication
- [ ] Add shopping cart functionality
- [ ] Payment integration (Stripe/Razorpay)
- [ ] User reviews and ratings
- [ ] Restaurant detail page
- [ ] Favorites/Wishlist feature
- [ ] PWA support for offline mode

---

## 📝 Code Quality

### ESLint Config Recommendations
```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "indent": 4,
  "arrowParens": "always"
}
```

### Best Practices Used
- ✅ Const/Let (no var)
- ✅ Arrow functions for callbacks
- ✅ Template literals for strings
- ✅ Destructuring for object access
- ✅ Comments explaining complex logic
- ✅ Semantic HTML
- ✅ ARIA labels for accessibility

---

## 📞 Debugging Tips

### Open Console (F12)
Shows initialization message:
```
🍕 Zomato Clone initialized successfully!
📊 Total restaurants: 12
```

### Access App State (Console)
```javascript
// View current state
console.log(ZomatoApp.state);

// Manually trigger filter
ZomatoApp.applyFilters();

// Get price category
ZomatoApp.getPriceCategory(1500); // "moderate"
```

---

## 📄 License

This project is free to use for educational and portfolio purposes.

---

## 🎓 Learning Resources

### JavaScript Concepts Used
- [ES6 Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Array Filter & Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

### CSS Concepts Used
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

---

## ✨ Summary

This **Zomato Clone** demonstrates:
- **Clean Code**: Easy to read and maintain
- **Performance**: Optimized with debounce and lazy loading
- **Responsiveness**: Works seamlessly on all devices
- **Scalability**: Easy to add more restaurants and features
- **Professional**: Production-ready code quality

Perfect for **portfolio**, **interviews**, and **learning real-world web development**! 🚀
