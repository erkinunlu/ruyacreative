// ✨ ULTRA PREMIUM COMMON JAVASCRIPT ✨

const API_URL = "https://ruyacreative-api.onrender.com";

// ✨ MAGNETIC CURSOR SYSTEM ✨
class MagneticCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursorDot = document.createElement('div');
        this.cursor.className = 'cursor';
        this.cursorDot.className = 'cursor-dot';
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.dotX = 0;
        this.dotY = 0;
        
        this.isTouch = window.matchMedia('(pointer: coarse)').matches;
        
        if (!this.isTouch) {
            this.init();
        } else {
            this.cursor.style.display = 'none';
            this.cursorDot.style.display = 'none';
        }
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('click');
        });
        
        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('click');
        });
        
        // Magnetic effect on buttons
        document.querySelectorAll('a, button, .btn-primary, .btn-secondary').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
            
            // Magnetic pull effect
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
        
        this.animate();
    }
    
    animate() {
        if (this.isTouch) return;
        
        // Smooth cursor following
        this.cursorX += (this.mouseX - this.cursorX) * 0.15;
        this.cursorY += (this.mouseY - this.cursorY) * 0.15;
        this.dotX += (this.mouseX - this.dotX) * 0.5;
        this.dotY += (this.mouseY - this.dotY) * 0.5;
        
        this.cursor.style.left = this.cursorX - 10 + 'px';
        this.cursor.style.top = this.cursorY - 10 + 'px';
        this.cursorDot.style.left = this.dotX - 2 + 'px';
        this.cursorDot.style.top = this.dotY - 2 + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
}

// ✨ TEXT REVEAL ANIMATION ✨
class TextReveal {
    constructor(element, type = 'words') {
        this.element = element;
        this.type = type;
        this.init();
    }
    
    init() {
        const text = this.element.textContent;
        this.element.innerHTML = '';
        
        if (this.type === 'chars') {
            text.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(100%)';
                span.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.03}s`;
                this.element.appendChild(span);
            });
        } else if (this.type === 'words') {
            text.split(' ').forEach((word, i) => {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(50px)';
                span.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1}s`;
                this.element.appendChild(span);
            });
        }
        
        // Trigger animation
        setTimeout(() => {
            Array.from(this.element.children).forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        }, 100);
    }
}

// ✨ 3D TILT CARD ✨
class TiltCard {
    constructor(element) {
        this.element = element;
        this.init();
    }
    
    init() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    }
}

// ✨ PARALLAX EFFECT ✨
class ParallaxElement {
    constructor(element, speed = 0.5) {
        this.element = element;
        this.speed = speed;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * this.speed;
            this.element.style.transform = `translateY(${rate}px)`;
        });
    }
}

// ✨ PARTICLE SYSTEM ✨
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            particleCount: options.particleCount || 50,
            color: options.color || '#6366f1',
            size: options.size || { min: 2, max: 5 },
            speed: options.speed || { min: 0.5, max: 2 }
        };
        this.particles = [];
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.options.particleCount; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        const size = Math.random() * (this.options.size.max - this.options.size.min) + this.options.size.min;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${this.options.color};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            transition: transform 0.5s ease-out;
        `;
        
        this.container.appendChild(particle);
        
        const speed = Math.random() * (this.options.speed.max - this.options.speed.min) + this.options.speed.min;
        const angle = Math.random() * Math.PI * 2;
        
        const animate = () => {
            const rect = particle.getBoundingClientRect();
            let x = parseFloat(particle.style.left);
            let y = parseFloat(particle.style.top);
            
            x += Math.cos(angle) * speed * 0.1;
            y += Math.sin(angle) * speed * 0.1;
            
            if (x < 0) x = 100;
            if (x > 100) x = 0;
            if (y < 0) y = 100;
            if (y > 100) y = 0;
            
            particle.style.left = x + '%';
            particle.style.top = y + '%';
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// ✨ SCROLL PROGRESS BAR ✨
class ScrollProgress {
    constructor() {
        this.progressBar = document.createElement('div');
        this.progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
            z-index: 10000;
            transition: width 0.1s;
            box-shadow: 0 0 10px var(--primary-glow);
        `;
        document.body.appendChild(this.progressBar);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            this.progressBar.style.width = scrolled + '%';
        });
    }
}

