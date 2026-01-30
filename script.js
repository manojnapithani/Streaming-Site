// Sample content data
const contentData = {
    trending: [
        { id: 1, title: "Cosmic Odyssey", type: "Movie", rating: 4.8, year: 2024, image: "cosmic" },
        { id: 2, title: "Shadow Protocol", type: "Series", rating: 4.6, year: 2024, image: "shadow" },
        { id: 3, title: "The Last Frontier", type: "Movie", rating: 4.7, year: 2023, image: "frontier" },
        { id: 4, title: "Digital Dreams", type: "Series", rating: 4.5, year: 2024, image: "digital" },
        { id: 5, title: "Neon Nights", type: "Movie", rating: 4.4, year: 2023, image: "neon" },
        { id: 6, title: "Quantum Leap", type: "Series", rating: 4.9, year: 2024, image: "quantum" }
    ],
    newReleases: [
        { id: 7, title: "Midnight Run", type: "Movie", rating: 4.3, year: 2024, image: "midnight" },
        { id: 8, title: "Echo Chamber", type: "Series", rating: 4.6, year: 2024, image: "echo" },
        { id: 9, title: "Storm Rising", type: "Movie", rating: 4.5, year: 2024, image: "storm" },
        { id: 10, title: "Code Red", type: "Series", rating: 4.7, year: 2024, image: "code" },
        { id: 11, title: "Vortex", type: "Movie", rating: 4.4, year: 2024, image: "vortex" },
        { id: 12, title: "Parallel", type: "Series", rating: 4.8, year: 2024, image: "parallel" }
    ],
    continueWatching: [
        { id: 13, title: "Lost Worlds", type: "Series", progress: 65, image: "lost" },
        { id: 14, title: "Alpha Prime", type: "Movie", progress: 30, image: "alpha" },
        { id: 15, title: "Time Loop", type: "Series", progress: 85, image: "timeloop" },
        { id: 16, title: "Black Mirror", type: "Series", progress: 45, image: "mirror" }
    ],
    action: [
        { id: 17, title: "Strike Force", type: "Movie", rating: 4.6, year: 2024, image: "strike" },
        { id: 18, title: "Velocity", type: "Series", rating: 4.5, year: 2023, image: "velocity" },
        { id: 19, title: "Blade Runner", type: "Movie", rating: 4.8, year: 2024, image: "blade" },
        { id: 20, title: "Extraction", type: "Series", rating: 4.4, year: 2024, image: "extraction" }
    ]
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadContent();
    setupEventListeners();
    updateHeroSection();
    setupVideoPlayer();
});

// Load content into sections
function loadContent() {
    // Load trending content
    const trendingContainer = document.getElementById('trendingContent');
    if (trendingContainer) {
        contentData.trending.forEach(item => {
            trendingContainer.appendChild(createContentCard(item));
        });
    }

    // Load new releases
    const newReleasesContainer = document.getElementById('newReleases');
    if (newReleasesContainer) {
        contentData.newReleases.forEach(item => {
            newReleasesContainer.appendChild(createContentCard(item));
        });
    }

    // Load continue watching
    const continueContainer = document.getElementById('continueWatching');
    if (continueContainer) {
        contentData.continueWatching.forEach(item => {
            continueContainer.appendChild(createContentCard(item, true));
        });
    }

    // Load action content
    const actionContainer = document.getElementById('actionContent');
    if (actionContainer) {
        contentData.action.forEach(item => {
            actionContainer.appendChild(createContentCard(item));
        });
    }
}

// Create content card element
function createContentCard(item, hasProgress = false) {
    const card = document.createElement('div');
    card.className = 'content-card fade-in';
    card.onclick = () => playMedia(item);
    
    card.innerHTML = `
        <img src="https://picsum.photos/seed/${item.image}/300/450" alt="${item.title}">
        <div class="card-overlay">
            <h3>${item.title}</h3>
            <p>${item.type} • ${item.year || ''} ${item.rating ? '• ⭐ ' + item.rating : ''}</p>
            <div class="card-actions">
                <button onclick="event.stopPropagation(); playMedia(${JSON.stringify(item).replace(/"/g, '&quot;')})" title="Play">
                    <i class="fas fa-play"></i>
                </button>
                <button onclick="event.stopPropagation(); addToMyList(${item.id})" title="Add to List">
                    <i class="fas fa-plus"></i>
                </button>
                <button onclick="event.stopPropagation(); showInfo(${JSON.stringify(item).replace(/"/g, '&quot;')})" title="More Info">
                    <i class="fas fa-info-circle"></i>
                </button>
            </div>
            ${hasProgress ? `
                <div class="progress-bar">
                    <div class="progress-filled" style="width: ${item.progress}%"></div>
                </div>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            performSearch(e.target.value);
        });
    }

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const page = this.dataset.page;
            if (page) {
                loadPage(page);
            }
        });
    });
}

// Update hero section
function updateHeroSection() {
    const featuredContent = contentData.trending[0];
    if (featuredContent) {
        document.getElementById('heroTitle').textContent = featuredContent.title;
        document.getElementById('heroDescription').textContent = 
            `Experience the award-winning ${featuredContent.type.toLowerCase()} that has captivated millions worldwide. 
            Rating: ${featuredContent.rating}/5 • Year: ${featuredContent.year}`;
        
        const heroBg = document.getElementById('heroBg');
        if (heroBg) {
            heroBg.style.backgroundImage = `url('https://picsum.photos/seed/${featuredContent.image}/1920/1080')`;
        }
    }
}

