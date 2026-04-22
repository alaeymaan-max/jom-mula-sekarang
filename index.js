/**
 * jom-mula | index.js
 * Core Logic for Adaptive PWA Guide
 * Versi Lengkap: Integrasi Badges, Share, Effects & Donation
 */

const JomMula = {
    state: {
        profile: {
            age: 'remaja',
            iqLevel: 'biasa', 
            mood: 'rela',      
            support: 'kendiri' 
        },
        currentStep: 0,
        activeGuide: null,
        isFinished: false
    },

    init() {
        console.log("🌟 Jom-Mula: Core Engine Integrated");
        this.loadFromStorage();
        
        // Muat panduan pertama secara automatik (Contoh)
        if (typeof guides !== 'undefined' && guides.length > 0) {
            this.state.activeGuide = guides[0];
        }

        this.bindEvents();
        this.registerServiceWorker();
        this.renderUI();
    },

    bindEvents() {
        // Event Profiling
        document.querySelectorAll('.profile-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const { type, value } = e.target.dataset;
                this.updateProfile(type, value);
                
                // Tambah class active pada UI
                btn.parentElement.querySelectorAll('.profile-btn').forEach(b => b.classList.remove('btn-active'));
                btn.classList.add('btn-active');
            });
        });

        // Navigasi Langkah
        const nextBtn = document.getElementById('next-step');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.state.isFinished) {
                    this.resetGuide();
                } else {
                    this.navigateStep(1);
                }
            });
        }
    },

    updateProfile(key, value) {
        this.state.profile[key] = value;
        localStorage.setItem('jomMula_user', JSON.stringify(this.state.profile));
        this.renderUI();
    },

    loadFromStorage() {
        const saved = localStorage.getItem('jomMula_user');
        if (saved) this.state.profile = JSON.parse(saved);
    },

    getAdaptiveSettings() {
        const { iqLevel, mood } = this.state.profile;
        let settings = {
            themeColor: '#6366f1',
            instructionType: 'standard'
        };

        if (mood === 'paksa') {
            settings.themeColor = '#f43f5e';
            settings.instructionType = 'fast-track';
        }
        if (iqLevel === 'mudah') {
            settings.instructionType = 'visual-heavy';
        }
        return settings;
    },

    navigateStep(increment) {
        const guide = this.state.activeGuide;
        if (!guide) return;

        this.state.currentStep += increment;

        // Jika sampai ke penghujung
        if (this.state.currentStep >= guide.steps.length) {
            this.finishGuide();
        } else {
            this.renderUI();
            // Beri sedikit kesan pop setiap langkah
            if (typeof JomMulaEffects !== 'undefined') JomMulaEffects.popStandard();
        }
    },

    finishGuide() {
        this.state.isFinished = true;
        this.renderUI();

        // 1. Letupkan Fireworks
        if (typeof JomMulaEffects !== 'undefined') JomMulaEffects.fireworks();

        // 2. Beri Lencana
        if (typeof JomMulaBadges !== 'undefined') JomMulaBadges.awardBadge('first_step');

        // 3. Inisialisasi Bahagian Donation
        setTimeout(() => {
            if (typeof JomMulaDonation !== 'undefined') {
                JomMulaDonation.init(this.state.profile);
            }
        }, 1000);
    },

    resetGuide() {
        this.state.currentStep = 0;
        this.state.isFinished = false;
        this.renderUI();
    },

    renderUI() {
        const settings = this.getAdaptiveSettings();
        const display = document.getElementById('content-area');
        const nextBtn = document.getElementById('next-step');
        const guide = this.state.activeGuide;

        if (!display || !guide) return;

        if (this.state.isFinished) {
            // Paparan Tamat & Donation
            display.innerHTML = `
                <div class="soft-card p-8 text-center animate-fadeIn">
                    <h2 class="text-3xl font-bold text-gray-800 mb-4">Tahniah! 🏆</h2>
                    <p class="text-gray-600 mb-6">Anda telah menyelesaikan panduan <strong>${guide.title}</strong>.</p>
                    <div id="donation-section"></div>
                    <button onclick="JomMulaShare.shareFinalAchievement('${guide.title}')" class="mt-4 text-indigo-500 font-semibold flex items-center justify-center gap-2 w-full">
                        <span>📤 Kongsi Kejayaan</span>
                    </button>
                </div>
            `;
            nextBtn.innerText = "Mula Semula";
            return;
        }

        // Paparan Langkah Semasa
        const step = guide.steps[this.state.currentStep];
        const progress = ((this.state.currentStep + 1) / guide.steps.length) * 100;

        display.innerHTML = `
            <div class="soft-card p-8 border-t-8 animate-fadeIn" style="border-color: ${settings.themeColor}">
                <div class="flex justify-between items-center mb-6">
                    <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Langkah ${this.state.currentStep + 1} dari ${guide.steps.length}</span>
                    <div class="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div class="h-full bg-indigo-500 transition-all duration-500" style="width: ${progress}%"></div>
                    </div>
                </div>

                <h2 class="text-2xl font-bold text-gray-800 mb-4">${step.title}</h2>
                <p class="text-gray-600 leading-relaxed mb-6">${step.text}</p>
                
                ${step.motivation ? `
                    <div class="bg-yellow-50 p-4 rounded-2xl border-l-4 border-yellow-400">
                        <p class="text-sm italic text-yellow-700">" ${step.motivation} "</p>
                    </div>
                ` : ''}
            </div>
        `;

        nextBtn.innerText = this.state.currentStep === guide.steps.length - 1 ? "Selesai & Tamat" : "Langkah Seterusnya";
    },

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js');
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => JomMula.init());