// ✨ INTERSECTION OBSERVER FOR ANIMATIONS ✨
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Counter animation
                    if (entry.target.querySelector('[data-count]')) {
                        this.animateCounter(entry.target.querySelector('[data-count]'));
                    }
                }
            });
        }, this.observerOptions);
        
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            observer.observe(el);
        });
    }
    
    animateCounter(counter) {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    }
}

// ✨ LOAD NAVBAR AND FOOTER ✨
async function loadPartials() {
    // Load navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        try {
            const response = await fetch('/partials/navbar.html');
            const html = await response.text();
            navbarContainer.innerHTML = html;
            initNavbar();
        } catch (error) {
            console.error('Failed to load navbar:', error);
        }
    }

    // Load footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        try {
            const response = await fetch('/partials/footer.html');
            const html = await response.text();
            footerContainer.innerHTML = html;
            loadFooterSettings();
        } catch (error) {
            console.error('Failed to load footer:', error);
        }
    }
}

// ✨ NAVBAR INITIALIZATION ✨
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    if (!navbar) return;

    // Scroll effect with glassmorphism
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu
    if (mobileMenuBtn && mobileMenu && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
        });

        mobileMenuOverlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
            });
        });
    }

    // Set active nav link with animation
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// ✨ GSAP ANIMATIONS ✨
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Parallax effect
    gsap.utils.toArray('.parallax').forEach(element => {
        gsap.to(element, {
            yPercent: 50,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Stagger animations
    gsap.utils.toArray('.stagger-container').forEach(container => {
        gsap.from(container.children, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: container,
                start: 'top 80%'
            }
        });
    });
}

// ✨ FOOTER SETTINGS ✨
async function loadFooterSettings() {
    try {
        const response = await fetch('/api/settings');
        const settings = await response.json();

        const emailEl = document.getElementById('footerEmail');
        if (emailEl && settings.contactEmail) {
            emailEl.textContent = settings.contactEmail;
            emailEl.href = `mailto:${settings.contactEmail}`;
        }

        const phoneEl = document.getElementById('footerPhone');
        if (phoneEl && settings.contactPhone) {
            phoneEl.textContent = settings.contactPhone;
            phoneEl.href = `tel:${settings.contactPhone}`;
        }

        const addressEl = document.getElementById('footerAddress');
        if (addressEl && settings.contactAddress) {
            addressEl.textContent = settings.contactAddress;
        }

        const socialContainer = document.getElementById('footerSocialLinks');
        if (socialContainer && settings.socialMedia) {
            const socials = [
                { name: 'facebook', icon: 'fa-facebook-f' },
                { name: 'instagram', icon: 'fa-instagram' },
                { name: 'twitter', icon: 'fa-x-twitter' },
                { name: 'linkedin', icon: 'fa-linkedin-in' },
                { name: 'youtube', icon: 'fa-youtube' }
            ];

            socialContainer.innerHTML = socials
                .filter(s => settings.socialMedia[s.name])
                .map(s => `
                    <a href="${settings.socialMedia[s.name]}" class="social-link" target="_blank" rel="noopener">
                        <i class="fa-brands ${s.icon}"></i>
                    </a>
                `).join('');
        }
    } catch (error) {
        console.log('Using default footer settings');
    }
}

// ✨ TOAST NOTIFICATION ✨
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: white;
        border-radius: 12px;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    toast.innerHTML = `
        <i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// ✨ SMOOTH SCROLL ✨
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ✨ INITIALIZE EVERYTHING ✨
document.addEventListener('DOMContentLoaded', () => {
    // Load partials
    loadPartials();
    
    // Initialize premium features
    new MagneticCursor();
    new ScrollProgress();
    new ScrollAnimations();
    initGSAPAnimations();
    
    // Initialize tilt cards
    document.querySelectorAll('.tilt-card').forEach(card => {
        new TiltCard(card);
    });
    
    // Initialize text reveals
    document.querySelectorAll('.text-reveal').forEach(el => {
        new TextReveal(el);
    });
});

// ✨ EXPORT FUNCTIONS ✨
window.showToast = showToast;
window.TextReveal = TextReveal;
window.TiltCard = TiltCard;
window.ParticleSystem = ParticleSystem;

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
