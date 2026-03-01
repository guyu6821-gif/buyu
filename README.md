# BDU Tələbə Hesablayıcıları

## 🎓 Layihə Haqqında
Bakı Dövlət Universiteti tələbələri üçün akademik hesablama alətləri toplusu. Bu Progressive Web App (PWA) tətbiqi tələbələrə semestr ballarını, ÜOMG-ni, imtahan pullarını və digər akademik məlumatları hesablamağa kömək edir.

## ✨ Xüsusiyyətlər

### 📊 Semestr Bal Hesablama
- Seminar balları (maksimum 9 bal)
- Kollekvium balları (maksimum 4 bal)
- Sərbəst iş balı (0-10)
- Davamiyyət hesablaması (30-105 saat arası)
- Avtomatik nəticə qiymətləndirməsi

### 📈 ÜOMG Hesablama
- Çoxlu fənn üzrə hesablama
- Kredit sistemi ilə inteqrasiya
- Ümumi orta məcmu göstərici

### 💰 25% İmtahan Pulu
- İxtisasın illik ödənişinə əsasən
- Kredit sayına görə hesablama
- Kəsr pulu kalkulyatoru

### 🎂 Yaş Hesablayıcı
- Doğum tarixi əsaslı hesablama
- Yaşadığınız günlərin sayı
- Növbəti ad gününə qədər qalan vaxt

### 📚 Lüğət və Məlumat
- Akademik terminlər lüğəti
- Faydalı məlumatlar bazası
- Tez-tez verilən suallar

### 🔗 Sürətli Linklər
- BDU rəsmi saytı
- SemsLogin akademik portal
- BDU sosial media hesabları
- Tələbə qrupları

## 🚀 URL-lər

### Sandbox Test URL
- **URL**: https://3000-i9iqnkitl7rhfel1qufue-0e616f0a.sandbox.novita.ai

### GitHub Repository
- **Repo**: https://github.com/guyu6821-gif/buyu

## 🛠️ Texnologiyalar

- **Backend**: Hono (Cloudflare Workers)
- **Frontend**: Vanilla JavaScript, TailwindCSS
- **PWA**: Service Worker, Web App Manifest
- **Deploy**: Cloudflare Pages
- **Icons**: Custom PNG icons

## 📱 Quraşdırma

Tətbiqi mobil cihazınıza yükləmək üçün:

1. Saytı brauzerinizdə açın
2. "Quraşdır" düyməsinə basın
3. Safari-də: "Paylaş" → "Ana Ekrana Əlavə Et"
4. Chrome-da: Menyu → "Ana ekrana əlavə et"

Quraşdırdıqdan sonra tətbiqi internet bağlantısı olmadan da istifadə edə bilərsiniz!

## 💻 Development

### Lokal İnkişaf
```bash
# Asılılıqları yükləyin
npm install

# Build edin
npm run build

# PM2 ilə başladın
pm2 start ecosystem.config.cjs

# Testi yoxlayın
curl http://localhost:3000
```

### GitHub-a Push
```bash
git add .
git commit -m "Update"
git push origin main
```

### Cloudflare Pages-ə Deploy
```bash
# Build və deploy
npm run deploy:prod
```

## 📂 Layihə Strukturu

```
webapp/
├── src/
│   └── index.tsx          # Hono backend
├── public/
│   └── static/
│       ├── app.js         # Main JavaScript
│       ├── calculator.js  # Calculator functions
│       ├── style.css      # Custom CSS
│       ├── sw.js          # Service Worker
│       ├── manifest.json  # PWA Manifest
│       ├── icon-192.png   # PWA Icon
│       └── icon-512.png   # PWA Icon
├── ecosystem.config.cjs   # PM2 config
├── package.json
├── wrangler.jsonc        # Cloudflare config
└── README.md
```

## 🎯 İstifadə Təlimatı

### Semestr Bal Hesablama
1. "Semestr Bal Hesablama" seçin
2. Seminar və kollekvium saylarını daxil edin
3. Hər bir qiyməti 0-10 arası daxil edin
4. Sərbəst iş və davamiyyət məlumatlarını əlavə edin
5. "Hesabla" düyməsinə basın

### ÜOMG Hesablama
1. "ÜOMG Hesablama" seçin
2. Fənn sayını daxil edin
3. Hər fənn üçün bal və kredit sayını yazın
4. "Hesabla" düyməsinə basın

### 25% İmtahan Pulu
1. "25% İmtahan Pulu" seçin
2. İxtisasın illik ödənişini daxil edin
3. Fənnin kredit sayını yazın
4. "Hesabla" düyməsinə basın

## 🔧 Xüsusiyyətlər

### Davamiyyət Balı Cədvəli

| Saat | Qayıb Sayı | Bal |
|------|------------|-----|
| 30   | 0-2        | 10-9|
| 45   | 0-3        | 10-9|
| 60   | 0-4        | 10-9|
| 75   | 0-5        | 10-9|
| 90   | 0-6        | 10-9|
| 105  | 0-7        | 10-9|

### Nəticə Qiymətləndirməsi

- 50+ bal: 🎉 MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ! ✅
- 45-49: 🔥 ÇOX YAXŞI 📊
- 41-44: 💣 YAXŞI 📈
- 36-40: 🫂 KAFİ 📉
- 26-35: 🎭 ZƏİF 📴
- 0-25: 🗿 YAXŞI OLACAQ 🆒

## 📞 Əlaqə

- 📱 WhatsApp: +994559406018
- 📧 Instagram: [@desespere_etoile](https://www.instagram.com/desespere_etoile)

## 📄 Lisenziya

Bu layihə təhsil məqsədləri üçün hazırlanmışdır.

## 🙏 Təşəkkür

Bakı Dövlət Universiteti tələbələri üçün faydalı olmağını ümid edirik!

---

**Son Yeniləmə**: 01 Mart 2026
**Status**: ✅ Aktiv
**Version**: 1.0.0
