/**
 * jom-mula | editor.js
 * Tool untuk membina kandungan langkah-demi-langkah secara tersusun.
 */

const JomMulaEditor = {
    steps: [],

    init() {
        console.log("🛠️ Jom-Mula Editor Mode: Active");
        this.bindEditorEvents();
    },

    bindEditorEvents() {
        const addStepBtn = document.getElementById('add-step-btn');
        const saveGuideBtn = document.getElementById('save-guide-btn');

        if (addStepBtn) {
            addStepBtn.addEventListener('click', () => this.addNewStepRow());
        }

        if (saveGuideBtn) {
            saveGuideBtn.addEventListener('click', () => this.generateFinalJSON());
        }
    },

    // 1. Tambah baris input langkah baru dalam UI
    addNewStepRow() {
        const container = document.getElementById('steps-builder-container');
        const stepNum = container.children.length + 1;

        const stepHTML = `
            <div class="step-row soft-card p-6 mb-4 border-l-4 border-indigo-400 bg-white" data-step="${stepNum}">
                <div class="flex justify-between items-center mb-4">
                    <span class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">LANGKAH ${stepNum}</span>
                    <button onclick="this.parentElement.parentElement.remove()" class="text-red-400 hover:text-red-600">Hapus</button>
                </div>
                
                <div class="grid grid-cols-1 gap-4">
                    <input type="text" placeholder="Tajuk Ringkas Langkah (cth: Basuh Beras)" class="step-title p-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-200 outline-none">
                    
                    <textarea placeholder="Penerangan terperinci... (Gunakan bahasa ikut IQ/Mood)" class="step-desc p-3 rounded-xl border border-gray-100 h-24 outline-none"></textarea>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="URL Gambar/Ikon" class="step-image p-3 rounded-xl border border-gray-100 outline-none text-sm">
                        <input type="text" placeholder="Kata Motivasi (cth: Anda hebat!)" class="step-motivation p-3 rounded-xl border border-gray-100 outline-none text-sm bg-yellow-50">
                    </div>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', stepHTML);
    },

    // 2. Kumpul semua data dan tukar jadi JSON
    generateFinalJSON() {
        const guideTitle = document.getElementById('guide-title').value;
        const targetAge = document.getElementById('target-age').value;
        const iqCategory = document.getElementById('iq-category').value;

        const allStepRows = document.querySelectorAll('.step-row');
        this.steps = [];

        allStepRows.forEach(row => {
            this.steps.push({
                title: row.querySelector('.step-title').value,
                description: row.querySelector('.step-desc').value,
                image: row.querySelector('.step-image').value,
                motivation: row.querySelector('.step-motivation').value
            });
        });

        const finalData = {
            id: `guide-${Date.now()}`,
            meta: {
                title: guideTitle,
                ageGroup: targetAge,
                iqLevel: iqCategory,
                createdAt: new Date().toISOString()
            },
            content: this.steps,
            donationLink: "https://ko-fi.com/your-id"
        };

        this.showExportModal(finalData);
    },

    // 3. Paparkan hasil untuk disalin ke data.js
    showExportModal(data) {
        console.log("✅ Kandungan Tersusun:", data);
        
        // Anda boleh tingkatkan ini dengan memaparkan modal UI
        const jsonString = JSON.stringify(data, null, 2);
        
        // Simpan ke clipboard secara automatik
        navigator.clipboard.writeText(jsonString).then(() => {
            alert("Data berjaya dijana dan disalin ke Clipboard! Sila tampal (paste) ke dalam fail data.js anda.");
        });
    }
};

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => JomMulaEditor.init());
