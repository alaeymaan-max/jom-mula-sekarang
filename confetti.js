/**
 * jom-mula | confetti.js
 * Logik Keraian & Visual Reward
 */

const JomMulaEffects = {
    
    // 1. Letupan Klasik (Tengah skrin)
    // Sesuai untuk setiap kali selesai satu langkah besar
    popStandard() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#6366f1', '#a855f7', '#ec4899'] // Warna tema Jom-Mula
        });
    },

    // 2. Mod "Hujan Emas" (Success Mode)
    // Sesuai apabila pengguna tamat keseluruhan panduan
    fireworks() {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // Letupan dari kiri dan kanan skrin secara rawak
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
            }));
        }, 250);
    },

    // 3. Mod "School Pride"
    // Sesuai apabila pengguna klik butang Donation atau Share
    celebrateDonation() {
        const end = Date.now() + (2 * 1000);
        const colors = ['#fbbf24', '#ffffff'];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
};
