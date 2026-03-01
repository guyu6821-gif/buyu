// Service Worker Registration for PWA
let deferredPrompt;
let scrollPosition = 0;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
});

// Show install button
function showInstallButton() {
    const installBtn = document.getElementById('installBtn');
    if (installBtn && deferredPrompt) {
        installBtn.style.display = 'flex';
    }
}

// Hide install button
function hideInstallButton() {
    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
        installBtn.style.display = 'none';
    }
}

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA installed');
                hideInstallButton();
            }
            deferredPrompt = null;
        });
    } else {
        alert('📱 Quraşdırma:\n\n1. Safari-də "Paylaş" düyməsinə basın\n2. "Ana Ekrana Əlavə Et" seçin\n\nvə ya\n\nChrome-da menyu > "Ana ekrana əlavə et" seçin');
    }
}

// Register Service Worker - AGGRESSIVE OFFLINE CACHING
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/static/sw.js')
            .then(reg => {
                console.log('✅ Service Worker registered successfully');
                
                // Force update check
                reg.update();
                
                // Check for updates
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    console.log('🔄 New Service Worker installing...');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                console.log('✨ New version available');
                                // Automatically activate new service worker
                                newWorker.postMessage({ type: 'SKIP_WAITING' });
                                window.location.reload();
                            } else {
                                console.log('✅ Service Worker installed for the first time');
                            }
                        }
                    });
                });
                
                // Listen for controlling service worker change
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                    console.log('🔄 Service Worker controller changed');
                });
            })
            .catch(err => {
                console.error('❌ Service Worker registration failed:', err);
            });
    });
    
    // Check if we're online or offline
    window.addEventListener('online', () => {
        console.log('✅ Back online');
        document.body.classList.remove('offline-mode');
    });
    
    window.addEventListener('offline', () => {
        console.log('📵 Gone offline');
        document.body.classList.add('offline-mode');
    });
    
    // Log initial connection status
    console.log('🌐 Connection status:', navigator.onLine ? 'Online' : 'Offline');
}

// Show Info
function showInfo() {
    alert('ℹ️ O, boşluq yaradır.');
}

// Save scroll position
function saveScrollPosition() {
    scrollPosition = window.scrollY;
}

// Restore scroll position
function restoreScrollPosition() {
    window.scrollTo(0, scrollPosition);
}

// Navigation Functions
function showSection(sectionName) {
    saveScrollPosition();
    
    const mainContainer = document.getElementById('mainContainer');
    const contentSections = document.getElementById('contentSections');
    const infoButton = document.getElementById('infoButton');
    
    mainContainer.classList.add('hidden');
    contentSections.classList.remove('hidden');
    infoButton.classList.add('hidden');
    
    let content = '';
    
    switch(sectionName) {
        case 'semestr':
            content = getSemestrContent();
            break;
        case 'uomg':
            content = getUomgContent();
            break;
        case 'imtahan':
            content = getImtahanContent();
            break;
        case 'yas':
            content = getYasContent();
            break;
        case 'luget':
            content = getLugetContent();
            break;
        case 'melumat':
            content = getMelumatContent();
            break;
        case 'linklər':
            content = getLinksContent();
            break;
    }
    
    contentSections.innerHTML = content;
    window.scrollTo(0, 0);
}

function goBack() {
    const mainContainer = document.getElementById('mainContainer');
    const contentSections = document.getElementById('contentSections');
    const infoButton = document.getElementById('infoButton');
    
    mainContainer.classList.remove('hidden');
    contentSections.classList.add('hidden');
    infoButton.classList.remove('hidden');
    contentSections.innerHTML = '';
    
    // Restore scroll position after DOM update
    setTimeout(() => {
        restoreScrollPosition();
    }, 10);
}

