/**
 * jom-mula | badges.js
 * Sistem Lencana Pencapaian (Gamification)
 */

const JomMulaBadges = {
    // 1. Senarai Lencana Yang Boleh Diperolehi
    badgeLibrary: {
        'first_step': {
            name: 'Langkah Pertama',
            icon: '👣',
            desc: 'Menyelesaikan panduan pertama anda.'
        },
        'fast_learner': {
            name: 'Kilat IQ',
            icon: '⚡',
            desc: 'Menyelesaikan panduan dalam mod IQ Paksa.'
        },
        'philanthropist': {
            name: 'Dermawan Baik hati',
            icon: '☕',
            desc: 'Klik butang sumbangan di langkah akhir.'
        },
        'master_asas': {
            name: 'Raja Asas',
            icon: '👑',
            desc: 'Menyelesaikan 5 panduan dalam kategori Asas.'
        }
    },

    // 2. Ambil data lencana pengguna dari storage
    getUserBadges() {
        const saved = localStorage.getItem('jomMula_badges');
        return saved ? JSON.parse(saved) : [];
    },

    // 3. Beri lencana baru kepada pengguna
    awardBadge(badgeId) {
        let userBadges = this.getUserBadges();
        
        // Cek jika pengguna sudah ada lencana ini
        if (!userBadges.includes(badgeId)) {
            userBadges.push(badgeId);
            localStorage.setItem('jomMula_badges', JSON.stringify(userBadges));
            
            // Tunjukkan animasi kejayaan
            this.showBadgePopup(badgeId);
            
            // Trigger Confetti (Jika ada library confetti)
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.8 }
                });
            }
        }
    },

    // 4. Paparan Popup Lencana (Soft UI)
    showBadgePopup(badgeId) {
        const badge = this.badgeLibrary[badgeId];
        const popup = document.createElement('div');
        
        popup.className = `
            fixed top-10 left-1/2 transform -translate-x-1/2 
            bg-white border-2 border-indigo-100 p-6 rounded-[30px] 
            shadow-2xl z-[100] flex flex-col items-center text-center
            animate-bounce w-72
        `;
        
        popup.innerHTML = `
            <div class="text-5xl mb-3">${badge.icon}</div>
            <h3 class="text-indigo-600 font-bold text-lg leading-tight">Lencana Diperolehi!</h3>
            <p class="font-bold text-gray-800 text-xl mb-1">${badge.name}</p>
            <p class="text-gray-500 text-xs">${badge.desc}</p>
        `;

        document.body.appendChild(popup);

        // Buang popup selepas 4 saat
        setTimeout(() => {
            popup.classList.replace('animate-bounce', 'animate-pulse');
            setTimeout(() => popup.remove(), 1000);
        }, 4000);
    }
};

// Contoh logik dalam index.js:
// JomMulaBadges.awardBadge('first_step');
