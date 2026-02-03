# 🚀 Creative Agency Website

Sıradışı, modern ve admin panelden tam yönetilebilir bir ajans web sitesi.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-4.0%2B-green.svg)

## ✨ Özellikler

### 🎨 Frontend
- **Modern Tasarım**: Şık ve profesyonel kullanıcı arayüzü
- **3D Animasyonlar**: Three.js ile interaktif arka plan efektleri
- **GSAP Animasyonları**: Akıcı scroll ve geçiş animasyonları
- **Responsive**: Tüm cihazlarda mükemmel görünüm
- **Özel Cursor**: Benzersiz imleç deneyimi
- **Yükleme Ekranı**: Profesyonel loader animasyonu

### 🔧 Admin Panel
- **Güvenli Giriş**: JWT tabanlı kimlik doğrulama
- **Hizmet Yönetimi**: CRUD işlemleri
- **Proje Yönetimi**: Portföy yönetimi
- **Müşteri Yorumları**: Referansları düzenleme
- **Mesaj Yönetimi**: Gelen mesajları görüntüleme
- **Site Ayarları**: SEO ve iletişim bilgileri
- **Profil Yönetimi**: Şifre değiştirme

### 🛠️ Backend
- **Node.js & Express**: Hızlı ve ölçeklenebilir API
- **MongoDB**: NoSQL veritabanı
- **REST API**: Tam kapsamlı API endpoints
- **JWT Authentication**: Güvenli token tabanlı kimlik doğrulama
- **Multer**: Dosya yükleme desteği

## 📋 Gereksinimler

- Node.js 16.0.0 veya üzeri
- MongoDB 4.0 veya üzeri
- npm veya yarn

## 🚀 Kurulum

### 1. Depoyu Klonlayın
```bash
git clone <repo-url>
cd creative-agency-website
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/creative_agency
JWT_SECRET=your_super_secret_key_here
ADMIN_EMAIL=admin@ajans.com
ADMIN_PASSWORD=admin123
```

### 4. MongoDB'yi Başlatın
```bash
# macOS/Linux
mongod

# Windows
net start MongoDB
```

### 5. Uygulamayı Başlatın
```bash
# Geliştirme modu
npm run dev

# Üretim modu
npm start
```

## 📁 Proje Yapısı

```
creative-agency-website/
├── server/
│   ├── middleware/
│   │   └── auth.js          # JWT authentication
│   ├── models/
│   │   ├── Contact.js       # Mesaj modeli
│   │   ├── Project.js       # Proje modeli
│   │   ├── Service.js       # Hizmet modeli
│   │   ├── Settings.js      # Ayarlar modeli
│   │   ├── Testimonial.js   # Referans modeli
│   │   └── User.js          # Kullanıcı modeli
│   ├── routes/
│   │   ├── auth.js          # Kimlik doğrulama route'ları
│   │   ├── contacts.js      # Mesaj route'ları
│   │   ├── projects.js      # Proje route'ları
│   │   ├── services.js      # Hizmet route'ları
│   │   ├── settings.js      # Ayarlar route'ları
│   │   ├── testimonials.js  # Referans route'ları
│   │   └── upload.js        # Dosya yükleme route'ları
│   └── server.js            # Ana sunucu dosyası
├── public/
│   ├── admin/
│   │   ├── index.html       # Admin panel ana sayfası
│   │   ├── login.html       # Admin giriş sayfası
│   │   └── admin.js         # Admin panel JavaScript
│   ├── app.js               # Ana site JavaScript
│   ├── index.html           # Ana site
│   └── ...
├── uploads/                 # Yüklenen dosyalar
├── .env                     # Ortam değişkenleri
├── .env.example             # Örnek ortam değişkenleri
├── package.json
└── README.md
```

## 🔗 Varsayılan Erişim Bilgileri

### Admin Panel
- **URL**: http://localhost:3000/admin
- **E-posta**: admin@ajans.com
- **Şifre**: admin123

### Ana Site
- **URL**: http://localhost:3000

## 📱 API Endpoints

### Auth
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | /api/auth/login | Giriş yap |
| GET | /api/auth/me | Kullanıcı bilgisi |
| POST | /api/auth/change-password | Şifre değiştir |

### Services
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | /api/services | Tüm hizmetleri getir (public) |
| GET | /api/services/admin/all | Tüm hizmetleri getir (admin) |
| POST | /api/services | Yeni hizmet ekle |
| PUT | /api/services/:id | Hizmet güncelle |
| DELETE | /api/services/:id | Hizmet sil |

### Projects
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | /api/projects | Tüm projeleri getir (public) |
| GET | /api/projects/admin/all | Tüm projeleri getir (admin) |
| POST | /api/projects | Yeni proje ekle |
| PUT | /api/projects/:id | Proje güncelle |
| DELETE | /api/projects/:id | Proje sil |

### Testimonials
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | /api/testimonials | Tüm yorumları getir |
| POST | /api/testimonials | Yeni yorum ekle |
| PUT | /api/testimonials/:id | Yorum güncelle |
| DELETE | /api/testimonials/:id | Yorum sil |

### Contacts
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | /api/contacts | Tüm mesajları getir |
| POST | /api/contacts | Yeni mesaj gönder |
| PUT | /api/contacts/:id | Mesaj durumu güncelle |
| DELETE | /api/contacts/:id | Mesaj sil |

### Settings
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | /api/settings | Site ayarlarını getir |
| PUT | /api/settings | Site ayarlarını güncelle |

## 🎨 Özelleştirme

### Renk Şeması
CSS değişkenlerini `public/index.html` dosyasındaki `:root` bölümünden değiştirebilirsiniz:

```css
:root {
    --primary: #6366f1;
    --secondary: #8b5cf6;
    --accent: #f43f5e;
    --dark: #0a0a0f;
    /* ... */
}
```

### İçerik Yönetimi
Tüm içerik admin panelden yönetilebilir:
- Hizmetler ekleme/düzenleme/silme
- Projeler ekleme/düzenleme/silme
- Müşteri yorumları yönetimi
- Site ayarları (başlık, iletişim, sosyal medya)

## 🔒 Güvenlik

- JWT tabanlı kimlik doğrulama
- Şifreler bcrypt ile hashlenir
- API istekleri authenticate edilir
- Input validasyonu
- XSS koruması

## 📸 Ekran Görüntüleri

*Yakında eklenecek*

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Sorularınız için bize ulaşın: info@creativeagency.com

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
