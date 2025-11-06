import React, { useState, useEffect } from 'react';

interface MascotProps {
  currentStep: number;
}

const mascotMessages: { [key: number]: string } = {
  1: "Halo, Penjelajah Data! Aku Datanaut. Tugas pertama kita adalah memilih set data. Ini seperti memilih peta harta karun!",
  2: "Kadang data itu sedikit berantakan. Jangan khawatir! Kita akan membersihkannya agar kinclong dan siap diolah. Anggap saja ini seperti merapikan kamarmu.",
  3: "Waktunya berhitung! Mean, Median, dan Modus adalah 3 'jurus' andalan kita untuk memahami inti dari data. Keren, kan?",
  4: "Angka-angka itu bagus, tapi gambar lebih bercerita! Ayo kita ubah data kita menjadi grafik yang menarik agar lebih mudah dipahami.",
  5: "Ini bagian paling seru! Kita akan mencari tahu 'cerita' di balik data ini. Aku bisa bantu kamu dengan kekuatan AI-ku!",
};

const DatanautSVG: React.FC = () => (
    <svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
        {/* Body */}
        <rect x="20" y="60" width="80" height="80" rx="40" fill="#f8fafc" />
        <rect x="20" y="85" width="80" height="20" fill="#e2e8f0" />
        
        {/* Head */}
        <rect x="30" y="10" width="60" height="60" rx="15" fill="#4f46e5" />
        
        {/* Eye */}
        <circle cx="60" cy="40" r="15" fill="#f8fafc" />
        <circle cx="60" cy="40" r="7" fill="#2dd4bf" />
        <circle cx="63" cy="37" r="3" fill="white" />
        
        {/* Antenna */}
        <line x1="60" y1="10" x2="60" y2="0" stroke="#4f46e5" strokeWidth="4" />
        <circle cx="60" cy="5" r="5" fill="#f43f5e" />
        
        {/* Arms waving */}
        <path d="M20 80 C 5 80, 5 110, 15 115" stroke="#c7d2fe" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M100 80 C 115 80, 115 110, 105 115" stroke="#c7d2fe" strokeWidth="12" fill="none" strokeLinecap="round" />
    </svg>
);


const Mascot: React.FC<MascotProps> = ({ currentStep }) => {
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(false); // Hide bubble first
        const timer = setTimeout(() => {
            setMessage(mascotMessages[currentStep]);
            setIsVisible(true); // Then show with new message
        }, 500); // Delay to sync with page transition

        return () => clearTimeout(timer);
    }, [currentStep]);
  
    return (
        <div className="fixed bottom-4 right-4 z-40 no-print hidden md:block" aria-live="polite">
            <div className="relative">
                <div 
                    className={`absolute bottom-[160px] right-0 mb-3 w-64 bg-white p-4 rounded-xl shadow-lg border border-slate-200 transition-all duration-300 ease-out origin-bottom-right ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                >
                    <p className="text-sm text-slate-700">{message}</p>
                    <div className="absolute right-6 -bottom-2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[12px] border-t-white border-r-[10px] border-r-transparent"></div>
                </div>
                <div className="transition-transform duration-500 hover:scale-105 animate-float">
                    <DatanautSVG />
                </div>
            </div>
        </div>
    );
};

export default Mascot;