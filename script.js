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
window.addEventListener('load', () => {
    const map = L.map('map').setView([0.4536, 33.2068], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    L.marker([0.4536, 33.2068]).addTo(map)
        .bindPopup('<b>RubagaFoods Pork Joint</b><br>Jinja, City Center')
        .openPopup();
});
