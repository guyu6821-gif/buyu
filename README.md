# UniFy BDU EDU

## 🎓 Layihə Haqqında
**UniFy** - Bakı Dövlət Universiteti tələbələri üçün akademik hesablama alətləri toplusu. Bu Progressive Web App (PWA) tətbiqi tələbələrə semestr ballarını, ÜOMG-ni, imtahan pullarını və digər akademik məlumatları hesablamağa kömək edir.

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

### GitHub Repository
- **Repo**: https://github.com/guyu6821-gif/buyu

### Cloudflare Pages (Deploy ediləcək)
- **Project Name**: unifybduedu
- **Production URL**: https://unifybduedu.pages.dev

## 🛠️ Texnologiyalar

- **Backend**: Hono (Cloudflare Workers)
- **Frontend**: Vanilla JavaScript, TailwindCSS
- **PWA**: Service Worker, Web App Manifest
- **Deploy**: Cloudflare Pages
- **Logo**: UniFy custom logo

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

**Seçim 1: Wrangler CLI ilə (Tövsiyə edilir)**

```bash
# 1. Cloudflare API Token əldə edin:
#    - https://dash.cloudflare.com/profile/api-tokens
#    - "Edit Cloudflare Workers" template istifadə edin
#    - "Account:Cloudflare Pages:Edit" icazəsi əlavə edin

# 2. API token-i ətraf mühitə əlavə edin
export CLOUDFLARE_API_TOKEN="your-api-token-here"

# 3. Login edin
npx wrangler login

# 4. Build və deploy
npm run build

# 5. Cloudflare Pages project yaradın
npx wrangler pages project create unifybduedu --production-branch main

# 6. Deploy edin
npx wrangler pages deploy dist --project-name unifybduedu
```

**Seçim 2: Cloudflare Dashboard ilə (Asan)**

1. https://dash.cloudflare.com/login saytına daxil olun
2. Sol menüdan "Workers & Pages" seçin
3. "Create application" düyməsinə basın
4. "Pages" tab-ına keçin
5. "Connect to Git" seçin
6. GitHub hesabınızı bağlayın
7. `buyu` repository-ni seçin
8. Build settings:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
9. "Save and Deploy" basın

**Seçim 3: GitHub Actions ilə (Avtomatik)**

`.github/workflows/deploy.yml` faylı əlavə edin:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: unifybduedu
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

GitHub Secrets əlavə edin:
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID

## 📂 Layihə Strukturu

```
unifybduedu/
├── src/
│   └── index.tsx          # Hono backend
├── public/
│   └── static/
│       ├── logo.png       # UniFy Logo
│       ├── app.js         # Main JavaScript
│       ├── calculator.js  # Calculator functions
│       ├── style.css      # Custom CSS
│       ├── sw.js          # Service Worker
│       ├── manifest.json  # PWA Manifest
│       ├── icon-192.png   # PWA Icon (192x192)
│       └── icon-512.png   # PWA Icon (512x512)
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

## 🚀 Cloudflare Pages Deploy Status

**Project Name**: `unifybduedu`  
**Status**: GitHub-da hazırdır, Cloudflare-ə deploy gözləyir  
**Deploy URL**: `https://unifybduedu.pages.dev` (deploy edildikdən sonra aktiv olacaq)

### Deploy Addımları (Cloudflare Dashboard):

1. ✅ GitHub-da kod hazırdır: https://github.com/guyu6821-gif/buyu
2. 🔄 Cloudflare Pages Dashboard-a daxil olun
3. 🔄 "Connect to Git" ilə GitHub repo-nu bağlayın
4. 🔄 Build settings konfiqurasiya edin
5. 🔄 Deploy düyməsinə basın

**Build Settings:**
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

---

**Son Yeniləmə**: 01 Mart 2026  
**Status**: ✅ Kod Hazır, Deploy Gözləyir  
**Version**: 1.1.0 - UniFy Branding
