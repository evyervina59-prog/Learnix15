import React, { useState, useMemo } from 'react';
import { TrophyIcon, PrinterIcon, SendIcon, ArrowPathIcon } from './Icons';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ score, totalQuestions, onRetry }) => {
  const [studentName, setStudentName] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  const correctAnswers = useMemo(() => {
    return Math.round((score / 100) * totalQuestions);
  }, [score, totalQuestions]);
  
  const resultMessage = useMemo(() => {
    if (score >= 90) return "Luar Biasa! Pemahamanmu sangat mendalam!";
    if (score >= 75) return "Kerja Bagus! Kamu sudah sangat paham materi ini.";
    if (score >= 60) return "Bagus! Terus berlatih untuk lebih mahir lagi.";
    return "Jangan Menyerah! Coba pelajari lagi materinya dan ulangi kuisnya.";
  }, [score]);
  
  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setSubmitMessage('Harap masukkan nama lengkap Anda.');
      return;
    }
    
    const recipient = 'evyervina59@guru.smp.belajar.id';
    const subject = encodeURIComponent(`Nilai Kuis Analisis Data - ${studentName}`);
    const body = encodeURIComponent(
      `Halo,\n\n` +
      `Berikut adalah hasil kuis Analisis Data saya:\n\n` +
      `Nama Siswa: ${studentName}\n` +
      `Skor: ${score}/100\n` +
      `Jawaban Benar: ${correctAnswers} dari ${totalQuestions} soal.\n\n` +
      `Terima kasih.`
    );

    // Create and open the mailto link
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    setSubmitMessage('Bagus! Sekarang tinggal kirim email yang sudah disiapkan di aplikasi email Anda.');
  };

  return (
    <div className="text-center p-4">
      <TrophyIcon className="w-20 h-20 text-yellow-400 mx-auto" />
      <h2 className="text-3xl font-bold text-slate-800 mt-4">Kuis Selesai!</h2>
      <p className="text-slate-600 mt-2">{resultMessage}</p>

      <div className="my-8 bg-teal-50 border-2 border-teal-200 rounded-xl p-6 max-w-sm mx-auto">
        <p className="text-sm font-semibold text-teal-700">SKOR AKHIR ANDA</p>
        <p className="text-6xl font-bold text-teal-600 my-2">{score}<span className="text-3xl text-slate-500">/100</span></p>
        <p className="text-sm text-slate-500">
          Kamu menjawab {correctAnswers} dari {totalQuestions} soal dengan benar.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 transition-all duration-200 w-full sm:w-auto"
        >
            <ArrowPathIcon className="w-4 h-4" />
            Ulangi Kuis
        </button>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-all duration-200 w-full sm:w-auto"
        >
          <PrinterIcon className="w-4 h-4" />
          Cetak Nilai
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 max-w-md mx-auto">
        <h4 className="font-semibold text-slate-700">Kirim Nilai via Email</h4>
        <p className="text-sm text-slate-500 mt-1">Masukkan namamu untuk membuka aplikasi email dengan laporan skor yang sudah disiapkan.</p>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                value={studentName}
                onChange={(e) => {
                    setStudentName(e.target.value);
                    if (submitMessage) setSubmitMessage(''); // Clear message on new input
                }}
                placeholder="Masukkan nama lengkap..."
                required
                className="flex-grow w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            />
            <button
                type="submit"
                disabled={!studentName}
                className="inline-flex items-center gap-2 justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 disabled:bg-slate-400 transition-all"
            >
                <SendIcon className="w-4 h-4" />
                Buat Email
            </button>
        </form>
        {submitMessage && <p className="text-indigo-600 text-sm mt-2">{submitMessage}</p>}
      </div>

    </div>
  );
};

export default QuizResult;