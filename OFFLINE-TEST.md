# 🔥 OFFLINE TEST - DÜZGÜN TƏLIMAT

## ⚠️ ÇOX ÖNƏMLİ - ADDIM-ADDIM OXUYUN

---

## 📱 MOBIL TELEFONDA TEST (TOVSİYƏ EDİLİR)

### Addım 1: Saytı Aç
1. **Chrome** və ya **Safari** ilə aç
2. URL: https://3000-i9iqnkitl7rhfel1qufue-0e616f0a.sandbox.novita.ai
3. Səhifə tam yükləyəcək

### Addım 2: Quraşdır (PWA)
1. Sol aşağıda **"📥 Quraşdır"** düyməsinə bas
2. və ya Chrome menyu > "Ana ekrana əlavə et"
3. Ana ekranda icon görünəcək

### Addım 3: Internet Bağlantısını Kəs
1. **Airplane Mode** aç
2. və ya **WiFi + Mobile Data** söndür

### Addım 4: Tətbiqi Aç
1. Ana ekrandan **UniFy** iconuna bas
2. **IŞLƏMƏLI!** ✅
3. Bütün hesablayıcılar işləməli

---

## 💻 DESKTOP/LAPTOP-DA TEST

### Chrome-da Test:

#### Addım 1: İlk Yükləmə
```
1. Chrome aç
2. https://3000-i9iqnkitl7rhfel1qufue-0e616f0a.sandbox.novita.ai
3. Səhifə tam yükləyəcək
4. F12 bas (DevTools aç)
```

#### Addım 2: Service Worker Yoxla
```
1. DevTools > Application tab
2. Sol menüdən "Service Workers"
3. Görmə varsa:
   - Status: "activated and is running"
   - Source: /static/sw.js
```

#### Addım 3: Cache Yoxla
```
1. DevTools > Application > Cache Storage
2. "unifybdu-offline-v3" görünməli
3. İçində fayllar olmalıdır:
   - /
   - /static/style.css
   - /static/app.js
   - /static/calculator.js
   - /static/logo.png
   - və s.
```

#### Addım 4: Offline Mode Aktiv Et
```
1. DevTools > Network tab
2. Yuxarıda dropdown: "Online" > "Offline" seç
3. və ya:
   - DevTools > Application > Service Workers
   - "Offline" checkbox işarələ
```

#### Addım 5: Səhifəni Yenilə
```
1. F5 bas (yenilə)
2. və ya Ctrl+R
3. ✅ SƏHIFƏ YÜKLƏNMƏLI!
```

#### Addım 6: Console Log-lara Bax
```
1. DevTools > Console tab
2. Görməli:
   - "[SW] Serving from cache: ..."
   - "🌐 Connection status: Offline"
   - "📵 Gone offline"
```

---

## 🧪 DƏQIQ TEST SKRIPTI

### Test 1: İlk Yükləmə
```
✅ Saytı aç
✅ Console-da "[SW] Installing..." görün
✅ Console-da "[SW] All assets cached successfully" görün
✅ Console-da "✅ Service Worker registered successfully" görün
```

### Test 2: Cache Yoxlaması
```
✅ DevTools > Application > Cache Storage
✅ "unifybdu-offline-v3" cache mövcuddur
✅ 8+ fayl cache-də var
```

### Test 3: Offline Yoxlaması
```
✅ Network > Offline seç
✅ F5 yenilə
✅ Səhifə yüklənir (cache-dən)
✅ Yuxarıda "📵 Offline Mode - Cached data" görsənir
✅ Console-da "[SW] Serving from cache" mesajları var
```

### Test 4: Funksional Test
```
✅ Semestr Bal Hesablama aç
✅ ÜOMG Hesablama aç
✅ Bütün linklər işləyir
✅ JavaScript işləyir
✅ CSS stillənmə düzgün
```

---

## ❌ PROBLEM HƏLL ETMƏ

### Problem 1: Service Worker qeydiyyatdan keçmir
**Həll:**
```
1. DevTools > Application > Service Workers
2. "Unregister" bas (əgər varsa)
3. DevTools > Application > Clear storage
4. "Clear site data" bas
5. Səhifəni yenilə (F5)
6. Service Worker yenidən qeydiyyatdan keçəcək
```

### Problem 2: Offline işləmir
**Həll:**
```
1. Əvvəlcə ONLINE olarkən:
   - Səhifəni tam yüklə
   - Console-da "All assets cached successfully" gözlə
   - Minimum 5 saniyə gözlə
2. Sonra Offline et
3. Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
4. İşləməzsə:
   - Cache-i təmizlə
   - Yenidən online olarkən yüklə
   - Yenidən offline test et
```

### Problem 3: Köhnə versiya görsənir
**Həll:**
```
1. DevTools > Application > Service Workers
2. "Update on reload" checkbox işarələ
3. "Unregister" bas
4. F5 yenilə
5. Yeni service worker yüklənəcək
```

---

## 🎯 NƏYI GÖRMƏK LAZIMDIR

### Online Zamanı:
```
✅ Sayt normal açılır
✅ Console: "✅ Service Worker registered successfully"
✅ Console: "[SW] All assets cached successfully"
✅ Console: "🌐 Connection status: Online"
✅ Application > Cache Storage > unifybdu-offline-v3 dolu
```

### Offline Zamanı:
```
✅ Sayt yenə də açılır!
✅ Yuxarıda "📵 Offline Mode - Cached data" banner
✅ Console: "[SW] Serving from cache: ..."
✅ Console: "📵 Gone offline"
✅ Bütün səhifələr işləyir
✅ JavaScript işləyir
✅ Hesablayıcılar işləyir
```

---

## 🚀 CLOUDFLARE DEPLOY SONRA TEST

Deploy edildikdən sonra:

```
1. https://unifybduedu.pages.dev aç
2. Bir neçə dəqiqə istifadə et (cache dolsun)
3. WiFi söndür
4. Yenidən aç
5. ✅ İŞLƏMƏLİ!
```

---

## 📊 NƏTICƏ

Əgər bütün testlər keçirsə:
- ✅ Service Worker düzgün qeydiyyatdan keçib
- ✅ Bütün fayllar cache-ləniib
- ✅ Offline mode 100% işləyir
- ✅ Hazırdır!

---

**SON YOXLAMA:**
1. Mobil telefonda airplane mode aç
2. Tətbiqi aç
3. İşləyirsə = ✅ PROBLEM YOX!

---

**Deploy URL (tez-tez olacaq):**
https://unifybduedu.pages.dev

**Test URL (indi):**
https://3000-i9iqnkitl7rhfel1qufue-0e616f0a.sandbox.novita.ai