// Content Templates
function getSemestrContent() {
    return `
        <div class="max-w-4xl mx-auto">
            <button onclick="goBack()" class="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-bold text-indigo-900 mb-6">📊 Semestr Bal Hesablama</h2>
                
                <!-- Seminar Section -->
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">Seminar bal sayı (maksimum 9):</label>
                    <div class="flex gap-2">
                        <input type="number" id="seminarCount" min="0" max="9" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <button onclick="generateSeminarInputs()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition font-semibold">
                            Yarat
                        </button>
                    </div>
                    <div id="seminarInputs" class="mt-3"></div>
                </div>
                
                <!-- Kollekvium Section -->
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">Kollekvium bal sayı (maksimum 4):</label>
                    <div class="flex gap-2">
                        <input type="number" id="kollekviumCount" min="0" max="4" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <button onclick="generateKollekviumInputs()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition font-semibold">
                            Yarat
                        </button>
                    </div>
                    <div id="kollekviumInputs" class="mt-3"></div>
                </div>
                
                <!-- Sərbəst İş -->
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">Sərbəst iş balı (0-10):</label>
                    <input type="number" id="serbestIsh" min="0" max="10" step="0.1" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                </div>
                
                <!-- Davamiyyət -->
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">Saat seçin:</label>
                    <select id="saatSelect" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="">Seçin...</option>
                        <option value="30">30 saat</option>
                        <option value="45">45 saat</option>
                        <option value="60">60 saat</option>
                        <option value="75">75 saat</option>
                        <option value="90">90 saat</option>
                        <option value="105">105 saat</option>
                    </select>
                    
                    <label class="block text-gray-700 font-semibold mb-2 mt-4">Qayıb sayı:</label>
                    <input type="number" id="qayibCount" min="0" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                </div>
                
                <button onclick="calculateSemestr()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition">
                    Hesabla
                </button>
                
                <div id="semestrResult" class="mt-6"></div>
            </div>
        </div>
    `;
}

function getUomgContent() {
    return `
        <div class="max-w-4xl mx-auto">
            <button onclick="goBack()" class="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-bold text-indigo-900 mb-6">📈 ÜOMG Hesablama</h2>
                
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">Fənn sayı:</label>
                    <div class="flex gap-2">
                        <input type="number" id="fennCount" min="1" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <button onclick="generateUomgInputs()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition font-semibold">
                            Yarat
                        </button>
                    </div>
                </div>
                
                <div id="uomgInputs" class="mb-6"></div>
                
                <button onclick="calculateUomg()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition">
                    Hesabla
                </button>
                
                <div id="uomgResult" class="mt-6"></div>
            </div>
        </div>
    `;
}

function getImtahanContent() {
    return `
        <div class="max-w-4xl mx-auto">
            <button onclick="goBack()" class="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-bold text-indigo-900 mb-6">💰 25% İmtahan Pulu Hesablama</h2>
                
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">İxtisasın illik ödənişi (AZN):</label>
                    <input type="number" id="illikOdenis" min="0" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                </div>
                
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">Fənnin kredit sayı:</label>
                    <input type="number" id="kreditSayi" min="1" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                </div>
                
                <button onclick="calculateImtahan()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition">
                    Hesabla
                </button>
                
                <div id="imtahanResult" class="mt-6"></div>
            </div>
        </div>
    `;
}

function getYasContent() {
    return `
        <div class="max-w-4xl mx-auto">
            <button onclick="goBack()" class="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-bold text-indigo-900 mb-6">🎂 Yaş Hesablayıcı</h2>
                
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">Doğum tarixiniz (GG/AA/İİİİ):</label>
                    <input type="text" id="dogumTarixi" placeholder="01/01/2000" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                </div>
                
                <button onclick="calculateYas()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition">
                    Hesabla
                </button>
                
                <div id="yasResult" class="mt-6"></div>
            </div>
        </div>
    `;
}

function getLugetContent() {
    return `
        <div class="max-w-4xl mx-auto">
            <button onclick="goBack()" class="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-bold text-indigo-900 mb-6">📚 Akademik Lüğət</h2>
                
                <div class="space-y-4">
                    <div class="p-4 bg-indigo-50 rounded-lg">
                        <h3 class="font-bold text-indigo-900 mb-1">Mühazirə</h3>
                        <p class="text-gray-700">Müəllimin keçdiyi dərs</p>
                    </div>
                    <!-- Buraya digər terminləri əlavə edə bilərsiniz -->
                </div>
            </div>
        </div>
    `;
}

