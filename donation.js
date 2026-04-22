/**
 * jom-mula | donation.js
 * Logik Sumbangan & Penghargaan Terperinci
 */

const JomMulaDonation = {
    // 1. Pangkalan Data Copywriting (Psikologi mengikut profil)
    messages: {
        'kanak-kanak': "Tahniah hero! Anda dah belajar satu ilmu baru hari ini. Bagitahu ibu bapa kalau nak bantu kami buat lebih banyak panduan best!",
        'remaja': "Mantap! Kemahiran ini akan buat hidup anda lebih mudah. Sokong kami dengan belanja 'secawan kopi' supaya kami boleh bantu lebih ramai kawan sebaya anda.",
        'dewasa': "Terima kasih kerana meluangkan masa untuk peningkatan diri. Sumbangan kecil anda membantu kami mengekalkan platform ini tanpa iklan untuk semua.",
        'warga-emas': "Alhamdulillah, ilmu baru sudah di tangan. Sokongan anda amat kami hargai untuk terus menyediakan panduan yang ringkas dan jelas bagi semua."
    },

    // 2. Inisialisasi Butang Donation
    init(userProfile) {
        const donationArea = document.getElementById('donation-section');
        if (!donationArea) return;

        const age = userProfile.age || 'dewasa';
        const message = this.messages[age];

        this.renderDonationUI(donationArea, message);
    },

    // 3. Render UI Donation (Soft UI ala Ko-fi)
    renderDonationUI(container, message) {
        container.innerHTML = `
            <div class="soft-card p-8 bg-indigo-50 border-2 border-indigo-100 text-center animate-fadeIn">
                <div class="text-4xl mb-4">☕</div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Suka Panduan Ini?</h3>
                <p class="text-gray-600 mb-6 text-sm leading-relaxed">${message}</p>
                
                <div class="flex flex-col gap-3">
                    <button id="donate-btn" class="bg-[#FF5E5B] hover:bg-[#ff4c49] text-white py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95">
                        Belanja Kami Kopi (RM10)
                    </button>
                    <button id="maybe-later" class="text-gray-400 text-xs hover:underline">
                        Mungkin kemudian, saya mahu kongsi dulu
                    </button>
                </div>
            </div>
        `;

        this.bindEvents();
    },

    // 4. Pengurusan Klik & Kesan Visual
    bindEvents() {
        const donateBtn = document.getElementById('donate-btn');
        const laterBtn = document.getElementById('maybe-later');

        if (donateBtn) {
            donateBtn.addEventListener('click', () => {
                // Beri lencana Dermawan (Badges.js)
                if (typeof JomMulaBadges !== 'undefined') {
                    JomMulaBadges.awardBadge('philanthropist');
                }

                // Letupkan kesan visual (Confetti.js)
                if (typeof JomMulaEffects !== 'undefined') {
                    JomMulaEffects.celebrateDonation();
                }

                // Buka pautan Ko-fi/Stripe setelah delay sedikit untuk kesan visual
                setTimeout(() => {
                    window.open('https://ko-fi.com/jom-mula', '_blank');
                }, 1500);
            });
        }

        if (laterBtn) {
            laterBtn.addEventListener('click', () => {
                alert("Tiada masalah! Sokongan moral dan perkongsian anda juga amat bermakna buat kami. 😊");
            });
        }
    }
};

// Penggunaan dalam index.js:
// JomMulaDonation.init(this.state.profile);
