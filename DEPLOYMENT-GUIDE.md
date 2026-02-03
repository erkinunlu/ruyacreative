# 🚀 Rüya Creative - Canlıya Alma Rehberi

## 📋 Gereksinimler

- Hostinger hesabı (VPS/Cloud önerilir)
- Domain: ruyacreative.com
- MongoDB Atlas hesabı (ücretsiz)
- FileZilla veya WinSCP (FTP/SFTP için)

---

## 🎯 SEÇENEK 1: Hostinger VPS/Cloud Hosting (Tavsiye)

### Adım 1: MongoDB Atlas Kurulumu

1. https://www.mongodb.com/cloud/atlas adresine git
2. Ücretsiz hesap oluştur
3. "Build a Database" → "Shared" (ücretsiz) seç
4. Cloud Provider: AWS, Region: Frankfurt (eu-central-1)
5. Database oluştur
6. **Database Access** → "Add New Database User"
   - Username: `ruya_admin`
   - Password: Güçlü bir şifre oluştur
7. **Network Access** → "Add IP Address" → "Allow Access from Anywhere" (0.0.0.0/0)
8. **Clusters** → "Connect" → "Connect your application"
   - Connection string'i kopyala:
   ```
   mongodb+srv://ruya_admin:SIFREN@cluster0.xxx.mongodb.net/ruya_creative?retryWrites=true&w=majority
   ```

### Adım 2: Hostinger VPS Kurulumu

1. Hostinger panelden **VPS** veya **Cloud Hosting** satın al
2. Operating System: **Ubuntu 20.04/22.04 LTS** seç
3. SSH ile bağlan:
   ```bash
   ssh root@SUNUCU_IP_ADRESI
   ```

### Adım 3: Sunucu Kurulumu

```bash
# Sistem güncelleme
apt update && apt upgrade -y

# Node.js kurulumu
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# PM2 kurulumu (process manager)
npm install -g pm2

# Nginx kurulumu
apt install nginx -y

# Git kurulumu
apt install git -y
```

### Adım 4: Proje Yükleme

```bash
# Proje dizini oluştur
mkdir -p /var/www/ruyacreative
cd /var/www/ruyacreative

# GitHub'dan çek (eğer varsa) VEYA manuel yükle
git clone https://github.com/kullanici/ruyacreative.git .

# YA da bilgisayarından FileZilla ile /var/www/ruyacreative dizinine yükle

# Bağımlılıkları kur
cd /var/www/ruyacreative
npm install
```

### Adım 5: Environment Ayarları

```bash
# .env dosyası oluştur
nano /var/www/ruyacreative/.env
```

İçeriği şu şekilde doldur:
```env
PORT=3000
MONGODB_URI=mongodb+srv://ruya_admin:SIFREN@cluster0.xxx.mongodb.net/ruya_creative?retryWrites=true&w=majority
JWT_SECRET=ruya_creative_super_secret_key_2026_change_this
ADMIN_EMAIL=merhaba@ruyacreative.com
ADMIN_PASSWORD=GucluSifre123!
```

### Adım 6: PM2 ile Başlatma

```bash
cd /var/www/ruyacreative

# Uygulamayı PM2 ile başlat
pm2 start server/server.js --name "ruyacreative"

# Otomatik başlatma ayarı
pm2 startup
pm2 save

# Logları gör
pm2 logs ruuyacreative
```

### Adım 7: Nginx Yapılandırması

```bash
nano /etc/nginx/sites-available/ruyacreative
```

İçeriği yapıştır:
```nginx
server {
    listen 80;
    server_name ruyacreative.com www.ruyacreative.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Aktif et:
```bash
ln -s /etc/nginx/sites-available/ruyacreative /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Adım 8: SSL (HTTPS) Kurulumu

```bash
# Certbot kurulumu
apt install certbot python3-certbot-nginx -y

# SSL sertifikası al
certbot --nginx -d ruyacreative.com -d www.ruyacreative.com

# Otomatik yenileme testi
certbot renew --dry-run
```

