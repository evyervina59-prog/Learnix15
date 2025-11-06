import React, { useRef, useState } from 'react';
import { XMarkIcon, CheckCircleIcon } from './Icons';
import { playSound } from '../constants';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmbedModal: React.FC<EmbedModalProps> = ({ isOpen, onClose }) => {
  const [copyText, setCopyText] = useState('Salin Kode');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const embedCode = `<iframe 
  src="${window.location.origin}/embed.html" 
  width="100%" 
  height="800" 
  style="border:1px solid #ccc; border-radius: 12px;" 
  title="Data Explorer Interaktif"
  allowfullscreen>
</iframe>`;

  const handleCopy = () => {
    if (textAreaRef.current) {
      playSound('success');
      navigator.clipboard.writeText(textAreaRef.current.value);
      setCopyText('Berhasil Disalin!');
      setTimeout(() => {
        setCopyText('Salin Kode');
      }, 2000);
    }
  };
  
  const handleClose = () => {
      playSound('click');
      onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 no-print" aria-modal="true" role="dialog">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
                <div className="text-left">
                    <h3 className="text-lg font-bold text-slate-900">Sematkan di Situs Anda</h3>
                    <p className="mt-1 text-sm text-slate-500">
                        Salin dan tempel kode ini ke dalam HTML situs Anda.
                    </p>
                </div>
                <button
                    onClick={handleClose}
                    className="text-slate-500 hover:text-slate-800 transition-colors"
                    aria-label="Tutup"
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
            </div>
          
            <div className="mt-4">
            <textarea
              ref={textAreaRef}
              readOnly
              className="w-full h-40 p-3 font-mono text-sm text-slate-700 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
              value={embedCode}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300"
            >
              {copyText === 'Salin Kode' ? 'Salin Kode' : <CheckCircleIcon className="w-5 h-5" />}
              {copyText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedModal;