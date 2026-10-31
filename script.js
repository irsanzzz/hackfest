// ======================================
// DATA BEASISWA
// ======================================

// ======================================
// KONEKSI BACKEND GEMMA
// ======================================

const API_URL = "https://aluminum-delay-legibly.ngrok-free.dev";

// Data berikut merupakan contoh untuk tampilan website.
// Ganti dengan informasi dan pengumuman beasiswa yang sudah diverifikasi.

const scholarships = [
    {
        id: 1,
        name: "Beasiswa Prestasi Akademik",
        category: "akademik",
        categoryName: "Akademik",
        faculty: "semua",
        description: "Contoh informasi bantuan pendidikan bagi mahasiswa dengan prestasi akademik yang baik.",
        benefit: "Bantuan biaya pendidikan",
        deadline: "Periksa pengumuman resmi",
        icon: "fa-graduation-cap",
        requirements: [
            "Terdaftar sebagai mahasiswa aktif UMSU.",
            "Memiliki IPK sesuai ketentuan penyelenggara.",
            "Melengkapi dokumen akademik.",
            "Mengikuti proses seleksi."
        ],
        url: ""
    },

    {
        id: 2,
        name: "Beasiswa Bantuan Ekonomi",
        category: "ekonomi",
        categoryName: "Ekonomi",
        faculty: "semua",
        description: "Contoh program bantuan pendidikan bagi mahasiswa yang membutuhkan dukungan finansial.",
        benefit: "Bantuan biaya pendidikan",
        deadline: "Periksa pengumuman resmi",
        icon: "fa-hand-holding-heart",
        requirements: [
            "Mahasiswa aktif UMSU.",
            "Melampirkan dokumen pendukung kondisi ekonomi.",
            "Melampirkan Kartu Tanda Mahasiswa.",
            "Mengikuti proses verifikasi."
        ],
        url: ""
    },

    {
        id: 3,
        name: "Beasiswa Prestasi Nonakademik",
        category: "prestasi",
        categoryName: "Prestasi",
        faculty: "semua",
        description: "Contoh program beasiswa untuk mahasiswa yang memiliki prestasi di bidang olahraga, seni, atau organisasi.",
        benefit: "Bantuan pendidikan",
        deadline: "Periksa pengumuman resmi",
        icon: "fa-trophy",
        requirements: [
            "Mahasiswa aktif UMSU.",
            "Memiliki bukti prestasi nonakademik.",
            "Melampirkan sertifikat atau piagam.",
            "Memenuhi persyaratan penyelenggara."
        ],
        url: ""
    },

    {
        id: 4,
        name: "Beasiswa Pengembangan Riset",
        category: "akademik",
        categoryName: "Akademik",
        faculty: "Ilmu Komputer dan Teknologi Informasi",
        description: "Contoh program dukungan bagi mahasiswa yang mengembangkan penelitian atau inovasi.",
        benefit: "Dukungan kegiatan penelitian",
        deadline: "Periksa pengumuman resmi",
        icon: "fa-flask",
        requirements: [
            "Mahasiswa aktif UMSU.",
            "Memiliki proposal penelitian.",
            "Mendapatkan persetujuan pembimbing jika dipersyaratkan.",
            "Memenuhi ketentuan program."
        ],
        url: ""
    },

    {
        id: 5,
        name: "Beasiswa Pendidikan Eksternal",
        category: "eksternal",
        categoryName: "Eksternal",
        faculty: "semua",
        description: "Contoh kategori beasiswa dari lembaga pemerintah, perusahaan, atau organisasi di luar kampus.",
        benefit: "Sesuai ketentuan penyelenggara",
        deadline: "Periksa pengumuman resmi",
        icon: "fa-building-columns",
        requirements: [
            "Mahasiswa aktif UMSU jika program menerima mahasiswa UMSU.",
            "Memenuhi persyaratan penyelenggara.",
            "Menyiapkan dokumen pendaftaran.",
            "Mengikuti seleksi."
        ],
        url: ""
    },

    {
        id: 6,
        name: "Beasiswa Dukungan Pendidikan",
        category: "ekonomi",
        categoryName: "Ekonomi",
        faculty: "semua",
        description: "Contoh kategori bantuan untuk mendukung keberlanjutan pendidikan mahasiswa.",
        benefit: "Sesuai ketentuan program",
        deadline: "Periksa pengumuman resmi",
        icon: "fa-book-open",
        requirements: [
            "Mahasiswa aktif UMSU.",
            "Melengkapi formulir pendaftaran.",
            "Melampirkan dokumen akademik.",
            "Mengikuti proses seleksi."
        ],
        url: ""
    }
];


