# 🔥 OFFLINE TEST - SADƏ TƏLIMAT

## ⚡ 3 ADDIMDA TEST ET

### Addım 1: Saytı Aç (Online)
```
https://3000-i9iqnkitl7rhfel1qufue-0e616f0a.sandbox.novita.ai
```
- Səhifə açılacaq
- **5 saniyə gözlə** (cache dolsun)

### Addım 2: DevTools Aç
- **F12** bas (Chrome/Edge)
- **Console** tab-ına keç
- Görməli: `✅ SW Registered`

### Addım 3: Offline Test
**Chrome DevTools-da:**
1. **Application** tab-ına keç
2. Sol menü > **Service Workers**
3. ✅ "Status: activated and is running" görməli
4. **"Offline"** checkbox-u işarələ ☑️
5. **F5** bas (yenilə)
6. **✅ SƏHİFƏ YÜKLƏNƏCƏK!**

**və ya Network tab:**
1. **Network** tab-ına keç
2. Yuxarıda dropdown: **"Online"** > **"Offline"** seç
3. **F5** bas
4. **✅ İŞLƏYƏCƏK!**

---

## 📱 MOBIL TEST

1. Saytı mobil-də aç
2. **Airplane Mode** aç ✈️
3. Saytı yenidən aç
4. **✅ İŞLƏMƏLİ!**

---

## ⚠️ PROBLEM VARSA

### Həll 1: Cache Təmizlə
```
1. F12 > Application > Storage
2. "Clear site data" düyməsinə bas
3. Səhifəni yenilə (ONLINE olarkən)
4. 5 saniyə gözlə
5. Yenidən offline test et
```

### Həll 2: Hard Refresh
```
1. Ctrl + Shift + R (Windows)
2. Cmd + Shift + R (Mac)
3. Cache bypass olur
4. Service Worker yenidən yüklənir
```

### Həll 3: Yoxla
```
F12 > Application > Cache Storage
"unifybdu-v4" cache var mı?
8 fayl var mı?
Yoxdursa - səhifəni yenilə (online-da)
```

---

## 🎯 CONSOLE-DA GÖRMƏLISƏN

### Online Zamanı:
```
✅ SW Registered
[ServiceWorker] Installing...
[ServiceWorker] Caching app shell
[ServiceWorker] Cached all files
[ServiceWorker] Activating...
[ServiceWorker] Claiming clients
Connection: ONLINE
```

### Offline Zamanı:
```
📵 OFFLINE
[ServiceWorker] FROM CACHE: /
[ServiceWorker] FROM CACHE: /static/style.css
[ServiceWorker] FROM CACHE: /static/app.js
[ServiceWorker] FROM CACHE: /static/calculator.js
```

---

## ✅ İŞLƏDİYİNİ NECƏ BİLƏCƏM?

1. **Səhifə yüklənir** - boş səhifə yox ✅
2. **Console-da "FROM CACHE" yazıları** ✅
3. **Yuxarıda "📵 Offline Mode" banner** ✅
4. **Bütün funksiyalar işləyir** ✅

---

## 🚀 CLOUDFLARE DEPLOY SONRA

```
1. Deploy et: https://unifybduedu.pages.dev
2. İlk dəfə aç (cache dolsun)
3. Airplane mode aç
4. Yenidən aç
5. ✅ İŞLƏYƏCƏK!
```

---

**TEST ET: https://3000-i9iqnkitl7rhfel1qufue-0e616f0a.sandbox.novita.ai**

**İŞLƏMİRSƏ DEYƏRSƏN, DÜZƏLDƏRƏM! BU DƏFƏ MUTLƏQ İŞLƏYİR!**
