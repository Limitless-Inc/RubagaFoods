// Scroll-triggered animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// Menu card hover effects
const menuCards = document.querySelectorAll('.menu-card');

menuCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = contactForm.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        button.textContent = 'Message Sent! ✓';
        button.style.background = '#4caf50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// Parallax effect on hero
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroBg.style.opacity = 1 - (scrolled / heroHeight);
    }
});

// Add stagger animation to menu cards
const animateCards = () => {
    menuCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
};

// Trigger card animation when menu section is visible
const menuSection = document.querySelector('.menu');
const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCards();
            menuObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

menuObserver.observe(menuSection);

// Pork items hover effect
const porkItems = document.querySelectorAll('.pork-item');

porkItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.03)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Value items animation
const valueItems = document.querySelectorAll('.value-item');

valueItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
});

const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            valueItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transition = 'all 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            });
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

aboutObserver.observe(aboutSection);

// Add cursor effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .menu-card, .pork-item, .value-item');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// Counter animation for coffee stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

const coffeeSection = document.querySelector('.coffee');
const coffeeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('%')) {
                    stat.textContent = '0%';
                    setTimeout(() => {
                        let count = 0;
                        const interval = setInterval(() => {
                            count += 5;
                            stat.textContent = count + '%';
                            if (count >= 100) clearInterval(interval);
                        }, 30);
                    }, 300);
                }
            });
            coffeeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

coffeeObserver.observe(coffeeSection);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Schedule items fade in
const scheduleItems = document.querySelectorAll('.schedule li');
const truckSection = document.querySelector('.truck');

const truckObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            scheduleItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 100);
            });
            truckObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

truckObserver.observe(truckSection);

// Coffee menu items animation
const coffeeItems = document.querySelectorAll('.coffee-item');
const coffeeMenuObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            coffeeItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 100);
            });
            coffeeMenuObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

coffeeMenuObserver.observe(coffeeSection);

// Initialize map for pork joint location
let map, userMarker, routingControl;
const porkJointLocation = [0.4536, 33.2068];
const foodTruckLocation = [0.3476, 32.5825]; // Example truck location

window.addEventListener('load', () => {
    map = L.map('map', {
        zoomControl: true,
        attributionControl: false
    }).setView(porkJointLocation, 13);
    
    // Use Google-like tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Custom marker for pork joint
    const porkIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: linear-gradient(135deg, #d4634d, #ff6b35); width: 35px; height: 35px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 20px rgba(212, 99, 77, 0.8), 0 0 40px rgba(255, 107, 53, 0.4); display: flex; align-items: center; justify-content: center; font-size: 18px;">🥓</div>',
        iconSize: [35, 35],
        iconAnchor: [17, 17]
    });
    
    L.marker(porkJointLocation, { icon: porkIcon }).addTo(map)
        .bindPopup('<div style="background: rgba(255, 255, 255, 0.95); padding: 15px; border-radius: 12px; border: 2px solid #ff6b35; color: #0a0a0a; font-weight: 600; text-align: center; min-width: 200px;"><b style="color: #ff6b35; font-size: 16px;">🥓 RubagaFoods Pork Joint</b><br><span style="color: #666; font-size: 14px;">Jinja, City Center</span></div>');
    
    // Custom marker for food truck
    const truckIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: linear-gradient(135deg, #ff6b35, #ff8555); width: 35px; height: 35px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 20px rgba(255, 107, 53, 0.8); display: flex; align-items: center; justify-content: center; font-size: 18px;">🚚</div>',
        iconSize: [35, 35],
        iconAnchor: [17, 17]
    });
    
    L.marker(foodTruckLocation, { icon: truckIcon }).addTo(map)
        .bindPopup('<div style="background: rgba(255, 255, 255, 0.95); padding: 15px; border-radius: 12px; border: 2px solid #ff6b35; color: #0a0a0a; font-weight: 600; text-align: center; min-width: 200px;"><b style="color: #ff6b35; font-size: 16px;">🚚 Food Truck</b><br><span style="color: #666; font-size: 14px;">Currently at Tech Park</span></div>');
    
    // Get user location and add routing
    document.getElementById('getDirections').addEventListener('click', () => {
        getDirections(porkJointLocation, '🥓 Pork Joint');
    });
    
    document.getElementById('trackTruck').addEventListener('click', () => {
        getDirections(foodTruckLocation, '🚚 Food Truck');
    });
});

function getDirections(destination, destinationName) {
    const routeInfo = document.getElementById('routeInfo');
    
    if (navigator.geolocation) {
        routeInfo.innerHTML = '<p style="color: var(--accent);">📍 Getting your location...</p>';
        routeInfo.classList.add('active');
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = [position.coords.latitude, position.coords.longitude];
                
                // Remove existing route
                if (routingControl) {
                    map.removeControl(routingControl);
                }
                
                // Remove existing user marker
                if (userMarker) {
                    map.removeLayer(userMarker);
                }
                
                // Add user marker
                const userIcon = L.divIcon({
                    className: 'custom-marker',
                    html: '<div style="background: #4285f4; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(66, 133, 244, 0.6);"></div>',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                });
                
                userMarker = L.marker(userLocation, { icon: userIcon }).addTo(map)
                    .bindPopup('<div style="background: rgba(255, 255, 255, 0.95); padding: 10px; border-radius: 8px; border: 2px solid #4285f4; color: #0a0a0a; font-weight: 600; text-align: center;"><b style="color: #4285f4;">📍 Your Location</b></div>');
                
                // Calculate distance
                const distance = calculateDistance(userLocation, destination);
                const duration = Math.round((distance / 40) * 60); // Assuming 40 km/h average speed
                
                // Draw route line
                const routeLine = L.polyline([userLocation, destination], {
                    color: '#4285f4',
                    weight: 4,
                    opacity: 0.7,
                    dashArray: '10, 10'
                }).addTo(map);
                
                // Fit map to show both markers
                map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
                
                // Display route info
                routeInfo.innerHTML = `
                    <h3 style="color: var(--accent); margin-bottom: 1rem;">Route to ${destinationName}</h3>
                    <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
                        <div>
                            <p style="font-size: 2rem; font-weight: 700; color: var(--text-primary); margin: 0;">${distance.toFixed(1)} km</p>
                            <p style="color: var(--text-secondary); margin: 0;">Distance</p>
                        </div>
                        <div>
                            <p style="font-size: 2rem; font-weight: 700; color: var(--text-primary); margin: 0;">${duration} min</p>
                            <p style="color: var(--text-secondary); margin: 0;">Est. Time</p>
                        </div>
                    </div>
                    <p style="margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem;">🚗 Route shown on map</p>
                `;
            },
            (error) => {
                routeInfo.innerHTML = '<p style="color: #ff6b35;">❌ Unable to get your location. Please enable location services.</p>';
            }
        );
    } else {
        routeInfo.innerHTML = '<p style="color: #ff6b35;">❌ Geolocation is not supported by your browser.</p>';
        routeInfo.classList.add('active');
    }
}

function calculateDistance(coord1, coord2) {
    const R = 6371; // Earth's radius in km
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}