// ======================================
// ELEMENT HTML
// ======================================

const scholarshipList = document.getElementById("scholarshipList");
const favoriteList = document.getElementById("favoriteList");

const searchInput = document.getElementById("searchInput");
const facultyFilter = document.getElementById("facultyFilter");
const categoryFilter = document.getElementById("categoryFilter");

const resultCount = document.getElementById("resultCount");
const resetButton = document.getElementById("resetButton");

const detailModal = document.getElementById("detailModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");


// ======================================
// FAVORIT DENGAN LOCAL STORAGE
// ======================================

let favorites = JSON.parse(
    localStorage.getItem("favoritUMSU") || "[]"
);

function saveFavorites() {
    localStorage.setItem(
        "favoritUMSU",
        JSON.stringify(favorites)
    );
}


// ======================================
// MEMBUAT CARD BEASISWA
// ======================================

function createCard(item) {

    const isFavorite = favorites.includes(item.id);

    return `
        <div class="scholarship-card">

            <div class="card-top">

                <div class="card-icon">
                    <i class="fas ${item.icon}"></i>
                </div>

                <button
                    class="favorite-btn ${isFavorite ? "active" : ""}"
                    onclick="toggleFavorite(${item.id})"
                    aria-label="Simpan favorit"
                >
                    <i class="${isFavorite ? "fas" : "far"} fa-heart"></i>
                </button>

            </div>

            <span class="card-category">
                ${item.categoryName}
            </span>

            <h3>${item.name}</h3>

            <p>${item.description}</p>

            <div class="card-info">

                <span>
                    <i class="fas fa-wallet"></i>
                    ${item.benefit}
                </span>

                <span>
                    <i class="fas fa-university"></i>
                    UMSU
                </span>

            </div>

            <button
                class="detail-btn"
                onclick="showDetail(${item.id})"
            >
                Lihat Detail
                <i class="fas fa-arrow-right"></i>
            </button>

        </div>
    `;
}


// ======================================
// MENAMPILKAN BEASISWA
// ======================================

function displayScholarships(data) {

    if (data.length === 0) {

        scholarshipList.innerHTML = `
            <div class="empty-message">
                <i class="fas fa-search"></i>
                <h3>Beasiswa tidak ditemukan</h3>
                <p>Coba gunakan kata kunci atau filter lainnya.</p>
            </div>
        `;

    } else {

        scholarshipList.innerHTML = data
            .map(item => createCard(item))
            .join("");

    }

    resultCount.textContent =
        `${data.length} Beasiswa ditemukan`;
}


// ======================================
// FITUR PENCARIAN DAN FILTER
// ======================================

function filterScholarships() {

    const keyword = searchInput.value.toLowerCase().trim();

    const selectedFaculty = facultyFilter.value;
    const selectedCategory = categoryFilter.value;

    const filtered = scholarships.filter(item => {

        const matchSearch =
            item.name.toLowerCase().includes(keyword) ||
            item.description.toLowerCase().includes(keyword) ||
            item.categoryName.toLowerCase().includes(keyword);

        const matchFaculty =
            selectedFaculty === "semua" ||
            item.faculty === "semua" ||
            item.faculty === selectedFaculty;

        const matchCategory =
            selectedCategory === "semua" ||
            item.category === selectedCategory;

        return matchSearch && matchFaculty && matchCategory;

    });

    displayScholarships(filtered);
}


// ======================================
// TOMBOL RESET FILTER
// ======================================

resetButton.addEventListener("click", () => {

    searchInput.value = "";
    facultyFilter.value = "semua";
    categoryFilter.value = "semua";

    displayScholarships(scholarships);

});


// ======================================
// EVENT SEARCH
// ======================================

searchInput.addEventListener(
    "input",
    filterScholarships
);

facultyFilter.addEventListener(
    "change",
    filterScholarships
);

