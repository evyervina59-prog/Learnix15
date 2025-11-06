import type { Dataset, QuizQuestion } from './types';

// Sound Effect Utility
// Placed here to be accessible globally without creating circular dependencies.
let audioContext: AudioContext | null = null;
const getAudioContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {
            console.error("Web Audio API is not supported in this browser.");
            return null;
        }
    }
    return audioContext;
};

type SoundType = 'click' | 'success' | 'transition' | 'error' | 'generate' | 'select';

export const playSound = (type: SoundType) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
        ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    
    switch (type) {
        case 'click':
            gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
            break;
        
        case 'select':
            gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(587.33, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.2);
            break;

        case 'success':
            gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
            oscillator.frequency.linearRampToValueAtTime(783.99, ctx.currentTime + 0.2);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
            break;
            
        case 'transition':
            gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
            break;

        case 'error':
            gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(220, ctx.currentTime);
            oscillator.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.2);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.2);
            break;
            
        case 'generate':
            gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(300, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.3);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
            break;
    }

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1);
};


export const DUMMY_DATASETS: Dataset[] = [
  {
    id: 'nilai_siswa',
    name: 'Nilai Ujian Siswa',
    description: 'Kumpulan nilai ujian Informatika dari 10 siswa fiktif.',
    data: [
      { label: 'Andi', value: 85 },
      { label: 'Budi', value: 92 },
      { label: 'Citra', value: 78 },
      { label: 'Dewi', value: '88' }, // Dirty data (string)
      { label: 'Eka', value: 95 },
      { label: 'Fani', value: null }, // Dirty data (null)
      { label: 'Gita', value: 82 },
      { label: 'Hadi', value: 75 },
      { label: 'Indah', value: 90 },
      { label: 'Joko', value: 85 }, // Duplicate value
    ],
  },
  {
    id: 'penjualan_kantin',
    name: 'Penjualan Kantin Sekolah',
    description: 'Data penjualan beberapa item di kantin selama seminggu.',
    data: [
      { label: 'Nasi Goreng', value: 150 },
      { label: 'Mie Ayam', value: 120 },
      { label: 'Bakso', value: '135' }, // Dirty data (string)
      { label: 'Siomay', value: 95 },
      { label: 'Es Teh', value: null }, // Dirty data (null)
      { label: 'Air Mineral', value: 210 },
    ],
  },
  {
    id: 'pengguna_medsos',
    name: 'Waktu di Media Sosial',
    description: 'Estimasi waktu (menit) yang dihabiskan siswa per hari di berbagai platform.',
    data: [
      { label: 'TikTok', value: 120 },
      { label: 'Instagram', value: 90 },
      { label: 'YouTube', value: 150 },
      { label: 'WhatsApp', value: '60' }, // Dirty data (string)
      { label: 'Twitter/X', value: 45 },
      { label: 'Facebook', value: null }, // Dirty data (null)
    ],
  },
  {
    id: 'penggunaan_roblox',
    name: 'Penggunaan Game Roblox',
    description: 'Data waktu bermain (jam per minggu) game Roblox oleh beberapa siswa.',
    data: [
      { label: 'Kevin', value: 10 },
      { label: 'Lia', value: 15 },
      { label: 'Mega', value: '12' }, // Dirty data (string)
      { label: 'Nina', value: 8 },
      { label: 'Omar', value: null }, // Dirty data (null)
      { label: 'Putri', value: 18 },
      { label: 'Rian', value: 7 },
    ],
  },
  {
    id: 'whatsapp_hang',
    name: 'Penggunaan Memori WhatsApp',
    description: 'Data penggunaan memori (MB) oleh WhatsApp yang menyebabkan ponsel menjadi lambat dan hang.',
    data: [
      { label: 'Chat & Teks', value: 250 },
      { label: 'Media (Foto/Video)', value: 1200 },
      { label: 'Status Updates', value: '350' }, // Dirty data (string)
      { label: 'Panggilan Suara/Video', value: 450 },
      { label: 'Cadangan Data', value: 1800 },
      { label: 'Cache Aplikasi', value: null }, // Dirty data (null)
      { label: 'Stiker & GIF', value: 150 },
    ],
  },
  {
    id: 'info_analisis_data',
    name: 'Apa Itu Analisis Data?',
    description: 'Klik untuk membaca penjelasan mendalam tentang proses dan pentingnya analisis data.',
    content: `
      <h3 class="text-xl font-bold text-slate-800 mb-4">Definisi Analisis Data</h3>
      <p class="mb-4 text-slate-600">Analisis data adalah proses inspeksi, pembersihan, transformasi, dan pemodelan data dengan tujuan menemukan informasi yang berguna, menginformasikan kesimpulan, dan mendukung pengambilan keputusan.</p>
      <h4 class="text-lg font-semibold text-slate-700 mb-2">Mengapa Penting?</h4>
      <ul class="list-disc list-inside space-y-1 mb-4 text-slate-600">
          <li><b>Mengambil Keputusan Lebih Baik:</b> Dengan data, kita bisa membuat keputusan berdasarkan bukti, bukan sekadar firasat.</li>
          <li><b>Memahami Pola:</b> Analisis data membantu kita melihat tren atau pola yang tidak terlihat secara kasat mata. Contohnya, makanan apa yang paling laku di kantin.</li>
          <li><b>Menyelesaikan Masalah:</b> Dengan menganalisis data, kita bisa menemukan akar penyebab masalah. Misalnya, mengapa aplikasi di ponsel sering hang.</li>
      </ul>
      <h4 class="text-lg font-semibold text-slate-700 mb-2">Langkah-langkahnya (Seperti di aplikasi ini!):</h4>
      <ol class="list-decimal list-inside space-y-1 text-slate-600">
          <li><b>Pengumpulan:</b> Mengambil data dari berbagai sumber.</li>
          <li><b>Pembersihan:</b> Memperbaiki atau membuang data yang salah atau tidak lengkap.</li>
          <li><b>Pengolahan:</b> Mengatur dan memproses data agar siap dianalisis.</li>
          <li><b>Visualisasi:</b> Membuat grafik agar data mudah dipahami.</li>
          <li><b>Interpretasi:</b> Menarik kesimpulan dari hasil analisis.</li>
      </ol>
    `
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Apa langkah pertama dalam proses analisis data?",
    options: ["Visualisasi Data", "Pembersihan Data", "Pengumpulan Data", "Interpretasi Data"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Mengapa pembersihan data (data cleaning) penting?",
    options: ["Agar data terlihat lebih rapi", "Untuk memastikan data akurat dan konsisten", "Untuk membuat grafik lebih berwarna", "Agar proses analisis lebih cepat"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Contoh data 'kotor' adalah...",
    options: ["Angka 85", "Teks 'Budi'", "Data yang kosong (null)", "Semua benar"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "Apa yang dimaksud dengan 'mean' dalam pengolahan data?",
    options: ["Nilai tengah", "Nilai yang sering muncul", "Nilai rata-rata", "Nilai tertinggi"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Jika kita memiliki data nilai: 70, 80, 80, 90, 100. Berapakah modusnya?",
    options: ["70", "80", "90", "100"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "Grafik yang paling cocok untuk membandingkan jumlah penjualan antar produk di kantin adalah...",
    options: ["Grafik Garis", "Grafik Lingkaran (Pie Chart)", "Grafik Batang (Bar Chart)", "Peta"],
    correctAnswer: 2
  },
  {
    id: 7,
    question: "Grafik Lingkaran (Pie Chart) paling baik digunakan untuk menunjukkan...",
    options: ["Perbandingan antar kategori", "Tren data dari waktu ke waktu", "Distribusi frekuensi", "Proporsi atau persentase dari keseluruhan"],
    correctAnswer: 3
  },
  {
    id: 8,
    question: "Langkah terakhir dalam analisis data, di mana kita menarik kesimpulan, disebut...",
    options: ["Pengolahan Data", "Visualisasi Data", "Interpretasi Data", "Pengumpulan Data"],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "Tujuan utama dari visualisasi data adalah...",
    options: ["Membuat data menjadi rumit", "Menyembunyikan informasi penting", "Agar data lebih mudah dipahami secara visual", "Mengganti semua teks dengan gambar"],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "Manakah yang BUKAN merupakan tujuan analisis data?",
    options: ["Menemukan pola atau tren", "Mendukung pengambilan keputusan", "Membuat data menjadi tidak akurat", "Menyelesaikan suatu masalah"],
    correctAnswer: 2
  },
  {
    id: 11,
    question: "Median dari kumpulan data: 5, 2, 8, 4, 9 adalah...",
    options: ["8", "4", "5", "2"],
    correctAnswer: 2
  },
  {
    id: 12,
    question: "Mengubah data dari format string '95' menjadi angka 95 adalah bagian dari proses...",
    options: ["Pengumpulan Data", "Pembersihan Data", "Visualisasi Data", "Interpretasi Data"],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "Dataset adalah...",
    options: ["Sebuah grafik tunggal", "Kumpulan data yang terstruktur", "Kesimpulan akhir", "Sebuah pertanyaan"],
    correctAnswer: 1
  },
  {
    id: 14,
    question: "Jika ingin melihat tren nilai siswa selama satu semester, grafik apa yang paling tepat?",
    options: ["Grafik Lingkaran", "Grafik Batang", "Tabel Sederhana", "Grafik Garis"],
    correctAnswer: 3
  },
  {
    id: 15,
    question: "Informasi yang kita dapatkan setelah menganalisis data disebut...",
    options: ["Data mentah", "Wawasan (insight)", "Grafik", "Tabel"],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "Menghapus baris data yang nilainya kosong (null) adalah contoh dari...",
    options: ["Data cleaning", "Data collection", "Data visualization", "Data interpretation"],
    correctAnswer: 0
  },
  {
    id: 17,
    question: "Proses mengubah data menjadi format yang lebih berguna untuk analisis disebut...",
    options: ["Pengumpulan Data", "Pengolahan Data", "Interpretasi Data", "Pembersihan Data"],
    correctAnswer: 1
  },
  {
    id: 18,
    question: "Apa keuntungan menggunakan AI untuk interpretasi data?",
    options: ["AI selalu benar 100%", "Bisa memberikan ringkasan atau wawasan awal dengan cepat", "Tidak perlu melihat data sama sekali", "Membuat data menjadi salah"],
    correctAnswer: 1
  },
  {
    id: 19,
    question: "Data 'Waktu di Media Sosial' yang menunjukkan platform mana yang paling banyak digunakan siswa adalah contoh analisis untuk...",
    options: ["Membuat keputusan asal", "Membuang-buang waktu", "Memahami perilaku atau kebiasaan", "Menghitung total waktu"],
    correctAnswer: 2
  },
  {
    id: 20,
    question: "Mengapa penting untuk memiliki tujuan sebelum memulai analisis data?",
    options: ["Agar prosesnya lebih lama", "Supaya kita tahu informasi apa yang ingin dicari", "Tidak penting sama sekali", "Agar bisa memilih warna grafik yang bagus"],
    correctAnswer: 1
  }
];