// Play media
function playMedia(item) {
    const modal = document.getElementById('mediaPlayerModal');
    const video = document.getElementById('videoPlayer');
    const playerTitle = document.getElementById('playerTitle');
    const playerDescription = document.getElementById('playerDescription');
    
    if (modal && video) {
        modal.classList.add('active');
        playerTitle.textContent = item.title;
        playerDescription.textContent = `${item.type} • ${item.year || '2024'} • Rating: ${item.rating || '4.5'}/5`;
        
        // Reset and play video
        video.currentTime = 0;
        video.play();
        updatePlayPauseIcon();
    }
}

// Close player
function closePlayer() {
    const modal = document.getElementById('mediaPlayerModal');
    const video = document.getElementById('videoPlayer');
    
    if (modal && video) {
        video.pause();
        modal.classList.remove('active');
    }
}

// Setup video player
function setupVideoPlayer() {
    const video = document.getElementById('videoPlayer');
    const progressBar = document.querySelector('.progress-bar');
    const progressFilled = document.getElementById('progressFilled');
    const volumeSlider = document.getElementById('volumeSlider');
    
    if (video && progressBar && progressFilled) {
        // Update progress bar
        video.addEventListener('timeupdate', function() {
            const percent = (video.currentTime / video.duration) * 100;
            progressFilled.style.width = percent + '%';
            updateTimeDisplay();
        });
        
        // Click to seek
        progressBar.addEventListener('click', function(e) {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            video.currentTime = percent * video.duration;
        });
        
        // Volume control
        if (volumeSlider) {
            volumeSlider.addEventListener('input', function() {
                video.volume = this.value;
                updateVolumeIcon();
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (document.getElementById('mediaPlayerModal').classList.contains('active')) {
                switch(e.key) {
                    case ' ':
                        e.preventDefault();
                        togglePlay();
                        break;
                    case 'ArrowLeft':
                        skip(-10);
                        break;
                    case 'ArrowRight':
                        skip(10);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        changeVolume(0.1);
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        changeVolume(-0.1);
                        break;
                    case 'f':
                        toggleFullscreen();
                        break;
                    case 'Escape':
                        closePlayer();
                        break;
                }
            }
        });
    }
}

// Toggle play/pause
function togglePlay() {
    const video = document.getElementById('videoPlayer');
    if (video) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
        updatePlayPauseIcon();
    }
}

// Update play/pause icon
function updatePlayPauseIcon() {
    const video = document.getElementById('videoPlayer');
    const icon = document.getElementById('playPauseIcon');
    if (video && icon) {
        icon.className = video.paused ? 'fas fa-play' : 'fas fa-pause';
    }
}

// Skip forward/backward
function skip(seconds) {
    const video = document.getElementById('videoPlayer');
    if (video) {
        video.currentTime += seconds;
    }
}

// Toggle mute
function toggleMute() {
    const video = document.getElementById('videoPlayer');
    if (video) {
        video.muted = !video.muted;
        updateVolumeIcon();
    }
}

// Update volume icon
function updateVolumeIcon() {
    const video = document.getElementById('videoPlayer');
    const icon = document.getElementById('volumeIcon');
    const slider = document.getElementById('volumeSlider');
    
    if (video && icon && slider) {
        if (video.muted || video.volume === 0) {
            icon.className = 'fas fa-volume-mute';
        } else if (video.volume < 0.5) {
            icon.className = 'fas fa-volume-down';
        } else {
            icon.className = 'fas fa-volume-up';
        }
        slider.value = video.muted ? 0 : video.volume;
    }
}

// Change volume
function changeVolume(delta) {
    const video = document.getElementById('videoPlayer');
    const slider = document.getElementById('volumeSlider');
    if (video && slider) {
        video.volume = Math.max(0, Math.min(1, video.volume + delta));
        slider.value = video.volume;
        updateVolumeIcon();
    }
}

// Toggle fullscreen
function toggleFullscreen() {
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        if (!document.fullscreenElement) {
            videoContainer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}

// Update time display
function updateTimeDisplay() {
    const video = document.getElementById('videoPlayer');
    const display = document.getElementById('timeDisplay');
    if (video && display) {
        const current = formatTime(video.currentTime);
        const duration = formatTime(video.duration);
        display.textContent = `${current} / ${duration}`;
    }
}

// Format time
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Play featured content
function playFeatured() {
    const featured = contentData.trending[0];
    if (featured) {
        playMedia(featured);
    }
}

// Show info
function showInfo(item) {
    if (!item) {
        item = contentData.trending[0];
    }
    alert(`Title: ${item.title}\nType: ${item.type}\nYear: ${item.year || '2024'}\nRating: ${item.rating || '4.5'}/5`);
}

// Add to my list
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

// Show notification
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

// Perform search
function performSearch(query) {
    if (query.length < 2) return;
    
    const allContent = [
        ...contentData.trending,
        ...contentData.newReleases,
        ...contentData.action
    ];
    
    const results = allContent.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
    );
    
    // Display search results (you could create a dedicated search results section)
    console.log('Search results:', results);
}

// Load page (for single-page app functionality)
function loadPage(page) {
    console.log('Loading page:', page);
    // This would typically load different content based on the page
    // For this demo, we're using separate HTML files
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);