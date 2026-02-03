# 🍃 MongoDB Atlas Kurulum Rehberi (5 Dakika)

## Adım 1: Hesap Oluştur (1 dk)

1. **https://www.mongodb.com/cloud/atlas** adresine git
2. **"Try Free"** veya **"Start Free"** butonuna tıkla
3. Şu yöntemlerden biriyle kaydol:
   - ✅ **Google hesabınla** (en kolay - tavsiye)
   - Email/şifre ile
   
4. **"Sign up with Google"** seç → Google hesabını seç → Tamam

---

## Adım 2: Organization ve Project (30 sn)

1. **Organization Name:** `RuyaCreative` yaz → **"Next"**
2. **Project Name:** `ruya-creative-prod` yaz → **"Next"**
3. **"No, thanks"** (analiz istemiyoruz) → **"Finish"**

---

## Adım 3: Database Oluştur (2 dk)

1. **"Create a Deployment"** veya **"Build a Database"** butonuna tıkla
2. **"Shared"** seç (ücretsiz olan) → **"Create"**

### Ayarlar:
- **Cloud Provider:** `AWS`
- **Region:** `Frankfurt (eu-central-1)` 🇩🇪 *(Türkiye'ye en yakın)*
- **Cluster Tier:** `M0 Sandbox (Shared)` ✅ *(ücretsiz)*
- **Cluster Name:** `ruya-cluster`
- **"Create Cluster"** *(ücretsiz olduğunu teyit et)*

⏳ **Cluster oluşurken 1-2 dk bekle...**

---

## Adım 4: Kullanıcı Oluştur (1 dk)

**"Security Quickstart"** sayfası açılacak:

### Username & Password
1. **Username:** `ruya_admin`
2. **Password:** 
   - **"Autogenerate Secure Password"** seç (güvenli olsun)
   - VEYA kendin yaz: `RuyaMongo2026Secure!`
3. **"Create User"**

> ⚠️ **Şifreyi KOPYALA ve bir yere kaydet!** (Tekrar göremezsin)

---

## Adım 5: IP Adresi İzin Verme (30 sn)

**"Where would you like to connect from?"**

1. **"My Local Environment"** seç
2. **IP Address:** 
   - **"Add My Current IP Address"** → Sadece senin IP'n *(daha güvenli)*
   - VEYA **"Allow Access from Anywhere"** → `0.0.0.0/0` *(daha kolay)*
   
   💡 **Tavsiye:** `0.0.0.0/0` seç (Render.com'dan bağlanabilmek için)

3. **"Finish and Close"**

---

## Adım 6: Connection String Alma (30 sn)

1. **Database Deployments** sayfasında cluster'ın yanındaki **"Connect"** butonuna tıkla
2. **"Drivers"** seç
3. **"Node.js"** ve **"4.1 or later"** seç
4. Connection string kopyala:

```
mongodb+srv://ruya_admin:SIFREN@ruya-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=ruya-cluster
```

5. **SONUNA EKLE** (database adı):
```
mongodb+srv://ruya_admin:SIFREN@ruya-cluster.xxxxx.mongodb.net/ruya_creative?retryWrites=true&w=majority&appName=ruya-cluster
```
                                                                    ^^^^^^^^^^^^^
```

> 📌 **Bu tam string'i bana ver**, Render.com'a ekleyeceğim!

---

## ✅ BİTTİ!

**Şimdi bana şu bilgileri ver:**
1. Connection string (üstteki gibi)
2. Şifreyi (eğer kendin belirlediysen)

Gerisini ben hallederim kanka! 🚀

---

## 🆘 Sorun Olursa

### "Credit card required" diyorsa
→ Ücretsiz tier (M0) seçtiğinden emin ol
→ "Shared" seçeneğini seç

### "Region not available" diyorsa
→ Frankfurt yerine **Stockholm (eu-north-1)** dene

### Şifreyi kaybettim
→ Database Access → Edit → Reset Password yap