function getMelumatContent() {
    return `
        <div class="max-w-4xl mx-auto">
            <button onclick="goBack()" class="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-bold text-indigo-900 mb-6">ℹ️ Faydalı Məlumatlar</h2>
                
                <div class="space-y-4">
                    <div class="p-4 bg-blue-50 rounded-lg">
                        <h3 class="font-bold text-blue-900 mb-2">🏆 Əlaçı olmaq üçün</h3>
                        <p class="text-gray-700">Bütün fənnlərdən 91+ bal almalısınız</p>
                    </div>
                    <!-- Buraya digər məlumatları əlavə edə bilərsiniz -->
                </div>
            </div>
        </div>
    `;
}

function getLinksContent() {
    return `
        <div class="max-w-4xl mx-auto">
            <button onclick="goBack()" class="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-bold text-indigo-900 mb-6">🔗 Sürətli Linklər</h2>
                
                <div class="space-y-3">
                    <a href="https://share.google/M2ZIeZ1uGX63hbYwN" target="_blank" class="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                        <div class="flex items-center gap-3">
                            <i class="fas fa-university text-blue-600 text-xl"></i>
                            <div>
                                <h3 class="font-bold text-blue-900">BDU Rəsmi Sayt</h3>
                                <p class="text-sm text-gray-600">Bakı Dövlət Universiteti</p>
                            </div>
                        </div>
                    </a>
                    
                    <a href="https://share.google/7ljpthpUCiOMOeS82" target="_blank" class="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition">
                        <div class="flex items-center gap-3">
                            <i class="fas fa-graduation-cap text-green-600 text-xl"></i>
                            <div>
                                <h3 class="font-bold text-green-900">SemsLogin</h3>
                                <p class="text-sm text-gray-600">Akademik Portal</p>
                            </div>
                        </div>
                    </a>
                    
                    <a href="https://whatsapp.com/channel/0029Va85Ls85q08WyYoGeJ3r" target="_blank" class="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition">
                        <div class="flex items-center gap-3">
                            <i class="fab fa-whatsapp text-green-600 text-xl"></i>
                            <div>
                                <h3 class="font-bold text-green-900">BDU WhatsApp Kanal</h3>
                                <p class="text-sm text-gray-600">Xəbərlər və elanlar</p>
                            </div>
                        </div>
                    </a>
                    
                    <a href="https://www.instagram.com/bdu_eduaz" target="_blank" class="block p-4 bg-pink-50 hover:bg-pink-100 rounded-lg transition">
                        <div class="flex items-center gap-3">
                            <i class="fab fa-instagram text-pink-600 text-xl"></i>
                            <div>
                                <h3 class="font-bold text-pink-900">BDU Instagram</h3>
                                <p class="text-sm text-gray-600">@bdu_eduaz</p>
                            </div>
                        </div>
                    </a>
                    
                    <a href="https://t.me/bdu_eduaz" target="_blank" class="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                        <div class="flex items-center gap-3">
                            <i class="fab fa-telegram text-blue-600 text-xl"></i>
                            <div>
                                <h3 class="font-bold text-blue-900">BDU Telegram</h3>
                                <p class="text-sm text-gray-600">Rəsmi Kanal</p>
                            </div>
                        </div>
                    </a>
                    
                    <a href="https://www.instagram.com/desespere_etoile" target="_blank" class="block p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition">
                        <div class="flex items-center gap-3">
                            <i class="fab fa-instagram text-purple-600 text-xl"></i>
                            <div>
                                <h3 class="font-bold text-purple-900">Sayt Sahibi</h3>
                                <p class="text-sm text-gray-600">@desespere_etoile</p>
                            </div>
                        </div>
                    </a>
                    
                    <a href="https://t.me/+WUKxtnDjo2E5YTcy" target="_blank" class="block p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition">
                        <div class="flex items-center gap-3">
                            <i class="fab fa-telegram text-indigo-600 text-xl"></i>
                            <div>
                                <h3 class="font-bold text-indigo-900">Tələbə Chat Qrupu</h3>
                                <p class="text-sm text-gray-600">Telegram</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `;
}
