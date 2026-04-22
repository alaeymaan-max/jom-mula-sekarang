/**
 * jom-mula | share.js
 * Fungsi perkongsian sosial untuk viraliti dan motivasi pengguna baru.
 */

const JomMulaShare = {
    
    // 1. Fungsi Utama Kongsi Kejayaan
    async shareProgress(guideTitle, currentStep, totalSteps) {
        const shareData = {
            title: `Saya sedang belajar di Jom-Mula!`,
            text: `Hebat! Saya baru saja selesaikan langkah ke-${currentStep} untuk panduan "${guideTitle}". Jom mula belajar perkara asas dengan mudah!`,
            url: window.location.href
        };

        // Guna Web Share API jika disokong (Mobile native share)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                this.notifySuccess("Berjaya dikongsi! Terima kasih kerana memberi inspirasi.");
            } catch (err) {
                console.log("Perkongsian dibatalkan atau ralat:", err);
            }
        } else {
            // Fallback ke WhatsApp jika di Desktop
            this.fallbackShare(shareData.text);
        }
    },

    // 2. Fungsi Kongsi Selepas Selesai (Sangat Penting untuk Donation)
    shareFinalAchievement(guideTitle) {
        const text = `Alhamdulillah! Saya berjaya menguasai kemahiran "${guideTitle}" secara terperinci di Jom-Mula. Aplikasi ini sangat membantu! Cubalah: ${window.location.href}`;
        
        // Letupkan kesan visual sebelum share
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        this.fallbackShare(text);
    },

    // 3. Fallback: WhatsApp & Telegram
    fallbackShare(text) {
        const encodedText = encodeURIComponent(text);
        const waUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
        
        // Buka window baru
        window.open(waUrl, '_blank');
    },

    // 4. Notifikasi Kecil (Toast)
    notifySuccess(msg) {
        const toast = document.createElement('div');
        toast.className = "fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full text-sm shadow-xl z-50 animate-bounce";
        toast.innerText = msg;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 3000);
    }
};

// Contoh penggunaan:
// JomMulaShare.shareProgress("Masak Nasi", 2, 5);
