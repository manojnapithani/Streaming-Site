// Category content data
const categoryContent = {
    action: [
        { id: 101, title: "Strike Force", type: "Movie", rating: 4.6, year: 2024, image: "strike1" },
        { id: 102, title: "Velocity", type: "Series", rating: 4.5, year: 2023, image: "velocity1" },
        { id: 103, title: "Blade Runner", type: "Movie", rating: 4.8, year: 2024, image: "blade1" },
        { id: 104, title: "Extraction", type: "Series", rating: 4.4, year: 2024, image: "extraction1" },
        { id: 105, title: "Mission Critical", type: "Movie", rating: 4.7, year: 2024, image: "mission1" },
        { id: 106, title: "Special Ops", type: "Series", rating: 4.5, year: 2023, image: "special1" }
    ],
    comedy: [
        { id: 201, title: "Laugh Track", type: "Series", rating: 4.3, year: 2024, image: "laugh1" },
        { id: 202, title: "Stand Up Special", type: "Movie", rating: 4.6, year: 2024, image: "standup1" },
        { id: 203, title: "Office Chaos", type: "Series", rating: 4.7, year: 2023, image: "office1" },
        { id: 204, title: "The Comedian", type: "Movie", rating: 4.4, year: 2024, image: "comedian1" }
    ],
    drama: [
        { id: 301, title: "The Crown", type: "Series", rating: 4.8, year: 2024, image: "crown1" },
        { id: 302, title: "Emotional Journey", type: "Movie", rating: 4.6, year: 2024, image: "emotional1" },
        { id: 303, title: "Family Ties", type: "Series", rating: 4.5, year: 2023, image: "family1" },
        { id: 304, title: "The Artist", type: "Movie", rating: 4.7, year: 2024, image: "artist1" }
    ],
    horror: [
        { id: 401, title: "Nightmare", type: "Movie", rating: 4.4, year: 2024, image: "nightmare1" },
        { id: 402, title: "Haunted House", type: "Series", rating: 4.3, year: 2024, image: "haunted1" },
        { id: 403, title: "The Curse", type: "Movie", rating: 4.5, year: 2023, image: "curse1" },
        { id: 404, title: "Dark Woods", type: "Series", rating: 4.2, year: 2024, image: "woods1" }
    ],
    scifi: [
        { id: 501, title: "Space Odyssey", type: "Movie", rating: 4.9, year: 2024, image: "space1" },
        { id: 502, title: "Future World", type: "Series", rating: 4.6, year: 2024, image: "future1" },
        { id: 503, title: "Time Travel", type: "Movie", rating: 4.7, year: 2023, image: "time1" },
        { id: 504, title: "Alien Contact", type: "Series", rating: 4.5, year: 2024, image: "alien1" }
    ],
    romance: [
        { id: 601, title: "Love Story", type: "Movie", rating: 4.5, year: 2024, image: "love1" },
        { id: 602, title: "Hearts Aligned", type: "Series", rating: 4.4, year: 2024, image: "hearts1" },
        { id: 603, title: "Summer Romance", type: "Movie", rating: 4.3, year: 2023, image: "summer1" },
        { id: 604, title: "Perfect Match", type: "Series", rating: 4.6, year: 2024, image: "perfect1" }
    ],
    documentary: [
        { id: 701, title: "Planet Earth", type: "Documentary", rating: 4.9, year: 2024, image: "planet1" },
        { id: 702, title: "History Revealed", type: "Documentary", rating: 4.7, year: 2024, image: "history1" },
        { id: 703, title: "Ocean Life", type: "Documentary", rating: 4.8, year: 2023, image: "ocean1" },
        { id: 704, title: "Space Exploration", type: "Documentary", rating: 4.6, year: 2024, image: "space2" }
    ],
    kids: [
        { id: 801, title: "Adventure Kids", type: "Series", rating: 4.5, year: 2024, image: "adventure1" },
        { id: 802, title: "Cartoon Fun", type: "Series", rating: 4.6, year: 2024, image: "cartoon1" },
        { id: 803, title: "Learning Time", type: "Series", rating: 4.4, year: 2023, image: "learning1" },
        { id: 804, title: "Magic World", type: "Movie", rating: 4.7, year: 2024, image: "magic1" }
    ]
};

