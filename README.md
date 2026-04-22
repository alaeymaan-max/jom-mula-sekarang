# 🌟 LETS' GO . Jom-Mula (PWA Guide Engine)

> **"Bimbingan terperinci untuk semua, mengikut rentak dan jiwa sendiri."**

**Jom-Mula** adalah sebuah *Progressive Web App* (PWA) yang direka dengan estetik santai ala Ko-fi. Ia bertujuan untuk menyediakan panduan langkah-demi-langkah bagi keperluan asas hidup, yang diadaptasi secara dinamik mengikut umur, tahap IQ, dan keadaan psikologi pengguna.

---

## ✨ Ciri-Ciri Utama

* **Adaptive UX:** Kandungan berubah mengikut *mood* (Rela vs Paksa) dan tahap pemahaman pengguna.
* **Offline Ready:** Berfungsi tanpa internet menggunakan Service Workers (PWA).
* **Gamification:** Sistem lencana (`badges.js`) untuk mengekalkan motivasi.
* **Viral Loop:** Integrasi perkongsian pintar (`share.js`) untuk menyebarkan kejayaan.
* **Soft UI Design:** Antara muka yang tenang, bersih, dan mesra pengguna.
* **Donation Ready:** Sistem penghargaan bersepadu untuk menyokong pencipta kandungan.

---

## 🛠️ Struktur Repository

| Fail | Peranan |
| :--- | :--- |
| `index.html` | Struktur utama aplikasi dengan Tailwind CSS. |
| `style.css` | Sentuhan estetik "Soft UI" & animasi keraian. |
| `index.js` | Enjin utama yang mengawal logik adaptif. |
| `data.js` | Perpustakaan kandungan (Database langkah-demi-langkah). |
| `editor.js` | Alat bantuan untuk membina kandungan baru dengan cepat. |
| `badges.js` | Menguruskan pencapaian dan ganjaran pengguna. |
| `confetti.js` | Kesan visual keraian (menggunakan Canvas Confetti). |
| `share.js` | Fungsi perkongsian ke media sosial & WhatsApp. |
| `donation.js` | Sistem penghargaan dan sokongan komuniti. |

---

## 🚀 Cara Bermula (Quick Start)

1.  **Clone Repository:**
    ```bash
    git clone [https://github.com/username/jom-mula.git](https://github.com/username/jom-mula.git)
    ```
2.  **Buka index.html:**
    Anda tidak perlukan *server* yang rumit. Cukup sekadar buka fail `index.html` pada pelayar web anda.
3.  **Gunakan Editor:**
    Buka fail `editor.js` atau cipta halaman editor untuk mula menambah panduan langkah-demi-langkah anda sendiri ke dalam `data.js`.

---

## 🧩 Cara Menambah Kandungan Baru

Gunakan format JSON dalam `data.js` seperti berikut:

```javascript
{
  "id": "panduan-01",
  "title": "Tajuk Panduan",
  "steps": [
    {
      "title": "Langkah Pertama",
      "text": "Penerangan terperinci di sini...",
      "motivation": "Kata-kata semangat!"
    }
  ]
}