categoryFilter.addEventListener(
    "change",
    filterScholarships
);


// ======================================
// TAMBAH DAN HAPUS FAVORIT
// ======================================

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites = favorites.filter(
            favoriteId => favoriteId !== id
        );

    } else {

        favorites.push(id);

    }

    saveFavorites();

    filterScholarships();
    displayFavorites();
}


// ======================================
// MENAMPILKAN FAVORIT
// ======================================

function displayFavorites() {

    const favoriteScholarships = scholarships.filter(
        item => favorites.includes(item.id)
    );

    if (favoriteScholarships.length === 0) {

        favoriteList.innerHTML = `
            <div class="empty-message">
                <i class="far fa-heart"></i>
                <h3>Belum Ada Beasiswa Favorit</h3>
                <p>Klik ikon hati pada beasiswa untuk menyimpannya.</p>
            </div>
        `;

    } else {

        favoriteList.innerHTML = favoriteScholarships
            .map(item => createCard(item))
            .join("");

    }
}


// ======================================
// DETAIL BEASISWA
// ======================================

function showDetail(id) {

    const item = scholarships.find(
        scholarship => scholarship.id === id
    );

    if (!item) return;

    modalContent.innerHTML = `

        <span class="card-category">
            ${item.categoryName}
        </span>

        <h2>${item.name}</h2>

        <p>${item.description}</p>

        <h4>Informasi Beasiswa</h4>

        <p>
            <strong>Target:</strong> Mahasiswa aktif UMSU
        </p>

        <p>
            <strong>Manfaat:</strong> ${item.benefit}
        </p>

        <p>
            <strong>Batas pendaftaran:</strong> ${item.deadline}
        </p>

        <h4>Persyaratan</h4>

        <ul>
            ${item.requirements
                .map(requirement => `<li>${requirement}</li>`)
                .join("")}
        </ul>

        ${
            item.url
            ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="modal-link">
                    Kunjungi Pendaftaran
               </a>`
            : `<p class="modal-link" style="cursor:default">
                    Informasi pendaftaran belum ditambahkan
               </p>`
        }

    `;

    detailModal.classList.add("show");

}


// ======================================
// TUTUP MODAL
// ======================================

closeModal.addEventListener("click", () => {
    detailModal.classList.remove("show");
});

detailModal.addEventListener("click", (event) => {

    if (event.target === detailModal) {
        detailModal.classList.remove("show");
    }

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        detailModal.classList.remove("show");
    }

});


// ======================================
// MOBILE MENU
// ======================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

});

navMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });

});


// ======================================
// JALANKAN WEBSITE
// ======================================

displayScholarships(scholarships);
displayFavorites();

// ======================================
// CHATBOT AI GEMMA
// ======================================

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const sendButton = document.getElementById("sendButton");

// Menampilkan pesan di layar
function addMessage(text, className) {
    const message = document.createElement("div");

    message.className = `message ${className}`;
    message.textContent = text;

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return message;
}

// Mengirim pertanyaan ke Gemma
if (chatForm) {
    chatForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const question = chatInput.value.trim();

        if (!question) return;

        // Tampilkan pertanyaan mahasiswa
        addMessage(question, "user-message");

        chatInput.value = "";
        sendButton.disabled = true;

        // Tampilkan loading
        const loading = addMessage(
            "Gemma sedang berpikir...",
            "bot-message"
        );

        try {

            const response = await fetch(`${API_URL}/chat`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                },

                body: JSON.stringify({
                    message: question
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Gagal menghubungi Gemma");
            }

            // Tampilkan jawaban Gemma
            loading.textContent = data.reply;

        } catch (error) {

            console.error("Chatbot error:", error);

            loading.textContent =
                "Maaf, Gemma belum bisa dihubungi. Periksa koneksi backend.";

        } finally {

            sendButton.disabled = false;
            chatInput.focus();

        }

    });
}


// BUKA DAN TUTUP CHAT GEMMA

const chatToggle = document.getElementById("chatToggle");
const chatWidget = document.getElementById("chatWidget");
const closeChat = document.getElementById("closeChat");

chatToggle.addEventListener("click", () => {
    chatWidget.classList.toggle("active");
});

closeChat.addEventListener("click", () => {
    chatWidget.classList.remove("active");
});
