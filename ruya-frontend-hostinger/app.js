// ✨ ULTRA PREMIUM MAIN APPLICATION ✨

// API_URL common.js'den geliyor, tekrar tanımlama

// DOM Elements
const cursor = document.getElementById('cursor');
const loader = document.getElementById('loader');
const loaderProgress = document.getElementById('loaderProgress');
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const magicBg = document.getElementById('magicBg');

// ✨ MAGIC PARTICLE BACKGROUND ✨
function initMagicBackground() {
    if (!magicBg) return;
    
    const colors = ['#6366f1', '#8b5cf6', '#f43f5e', '#14b8a6', '#f59e0b'];
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';
        
        const size = Math.random() * 6 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 15}s;
            animation-duration: ${15 + Math.random() * 10}s;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        
        magicBg.appendChild(particle);
    }
}

// ==========================================
// LOADER
// ==========================================
window.addEventListener('load', () => {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    initAnimations();
                    // loadServices() loadData() içinde çağrılıyor
                }, 500);
            }, 300);
        }
        loaderProgress.style.width = progress + '%';
    }, 100);
});

// ==========================================
// LOAD SERVICES FROM API
// ==========================================
async function loadServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    console.log('🚀 loadServices çalıştı, servicesGrid:', servicesGrid);
    if (!servicesGrid) return;
    
    try {
        console.log('📡 API çağrılıyor:', `${API_URL}/api/services`);
        const response = await fetch(`${API_URL}/api/services`);
        console.log('✅ API yanıtı:', response.status);
        const services = await response.json();
        console.log('📦 Hizmetler:', services.length, 'adet');
        
        if (services.length === 0) {
            servicesGrid.innerHTML = '<p class="text-center" style="grid-column: 1/-1; color: var(--text-muted);">Henüz hizmet eklenmemiş.</p>';
            return;
        }
        
        servicesGrid.innerHTML = services.slice(0, 6).map(service => {
            // Generate slug from title if not exists
            const slug = service.slug || service.title.toLowerCase()
                .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
            
            // Get description
            const desc = service.shortDescription || 
                        (service.description ? service.description.substring(0, 100) : '') || 
                        '';
            
            return `
            <a href="/hizmetler/${slug}" class="service-card reveal">
                <div class="service-icon" style="background: linear-gradient(135deg, ${service.color || '#6366f1'}, ${service.color2 || '#8b5cf6'}); color: white;">
                    <i class="${service.icon || 'fa-solid fa-star'}"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${desc}</p>
                <span class="service-link">Detaylı Bilgi <i class="fa-solid fa-arrow-right"></i></span>
            </a>
            `;
        }).join('');
        
        // Re-initialize animations for new elements
        setTimeout(() => {
            ScrollTrigger.batch('.service-card', {
                onEnter: (elements) => {
                    gsap.to(elements, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out'
                    });
                },
                start: 'top 85%'
            });
        }, 100);
        
    } catch (error) {
        console.error('Hizmetler yüklenirken hata:', error);
        servicesGrid.innerHTML = '<p class="text-center" style="grid-column: 1/-1; color: var(--text-muted);">Hizmetler yüklenemedi.</p>';
    }
}

// ==========================================
// CUSTOM CURSOR
// ==========================================
if (window.matchMedia('(pointer: fine)').matches && cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    document.querySelectorAll('a, button, .service-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==========================================
// MOBILE MENU
// ==========================================
if (mobileMenuBtn && mobileMenu && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
    });

    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
    });

    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        });
    });
}

// ==========================================
// THREE.JS HERO BACKGROUND
// ==========================================
function initThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating shapes
    const shapes = [];
    const shapeGeometry = new THREE.IcosahedronGeometry(0.3, 0);
    
    for (let i = 0; i < 5; i++) {
        const material = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0x6366f1 : 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const shape = new THREE.Mesh(shapeGeometry, material);
        shape.position.set(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
        );
        shape.userData = {
            speedX: (Math.random() - 0.5) * 0.002,
            speedY: (Math.random() - 0.5) * 0.002,
            rotSpeed: (Math.random() - 0.5) * 0.01
        };
        shapes.push(shape);
        scene.add(shape);
    }

    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    let animationId;
    function animate() {
        animationId = requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.0003;
        particlesMesh.rotation.y += 0.0005;

        shapes.forEach(shape => {
            shape.rotation.x += shape.userData.rotSpeed;
            shape.rotation.y += shape.userData.rotSpeed;
            shape.position.x += shape.userData.speedX;
            shape.position.y += shape.userData.speedY;

            if (Math.abs(shape.position.x) > 4) shape.userData.speedX *= -1;
            if (Math.abs(shape.position.y) > 3) shape.userData.speedY *= -1;
        });

        // Subtle camera movement based on mouse
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Cleanup on visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// ==========================================
// GSAP ANIMATIONS
// ==========================================
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero text animation - check if elements exist
    if (document.querySelector('.hero-title .word')) {
        gsap.to('.hero-title .word', {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out'
        });
    }

    if (document.querySelector('.hero-desc')) {
        gsap.to('.hero-desc', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.5,
            ease: 'power3.out'
        });
    }

    if (document.querySelector('.hero-buttons')) {
        gsap.to('.hero-buttons', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.7,
            ease: 'power3.out'
        });
    }

    // Stats animation - check if elements exist
    if (document.querySelector('.stat-item')) {
        gsap.to('.stat-item', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 1,
            ease: 'power3.out',
            onComplete: animateCounters
        });
    }

    // Scroll reveal animations
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        reveals.forEach((el, i) => {
            gsap.fromTo(el, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }

    // Service cards and project cards animations are handled in loadServices() and renderProjects()
}

// ==========================================
// COUNTER ANIMATION
// ==========================================
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
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
    });
}

