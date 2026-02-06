// Admin Panel JavaScript
const API_URL = '';

// Check authentication
const token = localStorage.getItem('adminToken');
if (!token) {
    window.location.href = '/admin/login';
}

// Current user info
let currentUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
let currentMessageId = null;

// Initialize
let serviceFeatures = [];

document.addEventListener('DOMContentLoaded', () => {
    // Setup user info
    document.getElementById('userName').textContent = currentUser.name || 'Admin';
    document.getElementById('profileName').value = currentUser.name || '';
    document.getElementById('profileEmail').value = currentUser.email || '';

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            switchSection(section);
        });
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Service form features
    document.getElementById('serviceFeature').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addServiceFeature();
        }
    });

    // Color picker
    document.getElementById('serviceColor').addEventListener('input', (e) => {
        document.getElementById('colorValue').textContent = e.target.value;
    });

    // Load initial data
    loadDashboard();
});

// Switch section
function switchSection(section) {
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === section) {
            item.classList.add('active');
        }
    });

    // Update content
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(section + 'Section').classList.add('active');

    // Update title
    const titles = {
        dashboard: 'Dashboard',
        services: 'Hizmetler',
        projects: 'Projeler',
        testimonials: 'Müşteri Yorumları',
        posts: 'Blog Yazıları',
        pages: 'Sayfalar',
        messages: 'Gelen Mesajlar',
        settings: 'Site Ayarları',
        profile: 'Profil Ayarları'
    };
    document.getElementById('pageTitle').textContent = titles[section] || 'Dashboard';

    // Load section data
    switch(section) {
        case 'services':
            loadServices();
            break;
        case 'projects':
            loadProjects();
            break;
        case 'testimonials':
            loadTestimonials();
            break;
        case 'posts':
            loadPosts();
            break;
        case 'pages':
            loadPages();
            break;
        case 'messages':
            loadMessages();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// ==================== DASHBOARD ====================
async function loadDashboard() {
    try {
        const [services, projects, testimonials, messages] = await Promise.all([
            fetchData('/api/services/admin/all'),
            fetchData('/api/projects/admin/all'),
            fetchData('/api/testimonials/admin/all'),
            fetchData('/api/contacts')
        ]);

        document.getElementById('servicesCount').textContent = services.filter(s => s.isActive).length;
        document.getElementById('projectsCount').textContent = projects.filter(p => p.isActive).length;
        document.getElementById('testimonialsCount').textContent = testimonials.filter(t => t.isActive).length;
        
        const unreadMessages = messages.filter(m => m.status === 'new').length;
        document.getElementById('messagesCount').textContent = unreadMessages;
        document.getElementById('unreadBadge').textContent = unreadMessages;
    } catch (error) {
        console.error('Dashboard load error:', error);
    } finally {
        hideLoading();
    }
}

// ==================== SERVICES ====================
async function loadServices() {
    try {
        const services = await fetchData('/api/services/admin/all');
        const tbody = document.getElementById('servicesTable');
        
        if (services.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4">
                        <div class="empty-state">
                            <div class="empty-icon">
                                <i class="fa-solid fa-briefcase"></i>
                            </div>
                            <h3>Henüz hizmet eklenmemiş</h3>
                            <p>Yeni bir hizmet eklemek için "Yeni Hizmet" butonunu kullanın.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = services.map(service => `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 44px; height: 44px; background: ${service.color}20; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                            <i class="${service.icon}" style="color: ${service.color};"></i>
                        </div>
                        <div>
                            <div class="table-title">${service.title}</div>
                            <div class="table-desc">${service.description.substring(0, 50)}...</div>
                        </div>
                    </div>
                </td>
                <td>
                    ${service.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
                </td>
                <td>
                    <span class="status-badge ${service.isActive ? 'active' : 'inactive'}">
                        <i class="fa-solid fa-${service.isActive ? 'check' : 'xmark'}"></i>
                        ${service.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon" onclick="editService('${service._id}')" title="Düzenle">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deleteService('${service._id}')" title="Sil">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        showToast('Hata', 'Hizmetler yüklenemedi', 'error');
    }
}

function openServiceModal(serviceId = null) {
    document.getElementById('serviceId').value = serviceId || '';
    document.getElementById('serviceModalTitle').textContent = serviceId ? 'Hizmet Düzenle' : 'Yeni Hizmet';
    
    if (!serviceId) {
        document.getElementById('serviceForm').reset();
        serviceFeatures = [];
        document.getElementById('serviceColor').value = '#6366f1';
        document.getElementById('colorValue').textContent = '#6366f1';
    } else {
        // Load service data
        fetchData(`/api/services/${serviceId}`).then(service => {
            document.getElementById('serviceTitle').value = service.title;
            document.getElementById('serviceDescription').value = service.description;
            document.getElementById('serviceIcon').value = service.icon;
            document.getElementById('serviceColor').value = service.color;
            document.getElementById('colorValue').textContent = service.color;
            serviceFeatures = service.features || [];
            renderServiceFeatures();
        });
    }
    
    renderServiceFeatures();
    document.getElementById('serviceModal').classList.add('active');
}

function closeServiceModal() {
    document.getElementById('serviceModal').classList.remove('active');
}

function addServiceFeature() {
    const input = document.getElementById('serviceFeature');
    const value = input.value.trim();
    
    if (value && !serviceFeatures.includes(value)) {
        serviceFeatures.push(value);
        renderServiceFeatures();
        input.value = '';
    }
}

function removeServiceFeature(index) {
    serviceFeatures.splice(index, 1);
    renderServiceFeatures();
}

function renderServiceFeatures() {
    document.getElementById('serviceFeatures').innerHTML = serviceFeatures.map((f, i) => `
        <span class="feature-tag">
            ${f}
            <button onclick="removeServiceFeature(${i})">
                <i class="fa-solid fa-times"></i>
            </button>
        </span>
    `).join('');
}

async function saveService() {
    const id = document.getElementById('serviceId').value;
    const data = {
        title: document.getElementById('serviceTitle').value,
        description: document.getElementById('serviceDescription').value,
        icon: document.getElementById('serviceIcon').value || 'fa-solid fa-paint-brush',
        color: document.getElementById('serviceColor').value,
        features: serviceFeatures,
        isActive: true
    };

    if (!data.title || !data.description) {
        showToast('Hata', 'Lütfen gerekli alanları doldurun', 'error');
        return;
    }

    try {
        const url = id ? `/api/services/${id}` : '/api/services';
        const method = id ? 'PUT' : 'POST';
        
        await fetchData(url, method, data);
        showToast('Başarılı', id ? 'Hizmet güncellendi' : 'Hizmet oluşturuldu', 'success');
        closeServiceModal();
        loadServices();
        loadDashboard();
    } catch (error) {
        showToast('Hata', 'İşlem başarısız', 'error');
    }
}

async function editService(id) {
    openServiceModal(id);
}

async function deleteService(id) {
    if (!confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;

    try {
        await fetchData(`/api/services/${id}`, 'DELETE');
        showToast('Başarılı', 'Hizmet silindi', 'success');
        loadServices();
        loadDashboard();
    } catch (error) {
        showToast('Hata', 'Silme işlemi başarısız', 'error');
    }
}

// ==================== PROJECTS ====================
async function loadProjects() {
    try {
        const projects = await fetchData('/api/projects/admin/all');
        const tbody = document.getElementById('projectsTable');
        
        if (projects.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5">
                        <div class="empty-state">
                            <div class="empty-icon">
                                <i class="fa-solid fa-folder-open"></i>
                            </div>
                            <h3>Henüz proje eklenmemiş</h3>
                            <p>Yeni bir proje eklemek için "Yeni Proje" butonunu kullanın.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        const categories = {
            'web-design': 'Web Tasarım',
            'e-commerce': 'E-Ticaret',
            'graphic-design': 'Grafik Tasarım',
            'social-media': 'Sosyal Medya',
            'seo': 'SEO',
            'branding': 'Marka Kimliği'
        };

        tbody.innerHTML = projects.map(project => `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="${project.image || 'https://via.placeholder.com/50'}" alt="" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
                        <div>
                            <div class="table-title">${project.title}</div>
                            <div class="table-desc">${project.description.substring(0, 50)}...</div>
                        </div>
                    </div>
                </td>
                <td>${categories[project.category] || project.category}</td>
                <td>${project.client || '-'}</td>
                <td>
                    <span class="status-badge ${project.isActive ? 'active' : 'inactive'}">
                        <i class="fa-solid fa-${project.isActive ? 'check' : 'xmark'}"></i>
                        ${project.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon" onclick="editProject('${project._id}')" title="Düzenle">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deleteProject('${project._id}')" title="Sil">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        showToast('Hata', 'Projeler yüklenemedi', 'error');
    }
}

function openProjectModal(projectId = null) {
    document.getElementById('projectId').value = projectId || '';
    document.getElementById('projectModalTitle').textContent = projectId ? 'Proje Düzenle' : 'Yeni Proje';
    
    if (!projectId) {
        document.getElementById('projectForm').reset();
    } else {
        fetchData(`/api/projects/${projectId}`).then(project => {
            document.getElementById('projectTitle').value = project.title;
            document.getElementById('projectDescription').value = project.description;
            document.getElementById('projectCategory').value = project.category;
            document.getElementById('projectClient').value = project.client || '';
            document.getElementById('projectImage').value = project.image || '';
            document.getElementById('projectLink').value = project.link || '';
        });
    }
    
    document.getElementById('projectModal').classList.add('active');
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('active');
}

async function saveProject() {
    const id = document.getElementById('projectId').value;
    const data = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        category: document.getElementById('projectCategory').value,
        client: document.getElementById('projectClient').value,
        image: document.getElementById('projectImage').value,
        link: document.getElementById('projectLink').value,
        isActive: true
    };

    if (!data.title || !data.description || !data.category) {
        showToast('Hata', 'Lütfen gerekli alanları doldurun', 'error');
        return;
    }

    try {
        const url = id ? `/api/projects/${id}` : '/api/projects';
        const method = id ? 'PUT' : 'POST';
        
        await fetchData(url, method, data);
        showToast('Başarılı', id ? 'Proje güncellendi' : 'Proje oluşturuldu', 'success');
        closeProjectModal();
        loadProjects();
        loadDashboard();
    } catch (error) {
        showToast('Hata', 'İşlem başarısız', 'error');
    }
}

async function editProject(id) {
    openProjectModal(id);
}

async function deleteProject(id) {
    if (!confirm('Bu projeyi silmek istediğinize emin misiniz?')) return;

    try {
        await fetchData(`/api/projects/${id}`, 'DELETE');
        showToast('Başarılı', 'Proje silindi', 'success');
        loadProjects();
        loadDashboard();
    } catch (error) {
        showToast('Hata', 'Silme işlemi başarısız', 'error');
    }
}

// ==================== TESTIMONIALS ====================
async function loadTestimonials() {
    try {
        const testimonials = await fetchData('/api/testimonials/admin/all');
        const tbody = document.getElementById('testimonialsTable');
        
        if (testimonials.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5">
                        <div class="empty-state">
                            <div class="empty-icon">
                                <i class="fa-solid fa-comments"></i>
                            </div>
                            <h3>Henüz yorum eklenmemiş</h3>
                            <p>Yeni bir yorum eklemek için "Yeni Yorum" butonunu kullanın.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = testimonials.map(t => `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                            ${t.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div class="table-title">${t.name}</div>
                            <div class="table-desc">${t.company || ''} ${t.role ? '- ' + t.role : ''}</div>
                        </div>
                    </div>
                </td>
                <td style="max-width: 300px;">
                    <div class="table-desc" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t.content}</div>
                </td>
                <td>
                    <span style="color: #f59e0b;">${'⭐'.repeat(t.rating)}</span>
                </td>
                <td>
                    <span class="status-badge ${t.isActive ? 'active' : 'inactive'}">
                        <i class="fa-solid fa-${t.isActive ? 'check' : 'xmark'}"></i>
                        ${t.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon" onclick="editTestimonial('${t._id}')" title="Düzenle">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deleteTestimonial('${t._id}')" title="Sil">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        showToast('Hata', 'Yorumlar yüklenemedi', 'error');
    }
}

function openTestimonialModal(testimonialId = null) {
    document.getElementById('testimonialId').value = testimonialId || '';
    document.getElementById('testimonialModalTitle').textContent = testimonialId ? 'Yorum Düzenle' : 'Yeni Yorum';
    
    if (!testimonialId) {
        document.getElementById('testimonialForm').reset();
    } else {
        fetchData(`/api/testimonials/${testimonialId}`).then(t => {
            document.getElementById('testimonialName').value = t.name;
            document.getElementById('testimonialCompany').value = t.company || '';
            document.getElementById('testimonialRole').value = t.role || '';
            document.getElementById('testimonialContent').value = t.content;
            document.getElementById('testimonialRating').value = t.rating;
        });
    }
    
    document.getElementById('testimonialModal').classList.add('active');
}

function closeTestimonialModal() {
    document.getElementById('testimonialModal').classList.remove('active');
}

async function saveTestimonial() {
    const id = document.getElementById('testimonialId').value;
    const data = {
        name: document.getElementById('testimonialName').value,
        company: document.getElementById('testimonialCompany').value,
        role: document.getElementById('testimonialRole').value,
        content: document.getElementById('testimonialContent').value,
        rating: parseInt(document.getElementById('testimonialRating').value),
        isActive: true
    };

    if (!data.name || !data.content) {
        showToast('Hata', 'Lütfen gerekli alanları doldurun', 'error');
        return;
    }

    try {
        const url = id ? `/api/testimonials/${id}` : '/api/testimonials';
        const method = id ? 'PUT' : 'POST';
        
        await fetchData(url, method, data);
        showToast('Başarılı', id ? 'Yorum güncellendi' : 'Yorum oluşturuldu', 'success');
        closeTestimonialModal();
        loadTestimonials();
        loadDashboard();
    } catch (error) {
        showToast('Hata', 'İşlem başarısız', 'error');
    }
}

async function editTestimonial(id) {
    openTestimonialModal(id);
}

async function deleteTestimonial(id) {
    if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;

    try {
        await fetchData(`/api/testimonials/${id}`, 'DELETE');
        showToast('Başarılı', 'Yorum silindi', 'success');
        loadTestimonials();
        loadDashboard();
    } catch (error) {
        showToast('Hata', 'Silme işlemi başarısız', 'error');
    }
}

// ==================== MESSAGES ====================
async function loadMessages() {
    try {
        const messages = await fetchData('/api/contacts');
        const tbody = document.getElementById('messagesTable');
        
        if (messages.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5">
                        <div class="empty-state">
                            <div class="empty-icon">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <h3>Henüz mesaj yok</h3>
                            <p>Gelen mesajlar burada görünecek.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = messages.map(msg => `
            <tr style="${msg.status === 'new' ? 'background: rgba(99, 102, 241, 0.05);' : ''}">
                <td>
                    <div class="table-title">${msg.name}</div>
                    <div class="table-desc">${msg.email}</div>
                </td>
                <td>${msg.subject}</td>
                <td>${new Date(msg.createdAt).toLocaleDateString('tr-TR')}</td>
                <td>
                    <span class="status-badge ${msg.status === 'new' ? 'active' : (msg.status === 'replied' ? 'active' : 'inactive')}">
                        ${msg.status === 'new' ? 'Yeni' : (msg.status === 'replied' ? 'Yanıtlandı' : 'Okundu')}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon" onclick="viewMessage('${msg._id}')" title="Görüntüle">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deleteMessage('${msg._id}')" title="Sil">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        showToast('Hata', 'Mesajlar yüklenemedi', 'error');
    }
}

async function viewMessage(id) {
    currentMessageId = id;
    try {
        const messages = await fetchData('/api/contacts');
        const msg = messages.find(m => m._id === id);
        
        if (msg) {
            document.getElementById('msgName').textContent = msg.name;
            document.getElementById('msgEmail').textContent = msg.email;
            document.getElementById('msgPhone').textContent = msg.phone || '-';
            document.getElementById('msgSubject').textContent = msg.subject;
            document.getElementById('msgDate').textContent = new Date(msg.createdAt).toLocaleString('tr-TR');
            document.getElementById('msgMessage').textContent = msg.message;
            
            document.getElementById('messageModal').classList.add('active');
            
            // Mark as read
            if (msg.status === 'new') {
                await fetchData(`/api/contacts/${id}`, 'PUT', { status: 'read' });
                loadMessages();
                loadDashboard();
            }
        }
    } catch (error) {
        showToast('Hata', 'Mesaj yüklenemedi', 'error');
    }
}

function closeMessageModal() {
    document.getElementById('messageModal').classList.remove('active');
    currentMessageId = null;
}

async function markAsReplied() {
    if (!currentMessageId) return;
    
    try {
        await fetchData(`/api/contacts/${currentMessageId}`, 'PUT', { status: 'replied' });
        showToast('Başarılı', 'Mesaj yanıtlandı olarak işaretlendi', 'success');
        closeMessageModal();
        loadMessages();
        loadDashboard();
    } catch (error) {
        showToast('Hata', 'İşlem başarısız', 'error');
    }
}

async function deleteMessage(id) {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return;

    try {
        await fetchData(`/api/contacts/${id}`, 'DELETE');
        showToast('Başarılı', 'Mesaj silindi', 'success');
        loadMessages();
        loadDashboard();
    } catch (error) {
        showToast('Hata', 'Silme işlemi başarısız', 'error');
    }
}

// ==================== SETTINGS ====================
let currentSettings = {};

async function loadSettings() {
    try {
        const settings = await fetchData('/api/settings');
        currentSettings = settings;
        
        document.getElementById('siteTitle').value = settings.siteTitle || '';
        document.getElementById('siteDescription').value = settings.siteDescription || '';
        document.getElementById('heroTitle').value = settings.heroTitle || '';
        document.getElementById('heroSubtitle').value = settings.heroSubtitle || '';
        document.getElementById('contactEmail').value = settings.contactEmail || '';
        document.getElementById('contactPhone').value = settings.contactPhone || '';
        document.getElementById('contactAddress').value = settings.contactAddress || '';
        document.getElementById('socialFacebook').value = settings.socialMedia?.facebook || '';
        document.getElementById('socialInstagram').value = settings.socialMedia?.instagram || '';
        document.getElementById('socialTwitter').value = settings.socialMedia?.twitter || '';
        document.getElementById('socialLinkedin').value = settings.socialMedia?.linkedin || '';
    } catch (error) {
        showToast('Hata', 'Ayarlar yüklenemedi', 'error');
    }
}

async function saveSettings() {
    const data = {
        siteTitle: document.getElementById('siteTitle').value,
        siteDescription: document.getElementById('siteDescription').value,
        heroTitle: document.getElementById('heroTitle').value,
        heroSubtitle: document.getElementById('heroSubtitle').value,
        contactEmail: document.getElementById('contactEmail').value,
        contactPhone: document.getElementById('contactPhone').value,
        contactAddress: document.getElementById('contactAddress').value,
        socialMedia: {
            facebook: document.getElementById('socialFacebook').value,
            instagram: document.getElementById('socialInstagram').value,
            twitter: document.getElementById('socialTwitter').value,
            linkedin: document.getElementById('socialLinkedin').value
        }
    };

    try {
        await fetchData('/api/settings', 'PUT', data);
        showToast('Başarılı', 'Ayarlar kaydedildi', 'success');
    } catch (error) {
        showToast('Hata', 'Ayarlar kaydedilemedi', 'error');
    }
}

// ==================== PROFILE ====================
async function saveProfile() {
    const name = document.getElementById('profileName').value;
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    try {
        // Update name
        if (name !== currentUser.name) {
            // Note: This would require a user update endpoint
            currentUser.name = name;
            localStorage.setItem('adminUser', JSON.stringify(currentUser));
            document.getElementById('userName').textContent = name;
        }

        // Change password
        if (currentPassword && newPassword) {
            if (newPassword.length < 6) {
                showToast('Hata', 'Yeni şifre en az 6 karakter olmalıdır', 'error');
                return;
            }
            
            await fetchData('/api/auth/change-password', 'POST', {
                currentPassword,
                newPassword
            });
            
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            showToast('Başarılı', 'Şifre değiştirildi', 'success');
        }

        showToast('Başarılı', 'Profil güncellendi', 'success');
    } catch (error) {
        showToast('Hata', 'İşlem başarısız', 'error');
    }
}

// ==================== UTILITIES ====================
async function fetchData(url, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${url}`, options);
    
    if (response.status === 401) {
        logout();
        return;
    }

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'İstek başarısız');
    }

    return await response.json();
}

function showToast(title, message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fa-solid fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fa-solid fa-times"></i>
        </button>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
}

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// ==================== POSTS (BLOG) ====================
async function loadPosts() {
    try {
        const posts = await fetchData('/api/posts/admin/all');
        const tbody = document.getElementById('postsTable');
        
        if (!posts || posts.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6">
                        <div class="empty-state">
                            <div class="empty-icon">
                                <i class="fa-solid fa-newspaper"></i>
                            </div>
                            <h3>Henüz blog yazısı yok</h3>
                            <p>Yeni bir yazı eklemek için "Yeni Yazı" butonunu kullanın.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        const categories = {
            'web-design': 'Web Tasarım',
            'e-commerce': 'E-Ticaret',
            'seo': 'SEO',
            'social-media': 'Sosyal Medya',
            'graphic-design': 'Grafik Tasarım',
            'digital-marketing': 'Dijital Pazarlama',
            'general': 'Genel'
        };

        tbody.innerHTML = posts.map(post => `
            <tr>
                <td>
                    <div class="table-title">${post.title}</div>
                    <div class="table-desc">${post.excerpt?.substring(0, 50) || ''}...</div>
                </td>
                <td>${categories[post.category] || post.category}</td>
                <td>${new Date(post.publishedAt).toLocaleDateString('tr-TR')}</td>
                <td>${post.views || 0}</td>
                <td>
                    <span class="status-badge ${post.isPublished ? 'active' : 'inactive'}">
                        <i class="fa-solid fa-${post.isPublished ? 'check' : 'xmark'}"></i>
                        ${post.isPublished ? 'Yayında' : 'Taslak'}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon" onclick="editPost('${post._id}')" title="Düzenle">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deletePost('${post._id}')" title="Sil">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Posts load error:', error);
        showToast('Hata', 'Blog yazıları yüklenemedi', 'error');
    }
}

function openPostModal(postId = null) {
    alert(postId ? 'Yazı düzenleme modalı - ' + postId : 'Yeni yazı modalı');
    // Modal implementation would go here
}

function editPost(id) {
    openPostModal(id);
}

async function deletePost(id) {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;

    try {
        await fetchData(`/api/posts/${id}`, 'DELETE');
        showToast('Başarılı', 'Yazı silindi', 'success');
        loadPosts();
    } catch (error) {
        showToast('Hata', 'Silme işlemi başarısız', 'error');
    }
}

// ==================== PAGES ====================
async function loadPages() {
    try {
        const pages = await fetchData('/api/pages/admin/all');
        const tbody = document.getElementById('pagesTable');
        
        if (!pages || pages.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5">
                        <div class="empty-state">
                            <div class="empty-icon">
                                <i class="fa-solid fa-file-lines"></i>
                            </div>
                            <h3>Henüz sayfa yok</h3>
                            <p>Yeni bir sayfa eklemek için "Yeni Sayfa" butonunu kullanın.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = pages.map(page => `
            <tr>
                <td>
                    <div class="table-title">${page.title}</div>
                </td>
                <td>/${page.slug}</td>
                <td>
                    <span class="status-badge ${page.showInNav ? 'active' : 'inactive'}">
                        ${page.showInNav ? 'Görünür' : 'Gizli'}
                    </span>
                </td>
                <td>
                    <span class="status-badge ${page.isActive ? 'active' : 'inactive'}">
                        <i class="fa-solid fa-${page.isActive ? 'check' : 'xmark'}"></i>
                        ${page.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon" onclick="editPage('${page._id}')" title="Düzenle">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deletePage('${page._id}')" title="Sil">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Pages load error:', error);
        showToast('Hata', 'Sayfalar yüklenemedi', 'error');
    }
}

function openPageModal(pageId = null) {
    alert(pageId ? 'Sayfa düzenleme modalı - ' + pageId : 'Yeni sayfa modalı');
    // Modal implementation would go here
}

function editPage(id) {
    openPageModal(id);
}

async function deletePage(id) {
    if (!confirm('Bu sayfayı silmek istediğinize emin misiniz?')) return;

    try {
        await fetchData(`/api/pages/${id}`, 'DELETE');
        showToast('Başarılı', 'Sayfa silindi', 'success');
        loadPages();
    } catch (error) {
        showToast('Hata', 'Silme işlemi başarısız', 'error');
    }
}
