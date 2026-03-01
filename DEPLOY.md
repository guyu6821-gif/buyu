# 🚀 Cloudflare Pages Deploy Guide

## UniFy BDU EDU - Deployment Təlimatları

---

## ⚡ TÜRk Deploy (Cloudflare Dashboard ilə) - Tövsiyə edilir

### Addım 1: Cloudflare-ə Daxil Olun
1. https://dash.cloudflare.com/login saytını açın
2. Email və şifrənizlə daxil olun (və ya qeydiyyatdan keçin)

### Addım 2: Workers & Pages Bölməsinə Keçin
1. Sol menüdan **"Workers & Pages"** seçin
2. Sağ yuxarıdan **"Create application"** düyməsinə basın
3. **"Pages"** tab-ına keçin
4. **"Connect to Git"** düyməsinə basın

### Addım 3: GitHub Bağlantısı
1. **"GitHub"** seçin
2. GitHub hesabınıza giriş edin
3. **"guyu6821-gif"** hesabını seçin
4. **"buyu"** repository-ni seçin
5. **"Begin setup"** basın

### Addım 4: Build Konfiqurasiyası
Aşağıdakı parametrləri daxil edin:

```
Project name: unifybduedu
Production branch: main
Framework preset: None
Build command: npm run build
Build output directory: dist
Root directory: /
```

**Environment Variables (Optional):**
Hələlik boş buraxın - lazım deyil

### Addım 5: Deploy
1. **"Save and Deploy"** düyməsinə basın
2. Build prosesi başlayacaq (1-3 dəqiqə)
3. Build tamamlandıqda URL alacaqsınız:
   - **Production**: `https://unifybduedu.pages.dev`
   - **Preview**: `https://[commit-hash].unifybduedu.pages.dev`

### Addım 6: Custom Domain (İstəyə bağlı)
1. Deploy olunduqdan sonra project səhifəsinə keçin
2. **"Custom domains"** tab-ına basın
3. **"Set up a custom domain"** seçin
4. Domain adınızı daxil edin (məs: unifybdu.com)
5. DNS ayarlarını təsdiqləyin

---

## 💻 CLI ilə Deploy (Advanced Users)

### Prerequisitələr
```bash
# Node.js 18+ və npm yüklü olmalıdır
node --version
npm --version
```

### Addım 1: Cloudflare API Token Yaradın
1. https://dash.cloudflare.com/profile/api-tokens
2. **"Create Token"** basın
3. **"Edit Cloudflare Workers"** template seçin
4. **Permissions** əlavə edin:
   - Account > Cloudflare Pages > Edit
5. **"Continue to summary"** > **"Create Token"**
6. Token-i kopyalayın (bir dəfə göstərilir!)

### Addım 2: Wrangler Quraşdırın
```bash
npm install -g wrangler
```

### Addım 3: Login
```bash
# Option 1: Browser ilə
wrangler login

# Option 2: API Token ilə
export CLOUDFLARE_API_TOKEN="your-token-here"
```

### Addım 4: Project Yaradın
```bash
cd /path/to/webapp
npx wrangler pages project create unifybduedu --production-branch main
```

### Addım 5: Build və Deploy
```bash
# Build
npm run build

# Deploy
npx wrangler pages deploy dist --project-name unifybduedu
```

### Addım 6: Verify
```bash
# Deploy URL-i alın
npx wrangler pages deployment list --project-name unifybduedu
```

---

## 🤖 GitHub Actions ilə Avtomatik Deploy

### Addım 1: GitHub Secrets Əlavə Edin
1. GitHub repo-ya keçin: https://github.com/guyu6821-gif/buyu
2. **Settings** > **Secrets and variables** > **Actions**
3. **"New repository secret"** basın
4. Əlavə edin:
   - **Name**: `CLOUDFLARE_API_TOKEN`
   - **Value**: Cloudflare API token
   - **Name**: `CLOUDFLARE_ACCOUNT_ID`
   - **Value**: Cloudflare Account ID (Dashboard-dan tapın)

### Addım 2: Workflow Faylı Yaradın
Repository-də `.github/workflows/deploy.yml` yaradın:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
          
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

### Addım 3: Push və Watch
```bash
git add .github/workflows/deploy.yml
git commit -m "Add Cloudflare Pages deployment workflow"
git push origin main
```

GitHub Actions tab-ında deploy prosesini izləyin!

---

## 🔍 Troubleshooting

### Build Uğursuz Olsa
```bash
# Local build test edin
npm run build

# Node version yoxlayın
node --version  # 18+ olmalıdır

# Dependencies yenidən yükləyin
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deploy Uğursuz Olsa
```bash
# Wrangler logout/login
wrangler logout
wrangler login

# Account ID yoxlayın
wrangler whoami

# Manual deploy
wrangler pages deploy dist --project-name unifybduedu
```

### API Token İşləməsə
1. Token-in **Account > Cloudflare Pages > Edit** icazəsi olduğunu yoxlayın
2. Token expired olmadığını yoxlayın
3. Yeni token yaradın və yenidən cəhd edin

---

## 📊 Deploy Status Monitoring

### Production URL
```
https://unifybduedu.pages.dev
```

### Dashboard
```
https://dash.cloudflare.com/[account-id]/pages/view/unifybduedu
```

### Analytics
Cloudflare Dashboard-da:
- **Page views**
- **Unique visitors**
- **Bandwidth usage**
- **Request count**

---

## 🎉 Deploy Tamamlandı!

Uğurlu deploy edildikdən sonra:

1. ✅ Production URL-i test edin
2. ✅ PWA quraşdırma test edin
3. ✅ Bütün hesablayıcıları test edin
4. ✅ Mobil uyğunluğu yoxlayın
5. ✅ Custom domain əlavə edin (istəyə bağlı)

---

## 📞 Dəstək

Problem yaranarsa:
- Cloudflare Community: https://community.cloudflare.com/
- Cloudflare Docs: https://developers.cloudflare.com/pages/

---

**Hazırladı**: UniFy Development Team  
**Tarix**: 01 Mart 2026  
**Version**: 1.1.0
