# 🚀 Render.com + Hostinger Deploy Rehberi

## 📋 Özet
- **Frontend:** Hostinger (Shared Hosting)
- **Backend:** Render.com (Ücretsiz)
- **Database:** MongoDB Atlas (Ücretsiz)

---

## Adım 1: MongoDB Atlas Kurulumu (5 dk)

1. **https://www.mongodb.com/cloud/atlas** adresine git
2. **"Try Free"** butonuna tıkla, Google hesabınla kaydol
3. **"Shared"** (ücretsiz) seç → **"Create"**
4. Ayarlar:
   - Cloud Provider: **AWS**
   - Region: **Frankfurt (eu-central-1)** (Türkiye'ye yakın)
   - Cluster Tier: **M0 Sandbox (Shared)** - Ücretsiz
   - Cluster Name: `ruya-cluster`
   - **"Create Cluster"**

5. **Security Quickstart** sayfasında:
   - Username: `ruya_admin`
   - Password: Güçlü şifre oluştur (örn: `Ruya2026Mongo!`)
   - **"Create User"**

6. **Where would you like to connect from?**
   - **"Local Environment"** seç
   - IP Address: **"Add My Current IP Address"** veya **"Allow Access from Anywhere"** (0.0.0.0/0)
   - **"Finish and Close"**

7. **Database Deployments** sayfasında:
   - Cluster'ın yanındaki **"Connect"** butonuna tıkla
   - **"Drivers"** seçeneğini seç
   - **"Node.js"** ve **"4.1 or later"** seç
   - Connection string'i kopyala:
   ```
   mongodb+srv://ruya_admin:SIFREN@ruya-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=ruya-cluster
   ```
   - **SONUNA EKLE:** `ruya_creative` database adı:
   ```
   mongodb+srv://ruya_admin:SIFREN@ruya-cluster.xxxxx.mongodb.net/ruya_creative?retryWrites=true&w=majority&appName=ruya-cluster
   ```

📌 **Bu connection string'i bir yere kaydet, lazım olacak!**

---

## Adım 2: Render.com'da Backend Deploy (10 dk)

### 2.1 GitHub'a Yükle

Önce projeyi GitHub'a yüklemelisin:

```bash
# Terminali aç, proje klasörüne git
cd /Users/grafik/Documents/123

# GitHub'da yeni repo oluştur: ruyacreative

# Git init
.git init

# Dosyaları ekle
git add .

# Commit
git commit -m "Initial commit"

# Remote ekle (kendi kullanıcı adını yaz)
git remote add origin https://github.com/KULLANICI_ADIN/ruyacreative.git

# Push
git push -u origin main
```

### 2.2 Render.com'da Web Service Oluştur

1. **https://render.com** adresine git
2. **"Get Started for Free"** → GitHub hesabınla giriş yap
3. **Dashboard**'da **"New +"** → **"Web Service"**
4. GitHub reposunu bul ve **"Connect"**

5. Ayarları doldur:
   - **Name:** `ruyacreative-api`
   - **Region:** `Frankfurt (EU Central)` (Türkiye'ye yakın)
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

6. **"Advanced"** bölümünü aç, **Environment Variables** ekle:

   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `MONGODB_URI` | `mongodb+srv://ruya_admin:SIFREN@ruya-cluster.../ruya_creative?retryWrites=true&w=majority` |
   | `JWT_SECRET` | `ruya-creative-super-secret-key-2026-bu-cok-gizli-olsun` |
   | `ADMIN_EMAIL` | `merhaba@ruyacreative.com` |
   | `ADMIN_PASSWORD` | `AdminSifren123!` |

7. **"Create Web Service"** butonuna tıkla

8. Deploy başlayacak (5-10 dk sürebilir)
   - Logları izle, hata varsa göreceksin
   - Başarılı olunca **"https://ruyacreative-api.onrender.com"** URL'i verecek

📌 **Bu URL'i kopyala: `https://ruyacreative-api.onrender.com`**

---

## Adım 3: Frontend'i Hostinger'e Yükle (15 dk)

### 3.1 API URL'lerini Güncelle

Projedeki dosyalarda API URL'lerini değiştirmelisin:

**Dosya: `public/js/common.js`**
```javascript
// ESKİ:
const API_URL = '';

// YENİ:
const API_URL = 'https://ruyacreative-api.onrender.com';
```

**Dosya: `public/admin/admin.js`**
```javascript
// ESKİ:
const API_URL = '';

// YENİ:
const API_URL = 'https://ruyacreative-api.onrender.com';
```

**Dosya: `public/app.js`** (varsa)
```javascript
// ESKİ:
const API_URL = '';

// YENİ:
const API_URL = 'https://ruyacreative-api.onrender.com';
```

### 3.2 Dosyaları Hostinger'e Yükle

1. **FileZilla** veya **WinSCP** indir (ücretsiz)
2. Hostinger paneline gir → **Hosting** → **Advanced** → **FTP Accounts**
3. FTP bilgilerini al:
   - Host: `ftp.ruyacreative.com` veya IP
   - Username: Hostinger'den aldığın kullanıcı adı
   - Password: Hostinger'den aldığın şifre
   - Port: `21`

4. FileZilla'ya bağlan:
   - Host: `ftp.ruyacreative.com`
   - Username: `kullanici@ruyacreative.com`
   - Password: şifren
   - Port: `21`
   - **Quickconnect**

5. **Sağ taraf (Remote):** `public_html` klasörüne gir
6. **Sol taraf (Local):** `/Users/grafik/Documents/123/public` klasörünü aç

7. **public klasöründeki HER ŞEYİ** public_html'e sürükle-bırak:
   - `index.html`
   - `css/` klasörü
   - `js/` klasörü
   - `pages/` klasörü
   - `partials/` klasörü
   - `images/` klasörü (varsa)

8. Transfer tamamlanana kadar bekle

---

## Adım 4: Admin Panel ve Ayarlar

### Admin Girişi
- URL: `https://ruyacreative.com/admin`
- Email: `merhaba@ruyacreative.com`
- Password: Render'da belirlediğin şifre

### İlk Kurulum
1. Admin panelden **Site Ayarları**'na git
2. Aşağıdaki bilgileri gir:
   - Site Başlığı: `Rüya Creative`
   - Site Açıklaması: `Dijital çözümler sunan yaratıcı ajans`
   - E-posta: `merhaba@ruyacreative.com`
   - Telefon: `+90 506 095 08 35`
   - Adres: `Konak, İzmir`
   - Sosyal Medya linklerini ekle

3. **Kaydet**

---

## 🎉 BİTTİ! Test Et

1. Ana site: `https://ruyacreative.com`
2. Admin panel: `https://ruyacreative.com/admin`
3. API: `https://ruyacreative-api.onrender.com`

---

## ⚠️ ÖNEMLİ NOTLAR

### 1. Ücretsiz Render.com Sınırlamaları
- **Uyku Modu:** 15 dakika kullanılmazsa uykuya geçer
- **İlk Açılış:** Uyandığında 30-50 saniye gecikme olabilir
- **Sonra:** Normal hızda çalışır
- **Aylık Limit:** 750 saat (yeterli)

### 2. MongoDB Atlas Sınırlamaları
- **Depolama:** 512MB (yeterli)
- **Bağlantı:** Sınırsız

### 3. Hostinger
- Eğer **"Index of"** hatası alırsan:
  - `public_html` klasöründe `index.html` olduğundan emin ol
  - Hostinger panelden **"Fix File Permissions"** yap

---

## 🆘 HATA ÇÖZÜMLERİ

### "Cannot connect to API"
```
→ public/js/common.js dosyasındaki API_URL'i kontrol et
→ Render.com'da servis çalışıyor mu kontrol et (dashboard)
→ MongoDB Atlas IP adresini kontrol et (0.0.0.0/0 yap)
```

### "Admin panel açılmıyor"
```
→ public/admin/admin.js dosyasındaki API_URL'i kontrol et
→ Render.com environment variables kontrol et
→ JWT_SECRET dolu mu kontrol et
```

### "Resimler yüklenmiyor"
```
→ public_html/images klasörüne yüklendiğinden emin ol
→ Büyük harf küçük harf duyarlı (IMAGE.jpg ≠ image.jpg)
```

---

## 📞 Yardım Lazım mı?

Herhangi bir adımda takılırsan:
1. Hata mesajını kopyala
2. Hangi adımda olduğunu söyle
3. Çözüm bulalım!

Kolay gelsin kanka! 🚀