### Adım 9: Domain Ayarları

1. Hostinger domain yönetimine git
2. DNS Zone Editor'a gir
3. A kaydı ekle:
   - Name: @
   - Points to: VPS_IP_ADRESI
   - TTL: 14400

4. www için CNAME kaydı:
   - Name: www
   - Points to: ruyacreative.com
   - TTL: 14400

---

## 🎯 SEÇENEK 2: Shared Hosting + Ücretsiz Backend

Eğer Hostinger'de **Shared Hosting** kullanıyorsan, Node.js çalışmaz. Bu durumda:

### Frontend (HTML/CSS/JS) - Hostinger'e

1. FileZilla ile Hostinger'e bağlan
2. `public_html` dizinine şunları yükle:
   - `public/` klasörünün İÇİNDEKİ tüm dosyalar
   - Yani: index.html, css/, js/, pages/, partials/

### Backend (Node.js) - Ücretsiz Platform

**Render.com** kullan (ücretsiz):

1. https://render.com'a git
2. GitHub hesabınla bağlan
3. "New" → "Web Service"
4. GitHub reposunu seç
5. Ayarlar:
   - Name: `ruyacreative-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free

6. Environment Variables ekle:
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `JWT_SECRET`: Güçlü bir secret key
   - `ADMIN_EMAIL`: merhaba@ruyacreative.com
   - `ADMIN_PASSWORD`: Şifre

7. Deploy et

8. Çıkan URL'i (örn: `https://ruyacreative-api.onrender.com`) kopyala

9. Hostinger'deki `public/js/common.js` dosyasını aç ve:
   ```javascript
   const API_URL = 'https://ruyacreative-api.onrender.com';
   ```
   olarak değiştir.

---

## 📁 Hangi Dosyaları Yüklemelisin?

### VPS İçin (Tam Proje):
```
ruyacreative/
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── public/          ← Tüm frontend dosyaları
├── uploads/
├── .env
├── package.json
└── package-lock.json
```

### Shared Hosting İçin (Sadece Frontend):
```
public_html/
├── index.html
├── css/
├── js/
├── pages/
├── partials/
└── images/
```

---

## 🔧 Hızlı Kontrol Listesi

- [ ] MongoDB Atlas cluster oluşturuldu
- [ ] Database user oluşturuldu
- [ ] IP adresi 0.0.0.0/0 olarak ayarlandı
- [ ] .env dosyasındaki MONGODB_URI güncellendi
- [ ] JWT_SECRET güçlü bir şifre ile değiştirildi
- [ ] Admin şifresi güçlü bir şifre ile değiştirildi
- [ ] Domain DNS ayarları yapıldı
- [ ] SSL sertifikası kuruldu
- [ ] PM2 ile uygulama başlatıldı
- [ ] Nginx yapılandırması yapıldı

---

## 🚨 Sık Karşılaşılan Hatalar

### "Cannot find module"
```bash
cd /var/www/ruyacreative
npm install
```

### "EADDRINUSE: Port 3000 already in use"
```bash
pm2 delete ruuyacreative
pm2 start server/server.js --name "ruyacreative"
```

### MongoDB bağlantı hatası
- MongoDB Atlas'da IP adresini kontrol et (0.0.0.0/0)
- Username ve şifreyi kontrol et
- Connection string'i kontrol et

### 502 Bad Gateway
```bash
# Node uygulaması çalışıyor mu kontrol et
pm2 status

# Logları kontrol et
pm2 logs

# Nginx'i yeniden başlat
systemctl restart nginx
```

---

## 📞 Destek

Sorun yaşarsan:
1. `pm2 logs` çıktısını kontrol et
2. `nginx -t` komutunu çalıştır
3. MongoDB Atlas bağlantısını test et

Kolay gelsin kanka! 🚀
