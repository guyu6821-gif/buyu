import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Main page
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="az">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BDU Tələbə Hesablayıcıları</title>
    <link rel="manifest" href="/static/manifest.json">
    <meta name="theme-color" content="#4F46E5">
    <link rel="apple-touch-icon" href="/static/icon-192.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/style.css" rel="stylesheet">
</head>
<body class="bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
    <!-- Fixed Header - WhatsApp Banner -->
    <div class="fixed top-0 left-0 right-0 bg-green-600 text-white py-2 px-4 z-50 flex items-center justify-center gap-2 shadow-md">
        <span class="text-sm font-semibold">📢 Ən ucuz sərbəst iş hazırlanması</span>
        <a href="https://wa.me/994559406018" target="_blank" class="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-bold hover:bg-green-50 transition flex items-center gap-1">
            <i class="fab fa-whatsapp"></i> Mesaj göndər
        </a>
    </div>

    <!-- Main Container -->
    <div class="pt-16 pb-8 px-4" id="mainContainer">
        <!-- Header -->
        <div class="max-w-4xl mx-auto text-center mb-8">
            <h1 class="text-4xl font-bold text-indigo-900 mb-2">🎓 BDU Tələbə Hesablayıcıları</h1>
            <p class="text-gray-600">Akademik həyatınızı asanlaşdırın</p>
        </div>

        <!-- Menu Grid -->
        <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4" id="menuGrid">
            <!-- Semestr Bal Hesablama -->
            <div class="menu-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer" onclick="showSection('semestr')">
                <div class="text-4xl mb-3">📊</div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Semestr Bal Hesablama</h3>
                <p class="text-gray-600 text-sm">Seminar, kollekvium, davamiyyət və sərbəst iş balınızı hesablayın</p>
            </div>

            <!-- ÜOMG Hesablama -->
            <div class="menu-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer" onclick="showSection('uomg')">
                <div class="text-4xl mb-3">📈</div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">ÜOMG Hesablama</h3>
                <p class="text-gray-600 text-sm">Ümumi orta məcmu göstəricinizi hesablayın</p>
            </div>

            <!-- 25% İmtahan Pulu -->
            <div class="menu-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer" onclick="showSection('imtahan')">
                <div class="text-4xl mb-3">💰</div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">25% İmtahan Pulu</h3>
                <p class="text-gray-600 text-sm">Kəsr pulunu hesablayın</p>
            </div>

            <!-- Yaş Hesablayıcı -->
            <div class="menu-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer" onclick="showSection('yas')">
                <div class="text-4xl mb-3">🎂</div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Yaş Hesablayıcı</h3>
                <p class="text-gray-600 text-sm">Yaşınızı və doğum gününüzə qədər vaxtı hesablayın</p>
            </div>

            <!-- Lüğət -->
            <div class="menu-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer" onclick="showSection('luget')">
                <div class="text-4xl mb-3">📚</div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Lüğət</h3>
                <p class="text-gray-600 text-sm">Akademik terminlər lüğəti</p>
            </div>

            <!-- Məlumat -->
            <div class="menu-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer" onclick="showSection('melumat')">
                <div class="text-4xl mb-3">ℹ️</div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Məlumat</h3>
                <p class="text-gray-600 text-sm">Faydalı məlumatlar</p>
            </div>

            <!-- Sürətli Linklər -->
            <div class="menu-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer" onclick="showSection('linklər')">
                <div class="text-4xl mb-3">🔗</div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Sürətli Linklər</h3>
                <p class="text-gray-600 text-sm">Faydalı linklər toplusu</p>
            </div>

            <!-- Quraşdır -->
            <div class="menu-card bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer" onclick="installApp()">
                <div class="text-4xl mb-3">📱</div>
                <h3 class="text-xl font-bold mb-2">Quraşdır</h3>
                <p class="text-sm opacity-90">Tətbiqi telefonunuza yükləyin</p>
            </div>
        </div>

        <!-- Info Button -->
        <div class="fixed bottom-6 right-6 z-40" id="infoButton">
            <button onclick="showInfo()" class="bg-indigo-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-indigo-700 transition flex items-center justify-center">
                <i class="fas fa-info text-xl"></i>
            </button>
        </div>
    </div>

    <!-- Content Sections -->
    <div id="contentSections" class="hidden pt-16 pb-8 px-4"></div>

    <script src="/static/app.js"></script>
    <script src="/static/calculator.js"></script>
</body>
</html>
  `)
})

export default app
