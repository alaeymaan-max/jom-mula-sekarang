/**
 * jom-mula | index.js
 * Core Logic for Adaptive PWA Guide
 */

const JomMula = {
    // State Aplikasi
    state: {
        profile: {
            age: 'remaja',
            iqLevel: 'biasa', // mudah, biasa, pakar
            mood: 'rela',      // rela, paksa
            support: 'kendiri' // kendiri, bimbingan
        },
        currentStep: 0,
        activeGuide: null
    },

    // 1. Inisialisasi Aplikasi
    init() {
        console.log("🌟 Jom-Mula: PWA Ready");
        this.loadFromStorage();
        this.bindEvents();
        this.registerServiceWorker();
    },

    // 2. Event Listeners (Interaksi User)
    bindEvents() {
        // Tukar Profil (Contoh: Klik Butang)
        document.querySelectorAll('.profile-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const { type, value } = e.target.dataset;
                this.updateProfile(type, value);
            });
        });

        // Navigasi Langkah
        const nextBtn = document.getElementById('next-step');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateStep(1));
        }
    },

    // 3. Pengurusan Data (PWA Offline Capability)
    updateProfile(key, value) {
        this.state.profile[key] = value;
        localStorage.setItem('jomMula_user', JSON.stringify(this.state.profile));
        this.renderUI();
    },

    loadFromStorage() {
        const saved = localStorage.getItem('jomMula_user');
        if (saved) {
            this.state.profile = JSON.parse(saved);
        }
        this.renderUI();
    },

    // 4. "The Brain" - Menentukan Cara Penyampaian (IQ & Mood)
    getAdaptiveSettings() {
        const { iqLevel, mood, support } = this.state.profile;
        
        let settings = {
            themeColor: '#6366f1', // Warna default
            instructionType: 'standard',
            showBonus: true
        };

        // Adaptasi mengikut Mood (Rela vs Paksa)
        if (mood === 'paksa') {
            settings.themeColor = '#f43f5e'; // Tona lebih serius/tegas
            settings.instructionType = 'fast-track';
            settings.showBonus = false;
        }

        // Adaptasi mengikut IQ/Tahap
        if (iqLevel === 'mudah') {
            settings.instructionType = 'visual-heavy';
        }

        return settings;
    },

    // 5. Render UI (Manipulasi DOM)
    renderUI() {
        const settings = this.getAdaptiveSettings();
        const display = document.getElementById('content-area');
        
        if (!display) return;

        // Contoh bagaimana tona suara berubah dalam UI
        const toneMsg = settings.instructionType === 'fast-track' 
            ? "Misi: Siapkan tugasan ini dengan pantas & efisien. ⚡" 
            : "Mari kita teroka langkah ini bersama-sama dengan tenang. ✨";

        display.innerHTML = `
            <div class="card" style="border-top: 5px solid ${settings.themeColor}">
                <p class="text-sm opacity-70">${this.state.profile.age.toUpperCase()} • ${this.state.profile.support.toUpperCase()}</p>
                <h2 class="text-xl font-bold mt-2">${toneMsg}</h2>
            </div>
        `;
    },

    // 6. Service Worker untuk Offline PWA
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('SW Registered!', reg))
                    .catch(err => console.log('SW Failed!', err));
            });
        }
    }
};

// Jalankan sistem
JomMula.init();
