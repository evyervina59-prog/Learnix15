
import React, { useMemo } from 'react';
import type { DataPoint } from '../types';

interface Step3Props {
  data: DataPoint[];
}

const StatCard: React.FC<{ title: string; value: string | number; description: string }> = ({ title, value, description }) => (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center transition hover:shadow-lg hover:border-teal-300">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</h4>
        <p className="mt-1 text-4xl font-bold text-teal-600">{value}</p>
        <p className="mt-2 text-xs text-slate-500">{description}</p>
    </div>
);


const Step3_DataProcessing: React.FC<Step3Props> = ({ data }) => {
  const stats = useMemo(() => {
    const values = data.map(d => d.value).sort((a, b) => a - b);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = (sum / values.length).toFixed(2);

    let median;
    const mid = Math.floor(values.length / 2);
    if (values.length % 2 === 0) {
      median = ((values[mid - 1] + values[mid]) / 2).toFixed(2);
    } else {
      median = values[mid];
    }

    const modeMap: { [key: number]: number } = {};
    let maxCount = 0;
    let modes: number[] = [];
    values.forEach(val => {
      modeMap[val] = (modeMap[val] || 0) + 1;
      if (modeMap[val] > maxCount) {
        maxCount = modeMap[val];
        modes = [val];
      } else if (modeMap[val] === maxCount) {
        modes.push(val);
      }
    });
    
    // If every value is unique, there is no mode.
    const uniqueValues = new Set(values);
    const mode = uniqueValues.size === values.length ? 'Tidak ada' : modes.join(', ');

    return { mean, median, mode };
  }, [data]);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-800">Langkah 3: Pengolahan Data</h2>
      <p className="mt-2 text-slate-600 max-w-3xl mx-auto">
        Setelah data bersih, kita bisa mengolahnya untuk mencari tahu informasi penting seperti nilai rata-rata (mean), nilai tengah (median), dan nilai yang paling sering muncul (modus).
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Mean (Rata-rata)" value={stats.mean} description="Jumlah semua nilai dibagi banyaknya data." />
        <StatCard title="Median (Nilai Tengah)" value={stats.median} description="Nilai yang berada di tengah setelah data diurutkan." />
        <StatCard title="Modus (Nilai Sering Muncul)" value={stats.mode} description="Nilai yang paling banyak muncul dalam data." />
      </div>
    </div>
  );
};

export default Step3_DataProcessing;