// Initialize categories page
document.addEventListener('DOMContentLoaded', function() {
    setupCategoryCards();
    setupFilters();
    setupSearch();
});

// Setup category cards
function setupCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            showCategoryContent(category);
        });
    });
}

// Setup filters
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const genre = this.dataset.genre;
            filterCategories(genre);
        });
    });
}

// Filter categories
function filterCategories(genre) {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        if (genre === 'all') {
            card.style.display = 'block';
        } else {
            // This would need more sophisticated filtering based on actual content types
            card.style.display = 'block';
        }
    });
}

// Show category content
function showCategoryContent(category) {
    const content = categoryContent[category];
    if (!content) return;
    
    const titleElement = document.getElementById('categoryTitle');
    const gridElement = document.getElementById('categoryContentGrid');
    
    if (titleElement && gridElement) {
        // Update title
        const categoryNames = {
            action: 'Action & Adventure',
            comedy: 'Comedy',
            drama: 'Drama',
            horror: 'Horror & Thriller',
            scifi: 'Science Fiction',
            romance: 'Romance',
            documentary: 'Documentaries',
            kids: 'Kids & Family'
        };
        
        titleElement.textContent = categoryNames[category] || category;
        
        // Clear existing content
        gridElement.innerHTML = '';
        
        // Add new content
        content.forEach(item => {
            gridElement.appendChild(createCategoryContentCard(item));
        });
        
        // Scroll to content
        document.getElementById('categoryContentDisplay').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

// Create category content card
function createCategoryContentCard(item) {
    const card = document.createElement('div');
    card.className = 'content-card fade-in';
    card.onclick = () => playCategoryMedia(item);
    
    card.innerHTML = `
        <img src="https://picsum.photos/seed/${item.image}/300/450" alt="${item.title}">
        <div class="card-overlay">
            <h3>${item.title}</h3>
            <p>${item.type} • ${item.year} • ⭐ ${item.rating}</p>
            <div class="card-actions">
                <button onclick="event.stopPropagation(); playCategoryMedia(${JSON.stringify(item).replace(/"/g, '&quot;')})" title="Play">
                    <i class="fas fa-play"></i>
                </button>
                <button onclick="event.stopPropagation(); addToMyList(${item.id})" title="Add to List">
                    <i class="fas fa-plus"></i>
                </button>
                <button onclick="event.stopPropagation(); showCategoryInfo(${JSON.stringify(item).replace(/"/g, '&quot;')})" title="More Info">
                    <i class="fas fa-info-circle"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Play category media
function playCategoryMedia(item) {
    // Create a simple video player modal or redirect to main player
    const modal = document.createElement('div');
    modal.className = 'media-player-modal active';
    modal.innerHTML = `
        <div class="media-player-container">
            <button class="close-player" onclick="this.closest('.media-player-modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <div class="video-container">
                <video controls autoplay>
                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                </video>
            </div>
            <div class="player-info">
                <h3>${item.title}</h3>
                <p>${item.type} • ${item.year} • Rating: ${item.rating}/5</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Show category info
function showCategoryInfo(item) {
    alert(`Title: ${item.title}\nType: ${item.type}\nYear: ${item.year}\nRating: ${item.rating}/5`);
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) return;
            
            // Search through all categories
            const results = [];
            Object.keys(categoryContent).forEach(category => {
                categoryContent[category].forEach(item => {
                    if (item.title.toLowerCase().includes(query)) {
                        results.push({ ...item, category });
                    }
                });
            });
            
            // Display results (you could create a dedicated results section)
            console.log('Search results:', results);
        });
    }
}

// Add to my list (reuse from main script)
function addToMyList(id) {
    let myList = JSON.parse(localStorage.getItem('myList') || '[]');
    if (!myList.includes(id)) {
        myList.push(id);
        localStorage.setItem('myList', JSON.stringify(myList));
        showNotification('Added to My List');
    } else {
        showNotification('Already in My List');
    }
}

// Show notification (reuse from main script)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}