import React, { useState } from 'react';
import type { Dataset, DataPoint } from '../types';
import { playSound } from '../constants';

interface Step2Props {
  dataset: Dataset;
  onClean: (data: DataPoint[]) => void;
}

const Step2_DataCleaning: React.FC<Step2Props> = ({ dataset, onClean }) => {
  const [isCleaning, setIsCleaning] = useState(false);

  const cleanData = () => {
    // 1. Convert string numbers to actual numbers
    // 2. Filter out null or invalid values
    // 3. For this example, we will just filter, but in reality we might average or use other methods for nulls.
    const cleaned = dataset.data
      .map(d => ({ ...d, value: d.value === null ? null : Number(d.value) }))
      .filter(d => d.value !== null && !isNaN(d.value)) as DataPoint[];
    return cleaned;
  };

  const handleCleanClick = () => {
    playSound('generate');
    setIsCleaning(true);
    setTimeout(() => {
      onClean(cleanData());
    }, 1500); // Simulate cleaning process
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-800">Langkah 2: Pembersihan Data</h2>
      <p className="mt-2 text-slate-600 max-w-3xl mx-auto">
        Data di dunia nyata seringkali "kotor" (tidak lengkap atau salah format). Kita perlu membersihkannya terlebih dahulu. Lihat data <span className="font-bold text-teal-600">{dataset.name}</span> di bawah ini.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Label</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {dataset.data.map((item, index) => {
              const isDirty = item.value === null || typeof item.value === 'string';
              return (
                <tr key={index} className={`transition-all duration-500 ${isCleaning && isDirty ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.label}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDirty ? 'text-red-500 font-bold' : 'text-slate-500'}`}>
                    {item.value === null ? 'KOSONG' : String(item.value)}
                    {isDirty && <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Kotor!</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <button
          onClick={handleCleanClick}
          disabled={isCleaning}
          className="px-6 py-3 text-base font-semibold text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 disabled:bg-slate-400 disabled:cursor-wait transition-all duration-300"
        >
          {isCleaning ? 'Membersihkan...' : 'Mulai Bersihkan Data'}
        </button>
      </div>
    </div>
  );
};

export default Step2_DataCleaning;
