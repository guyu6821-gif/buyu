// Calculator Functions

// Generate Seminar Inputs
function generateSeminarInputs() {
    const count = parseInt(document.getElementById('seminarCount').value);
    const container = document.getElementById('seminarInputs');
    
    if (!count || count < 0 || count > 9) {
        container.innerHTML = '';
        return;
    }
    
    let html = '<div class="grid grid-cols-2 md:grid-cols-3 gap-3">';
    for (let i = 1; i <= count; i++) {
        html += `
            <div>
                <label class="text-sm text-gray-600">Seminar ${i}:</label>
                <input type="number" id="seminar${i}" min="0" max="10" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
            </div>
        `;
    }
    html += '</div>';
    container.innerHTML = html;
}

// Generate Kollekvium Inputs
function generateKollekviumInputs() {
    const count = parseInt(document.getElementById('kollekviumCount').value);
    const container = document.getElementById('kollekviumInputs');
    
    if (!count || count < 0 || count > 4) {
        container.innerHTML = '';
        return;
    }
    
    let html = '<div class="grid grid-cols-2 gap-3">';
    for (let i = 1; i <= count; i++) {
        html += `
            <div>
                <label class="text-sm text-gray-600">Kollekvium ${i}:</label>
                <input type="number" id="kollekvium${i}" min="0" max="10" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
            </div>
        `;
    }
    html += '</div>';
    container.innerHTML = html;
}

// Calculate Davamiyyət
function calculateDavamiyyet(saat, qayib) {
    const rules = {
        30: { 0: 10, 1: 9, 2: 9, 3: 8, 4: 0 },
        45: { 0: 10, 1: 10, 2: 9, 3: 9, 4: 8, 5: 8, 6: 0 },
        60: { 0: 10, 1: 10, 2: 9, 3: 9, 4: 9, 5: 8, 6: 8, 7: 8, 8: 0 },
        75: { 0: 10, 1: 10, 2: 9, 3: 9, 4: 9, 5: 9, 6: 8, 7: 8, 8: 8, 9: 8, 10: 0 },
        90: { 0: 10, 1: 10, 2: 10, 3: 9, 4: 9, 5: 9, 6: 9, 7: 8, 8: 8, 9: 8, 10: 8, 11: 8, 12: 0 },
        105: { 0: 10, 1: 10, 2: 10, 3: 9, 4: 9, 5: 9, 6: 9, 7: 9, 8: 8, 9: 8, 10: 8, 11: 8, 12: 8, 13: 8, 14: 0 }
    };
    
    if (!rules[saat]) return 0;
    
    if (rules[saat][qayib] !== undefined) {
        return rules[saat][qayib];
    }
    
    // Find the closest lower value
    for (let i = qayib; i >= 0; i--) {
        if (rules[saat][i] !== undefined) {
            return rules[saat][i];
        }
    }
    
    return 0;
}

// Calculate Semestr
function calculateSemestr() {
    const seminarCount = parseInt(document.getElementById('seminarCount').value);
    const kollekviumCount = parseInt(document.getElementById('kollekviumCount').value);
    const serbestIsh = parseFloat(document.getElementById('serbestIsh').value) || 0;
    const saat = parseInt(document.getElementById('saatSelect').value);
    const qayib = parseInt(document.getElementById('qayibCount').value) || 0;
    
    // Validate inputs
    if (!seminarCount || !kollekviumCount || !saat) {
        alert('⚠️ Zəhmət olmasa bütün məlumatları daxil edin!');
        return;
    }
    
    // Calculate Seminar Average
    let seminarSum = 0;
    let seminarValid = true;
    for (let i = 1; i <= seminarCount; i++) {
        const val = parseFloat(document.getElementById(`seminar${i}`).value);
        if (isNaN(val) || val < 0 || val > 10) {
            seminarValid = false;
            break;
        }
        seminarSum += val;
    }
    
    if (!seminarValid) {
        alert('⚠️ Seminar balları düzgün deyil! (0-10 arası olmalıdır)');
        return;
    }
    
    const seminarAvg = seminarSum / seminarCount;
    
    // Calculate Kollekvium Average
    let kollekviumSum = 0;
    let kollekviumValid = true;
    for (let i = 1; i <= kollekviumCount; i++) {
        const val = parseFloat(document.getElementById(`kollekvium${i}`).value);
        if (isNaN(val) || val < 0 || val > 10) {
            kollekviumValid = false;
            break;
        }
        kollekviumSum += val;
    }
    
    if (!kollekviumValid) {
        alert('⚠️ Kollekvium balları düzgün deyil! (0-10 arası olmalıdır)');
        return;
    }
    
    const kollekviumAvg = kollekviumSum / kollekviumCount;
    
    // Calculate Davamiyyət
    const davamiyyet = calculateDavamiyyet(saat, qayib);
    
    // Calculate Final Score
    const semestrBal = (seminarAvg * 0.4 + kollekviumAvg * 0.6) * 3 + davamiyyet + serbestIsh;
    
    // Determine Result
    let resultText = '';
    let resultColor = '';
    
    if (semestrBal === 0) {
        resultText = '⚠️ 0 BAL ⚠️';
        resultColor = 'bg-gray-100 text-gray-900';
    } else if (semestrBal >= 50) {
        resultText = '🎉 MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ! ✅';
        resultColor = 'bg-green-100 text-green-900';
    } else if (semestrBal >= 45) {
        resultText = '🔥 ÇOX YAXŞI 📊';
        resultColor = 'bg-blue-100 text-blue-900';
    } else if (semestrBal >= 41) {
        resultText = '💣 YAXŞI 📈';
        resultColor = 'bg-indigo-100 text-indigo-900';
    } else if (semestrBal >= 36) {
        resultText = '🫂 KAFİ 📉';
        resultColor = 'bg-yellow-100 text-yellow-900';
    } else if (semestrBal >= 26) {
        resultText = '🎭 ZƏİF 📴';
        resultColor = 'bg-orange-100 text-orange-900';
    } else {
        resultText = '🗿 YAXŞI OLACAQ 🆒';
        resultColor = 'bg-red-100 text-red-900';
    }
    
    const resultContainer = document.getElementById('semestrResult');
    resultContainer.innerHTML = `
        <div class="${resultColor} p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-4">${resultText}</h3>
            <div class="space-y-2">
                <p><strong>Seminar ortalaması:</strong> ${seminarAvg.toFixed(2)}</p>
                <p><strong>Kollekvium ortalaması:</strong> ${kollekviumAvg.toFixed(2)}</p>
                <p><strong>Sərbəst iş:</strong> ${serbestIsh.toFixed(2)}</p>
                <p><strong>Davamiyyət:</strong> ${davamiyyet}</p>
                <hr class="my-3">
                <p class="text-2xl font-bold">YEKun Bal: ${semestrBal.toFixed(2)} / 50</p>
            </div>
        </div>
    `;
}

// Generate ÜOMG Inputs
function generateUomgInputs() {
    const count = parseInt(document.getElementById('fennCount').value);
    const container = document.getElementById('uomgInputs');
    
    if (!count || count < 1) {
        container.innerHTML = '';
        return;
    }
    
    let html = '<div class="space-y-3">';
    for (let i = 1; i <= count; i++) {
        html += `
            <div class="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
                <div>
                    <label class="text-sm text-gray-600">Fənn ${i} Balı (0-100):</label>
                    <input type="number" id="fennBal${i}" min="0" max="100" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                </div>
                <div>
                    <label class="text-sm text-gray-600">Kredit:</label>
                    <input type="number" id="fennKredit${i}" min="1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                </div>
            </div>
        `;
    }
    html += '</div>';
    container.innerHTML = html;
}

// Calculate ÜOMG
function calculateUomg() {
    const count = parseInt(document.getElementById('fennCount').value);
    
    if (!count || count < 1) {
        alert('⚠️ Fənn sayını daxil edin!');
        return;
    }
    
    let totalWeighted = 0;
    let totalKredit = 0;
    
    for (let i = 1; i <= count; i++) {
        const bal = parseFloat(document.getElementById(`fennBal${i}`).value);
        const kredit = parseFloat(document.getElementById(`fennKredit${i}`).value);
        
        if (isNaN(bal) || isNaN(kredit) || bal < 0 || bal > 100 || kredit < 1) {
            alert(`⚠️ Fənn ${i} məlumatları düzgün deyil!`);
            return;
        }
        
        totalWeighted += bal * kredit;
        totalKredit += kredit;
    }
    
    const uomg = totalWeighted / totalKredit;
    
    // Determine Result
    let resultText = '';
    let resultColor = '';
    
    if (uomg === 0) {
        resultText = '⚠️ 0 BAL ⚠️';
        resultColor = 'bg-gray-100 text-gray-900';
    } else if (uomg >= 50) {
        resultText = '🎉 MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ! ✅';
        resultColor = 'bg-green-100 text-green-900';
    } else if (uomg >= 45) {
        resultText = '🔥 ÇOX YAXŞI 📊';
        resultColor = 'bg-blue-100 text-blue-900';
    } else if (uomg >= 41) {
        resultText = '💣 YAXŞI 📈';
        resultColor = 'bg-indigo-100 text-indigo-900';
    } else if (uomg >= 36) {
        resultText = '🫂 KAFİ 📉';
        resultColor = 'bg-yellow-100 text-yellow-900';
    } else if (uomg >= 26) {
        resultText = '🎭 ZƏİF 📴';
        resultColor = 'bg-orange-100 text-orange-900';
    } else {
        resultText = '🗿 YAXŞI OLACAQ 🆒';
        resultColor = 'bg-red-100 text-red-900';
    }
    
    const resultContainer = document.getElementById('uomgResult');
    resultContainer.innerHTML = `
        <div class="${resultColor} p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-4">${resultText}</h3>
            <p class="text-2xl font-bold">ÜOMG: ${uomg.toFixed(2)}</p>
        </div>
    `;
}

// Calculate İmtahan Pulu
function calculateImtahan() {
    const illikOdenis = parseFloat(document.getElementById('illikOdenis').value);
    const kreditSayi = parseFloat(document.getElementById('kreditSayi').value);
    
    if (!illikOdenis || !kreditSayi || illikOdenis < 0 || kreditSayi < 1) {
        alert('⚠️ Zəhmət olmasa düzgün məlumat daxil edin!');
        return;
    }
    
    const kesrPulu = ((illikOdenis / 60) * kreditSayi) / 4 + 1;
    
    const resultContainer = document.getElementById('imtahanResult');
    resultContainer.innerHTML = `
        <div class="bg-blue-100 text-blue-900 p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-4">💰 25% İmtahan Pulu</h3>
            <p class="text-3xl font-bold">${kesrPulu.toFixed(2)} AZN</p>
        </div>
    `;
}

// Calculate Yaş
function calculateYas() {
    const input = document.getElementById('dogumTarixi').value;
    
    // Parse DD/MM/YYYY
    const parts = input.split('/');
    if (parts.length !== 3) {
        alert('⚠️ Düzgün format daxil edin: GG/AA/İİİİ (məsələn: 01/01/2000)');
        return;
    }
    
    const gun = parseInt(parts[0]);
    const ay = parseInt(parts[1]);
    const il = parseInt(parts[2]);
    
    if (isNaN(gun) || isNaN(ay) || isNaN(il) || gun < 1 || gun > 31 || ay < 1 || ay > 12 || il < 1900 || il > 2100) {
        alert('⚠️ Düzgün tarix daxil edin!');
        return;
    }
    
    const dogumTarixi = new Date(il, ay - 1, gun);
    const bugun = new Date();
    
    // Calculate age
    let yas = bugun.getFullYear() - dogumTarixi.getFullYear();
    const ayFerq = bugun.getMonth() - dogumTarixi.getMonth();
    if (ayFerq < 0 || (ayFerq === 0 && bugun.getDate() < dogumTarixi.getDate())) {
        yas--;
    }
    
    // Calculate days lived
    const gunFerq = Math.floor((bugun - dogumTarixi) / (1000 * 60 * 60 * 24));
    
    // Calculate next birthday
    let novbətiAdGunu = new Date(bugun.getFullYear(), ay - 1, gun);
    if (novbətiAdGunu < bugun) {
        novbətiAdGunu = new Date(bugun.getFullYear() + 1, ay - 1, gun);
    }
    const gunQalir = Math.ceil((novbətiAdGunu - bugun) / (1000 * 60 * 60 * 24));
    
    const resultContainer = document.getElementById('yasResult');
    resultContainer.innerHTML = `
        <div class="bg-purple-100 text-purple-900 p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-4">🎂 Yaş Məlumatı</h3>
            <div class="space-y-3">
                <p class="text-2xl"><strong>Yaşınız:</strong> ${yas} yaş</p>
                <p><strong>Yaşadığınız gün:</strong> ${gunFerq.toLocaleString()} gün</p>
                <p><strong>Növbəti ad gününüzə:</strong> ${gunQalir} gün qalıb</p>
            </div>
        </div>
    `;
}