// ==========================================
// LOAD DATA FROM API
// ==========================================
async function loadData() {
    try {
        // Load settings
        const settings = await fetchData('/api/settings');
        applySettings(settings);

        // Load services - use loadServices instead of renderServices
        await loadServices();

        // Load projects
        const projects = await fetchData('/api/projects');
        renderProjects(projects);

        // Load testimonials
        const testimonials = await fetchData('/api/testimonials');
        renderTestimonials(testimonials);
    } catch (error) {
        console.error('Error loading data:', error);
        // Use default/fallback data
        renderDefaultData();
    }
}

async function fetchData(url) {
    const response = await fetch(`${API_URL}${url}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

function applySettings(settings) {
    if (settings.siteTitle) {
        document.title = settings.siteTitle;
    }
    
    if (settings.heroTitle) {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = `
                <span class="line"><span class="word">${settings.heroTitle.split(' ').slice(0, -2).join(' ')}</span></span>
                <span class="line"><span class="word gradient">${settings.heroTitle.split(' ').slice(-2).join(' ')}</span></span>
            `;
        }
    }
    
    if (settings.heroSubtitle) {
        const heroDesc = document.querySelector('.hero-desc');
        if (heroDesc) heroDesc.textContent = settings.heroSubtitle;
    }
    
    if (settings.contactEmail) {
        const contactEmailDisplay = document.getElementById('contactEmailDisplay');
        const footerEmail = document.getElementById('footerEmail');
        if (contactEmailDisplay) contactEmailDisplay.textContent = settings.contactEmail;
        if (footerEmail) {
            footerEmail.textContent = settings.contactEmail;
            footerEmail.href = `mailto:${settings.contactEmail}`;
        }
    }
    
    if (settings.contactPhone) {
        const contactPhoneDisplay = document.getElementById('contactPhoneDisplay');
        const footerPhone = document.getElementById('footerPhone');
        if (contactPhoneDisplay) contactPhoneDisplay.textContent = settings.contactPhone;
        if (footerPhone) {
            footerPhone.textContent = settings.contactPhone;
            footerPhone.href = `tel:${settings.contactPhone}`;
        }
    }
    
    if (settings.contactAddress) {
        const contactAddressDisplay = document.getElementById('contactAddressDisplay');
        const footerAddress = document.getElementById('footerAddress');
        if (contactAddressDisplay) contactAddressDisplay.textContent = settings.contactAddress;
        if (footerAddress) footerAddress.textContent = settings.contactAddress;
    }

    // Social links
    const socialContainer = document.getElementById('socialLinks');
    if (settings.socialMedia) {
        const socials = [
            { name: 'facebook', icon: 'fa-facebook-f' },
            { name: 'instagram', icon: 'fa-instagram' },
            { name: 'twitter', icon: 'fa-twitter' },
            { name: 'linkedin', icon: 'fa-linkedin-in' },
            { name: 'youtube', icon: 'fa-youtube' }
        ];

        socialContainer.innerHTML = socials
            .filter(s => settings.socialMedia[s.name])
            .map(s => `
                <a href="${settings.socialMedia[s.name]}" class="social-link" target="_blank">
                    <i class="fa-brands ${s.icon}"></i>
                </a>
            `).join('');
    }
}

function renderServices(services) {
    const container = document.getElementById('servicesGrid');
    if (!container) return;
    
    container.innerHTML = services.slice(0, 6).map((service, index) => {
        // Generate slug from title if not exists
        const slug = service.slug || service.title.toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        
        // Get description
        const desc = service.shortDescription || 
                    (service.description ? service.description.substring(0, 100) : '') || 
                    '';
        
        return `
        <a href="/hizmetler/${slug}" class="service-card reveal">
            <div class="service-icon" style="background: linear-gradient(135deg, ${service.color || '#6366f1'}, ${service.color2 || '#8b5cf6'}); color: white;">
                <i class="${service.icon || 'fa-solid fa-star'}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${desc}</p>
            <span class="service-link">Detaylı Bilgi <i class="fa-solid fa-arrow-right"></i></span>
        </a>
        `;
    }).join('');
}

function renderProjects(projects) {
    const container = document.getElementById('projectsGrid');
    if (!container) return; // Element yoksa çık
    
    const categories = {
        'web-design': 'Web Tasarım',
        'e-commerce': 'E-Ticaret',
        'graphic-design': 'Grafik Tasarım',
        'social-media': 'Sosyal Medya',
        'seo': 'SEO',
        'branding': 'Marka Kimliği'
    };

    container.innerHTML = projects.map(project => `
        <div class="project-card" data-category="${project.category}">
            <img src="${project.image || 'https://via.placeholder.com/600x400'}" alt="${project.title}" class="project-image">
            <div class="project-overlay">
                <span class="project-category">${categories[project.category] || project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description.substring(0, 100)}...</p>
            </div>
        </div>
    `).join('');

    // Initialize filter
    initProjectFilter();
}

function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    gsap.fromTo(card, 
                        { opacity: 0, scale: 0.9 },
                        { opacity: 1, scale: 1, duration: 0.4 }
                    );
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function renderTestimonials(testimonials) {
    const container = document.getElementById('testimonialsSlider');
    
    if (testimonials.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Henüz yorum bulunmuyor.</p>';
        return;
    }

    let currentIndex = 0;

    function showTestimonial(index) {
        const t = testimonials[index];
        container.innerHTML = `
            <div class="testimonial-item">
                <p class="testimonial-quote">${t.content}</p>
                <div class="testimonial-author">
                    <div class="author-avatar">${t.name.charAt(0).toUpperCase()}</div>
                    <div class="author-info">
                        <div class="author-name">${t.name}</div>
                        <div class="author-role">${t.company || ''} ${t.role ? '- ' + t.role : ''}</div>
                        <div class="testimonial-rating">${'⭐'.repeat(t.rating)}</div>
                    </div>
                </div>
            </div>
        `;

        gsap.fromTo('.testimonial-item', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6 }
        );
    }

    showTestimonial(0);

    // Auto rotate
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

function renderDefaultData() {
    // Default services
    const defaultServices = [
        {
            title: 'Web Tasarım',
            description: 'Modern, responsive ve kullanıcı dostu web siteleri tasarlıyoruz.',
            icon: 'fa-solid fa-laptop-code',
            color: '#6366f1',
            features: ['Responsive', 'SEO Uyumlu', 'Hızlı']
        },
        {
            title: 'E-Ticaret',
            description: 'Satışlarınızı artıracak profesyonel e-ticaret çözümleri.',
            icon: 'fa-solid fa-shopping-cart',
            color: '#8b5cf6',
            features: ['Ödeme Sistemi', 'Stok Yönetimi', 'Raporlama']
        },
        {
            title: 'Grafik Tasarım',
            description: 'Markanızı öne çıkaracak yaratıcı grafik tasarım çalışmaları.',
            icon: 'fa-solid fa-palette',
            color: '#ec4899',
            features: ['Logo', 'Kurumsal Kimlik', 'Sosyal Medya']
        }
    ];

    renderServices(defaultServices);

    // Default projects
    const defaultProjects = [
        { title: 'E-Ticaret Sitesi', description: 'Modern e-ticaret platformu', category: 'e-commerce', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600' },
        { title: 'Kurumsal Web Sitesi', description: 'Profesyonel kurumsal site', category: 'web-design', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600' },
        { title: 'Marka Kimliği', description: 'Kapsamlı marka çalışması', category: 'graphic-design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600' }
    ];

    renderProjects(defaultProjects);
}

// ==========================================
// CONTACT FORM
// ==========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gönderiliyor...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(`${API_URL}/api/contacts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showNotification('Mesajınız başarıyla gönderildi!', 'success');
            form.reset();
        } else {
            throw new Error('Gönderim başarısız');
        }
    } catch (error) {
        showNotification('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#22c55e' : '#ef4444'};
        color: white;
        border-radius: 12px;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyle);

// ==========================================
// SMOOTH SCROLL
// ==========================================
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

// ==========================================
// INITIALIZE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initMagicBackground();
    initThreeJS();
    loadData();
});
