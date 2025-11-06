import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import type { DataPoint, ChartType } from '../types';
import { ChartBarIcon, ChartPieIcon, ChartLineIcon } from './Icons';
import { playSound } from '../constants';

interface Step4Props {
  data: DataPoint[];
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
}

const COLORS = ['#4ade80', '#2dd4bf', '#38bdf8', '#818cf8', '#a78bfa', '#f472b6'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-slate-200 rounded-md shadow-lg">
        <p className="font-bold">{label}</p>
        <p className="text-teal-600">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Step4_DataVisualization: React.FC<Step4Props> = ({ data, chartType, setChartType }) => {
  
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" fill="#2dd4bf" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const chartOptions: {id: ChartType, name: string, icon: React.ReactNode}[] = [
      { id: 'bar', name: 'Grafik Batang', icon: <ChartBarIcon className="w-5 h-5" />},
      { id: 'pie', name: 'Grafik Lingkaran', icon: <ChartPieIcon className="w-5 h-5" />},
      { id: 'line', name: 'Grafik Garis', icon: <ChartLineIcon className="w-5 h-5" />}
  ]

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-800">Langkah 4: Visualisasi Data</h2>
      <p className="mt-2 text-slate-600 max-w-3xl mx-auto">
        Agar lebih mudah dibaca, data bisa kita ubah menjadi gambar atau grafik. Ini disebut visualisasi data. Pilih jenis grafik yang ingin kamu lihat!
      </p>

      <div className="mt-6 flex justify-center items-center gap-2 sm:gap-4 flex-wrap">
        {chartOptions.map(option => (
             <button
                key={option.id}
                onClick={() => {
                    playSound('click');
                    setChartType(option.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    chartType === option.id
                    ? 'bg-teal-500 text-white shadow'
                    : 'bg-white text-slate-700 hover:bg-slate-100 ring-1 ring-inset ring-slate-200'
                }`}
            >
                {option.icon}
                {option.name}
            </button>
        ))}
      </div>
      
      <div className="mt-8 h-[300px]">
        {renderChart()}
      </div>
    </div>
  );
};

export default Step4_DataVisualization;
