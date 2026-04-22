/**
 * jom-mula - PWA Guide Engine
 * Asas logik untuk penapisan panduan mengikut profil pengguna
 */

const JomMula = {
    // 1. Data Profil Pengguna (Default)
    userProfile: {
        ageGroup: 'remaja', // kanak-kanak, remaja, dewasa, warga-emas
        skillLevel: 'newbie', // newbie, intermediate, pro
        motivation: 'rela', // rela, paksa
        companion: 'kendiri' // kendiri, bimbingan
    },

    // 2. Fungsi Inisialisasi
    init() {
        console.log("🚀 Jom-Mula Engine Ready!");
        this.loadProfile();
        this.renderInterface();
    },

    // 3. Simpan Profil ke LocalStorage (Ciri PWA)
    saveProfile(data) {
        this.userProfile = { ...this.userProfile, ...data };
        localStorage.setItem('jomMula_Profile', JSON.stringify(this.userProfile));
        this.renderInterface();
    },

    // 4. Muat Profil Tersimpan
    loadProfile() {
        const saved = localStorage.getItem('jomMula_Profile');
        if (saved) this.userProfile = JSON.parse(saved);
    },

    // 5. Logik Penentuan "Tone" & Kandungan
    getContentTone() {
        const { motivation, companion } = this.userProfile;
        
        if (motivation === 'paksa') {
            return "Direct & Efisien: Fokus pada langkah paling pantas.";
        } else if (companion === 'bimbingan') {
            return "Suasana Kolaboratif: Tips untuk pembimbing disertakan.";
        }
        return "Inspirasional: Galakan dan eksplorasi kendiri.";
    },

    // 6. Fungsi Render (UI Update)
    renderInterface() {
        const toneElement = document.getElementById('tone-display');
        if (toneElement) {
            toneElement.innerText = `Mod Semasa: ${this.getContentTone()}`;
        }
    }
};

// Jalankan aplikasi apabila DOM siap
document.addEventListener('DOMContentLoaded', () => JomMula.init());
