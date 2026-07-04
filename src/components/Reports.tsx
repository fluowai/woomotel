import { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Users, 
  PieChart as PieChartIcon,
  FileText,
  Table as TableIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line
} from 'recharts';
import { motion } from 'motion/react';
import { cn, formatCurrency } from '../lib/utils';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';

const occupancyData = [
  { date: '01/03', rate: 65 },
  { date: '05/03', rate: 72 },
  { date: '10/03', rate: 85 },
  { date: '15/03', rate: 78 },
  { date: '20/03', rate: 92 },
  { date: '25/03', rate: 88 },
  { date: '30/03', rate: 95 },
];

const revenueData = [
  { name: 'Horas (Estadia)', value: 38400, color: '#6366f1' },
  { name: 'Pernoites', value: 15200, color: '#8b5cf6' },
  { name: 'Consumo', value: 8600, color: '#10b981' },
  { name: 'Serviços', value: 1200, color: '#f59e0b' },
];

const consumptionData = [
  { item: 'Cerveja Heineken', qty: 145, revenue: 1740 },
  { item: 'Água Mineral', qty: 210, revenue: 945 },
  { item: 'Vinho Tinto', qty: 12, revenue: 1020 },
  { item: 'Preservativo', qty: 45, revenue: 360 },
  { item: 'Sabonete', qty: 320, revenue: 384 },
];

export default function Reports() {
  const [period, setPeriod] = useState('month');

  const exportCSV = () => {
    const csv = Papa.unparse(consumptionData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio_consumo_${new Date().toISOString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const doc = new jsPDF() as any;
    doc.text('Relatório de Performance de Consumo', 14, 15);
    doc.autoTable({
      startY: 20,
      head: [['Item', 'Quantidade', 'Receita']],
      body: consumptionData.map(d => [d.item, d.qty, formatCurrency(d.revenue)]),
    });
    doc.save(`relatorio_consumo_${new Date().toISOString()}.pdf`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <BarChart3 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Relatórios Avançados</h2>
            <p className="text-sm text-slate-500">Análise profunda da sua operação</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={exportCSV}
            className="flex items-center space-x-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            <TableIcon size={18} />
            <span>Exportar CSV</span>
          </button>
          <button 
            onClick={exportPDF}
            className="flex items-center space-x-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
          >
            <FileText size={18} />
            <span>Gerar PDF</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 rounded-2xl bg-slate-100 p-1 w-fit">
        {['week', 'month', 'quarter', 'year'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              "px-6 py-2 rounded-xl text-sm font-bold transition-all",
              period === p ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {p === 'week' ? 'Semana' : p === 'month' ? 'Mês' : p === 'quarter' ? 'Trimestre' : 'Ano'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Occupancy Rate Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Taxa de Ocupação</h3>
            <div className="flex items-center text-emerald-600 text-sm font-bold">
              <TrendingUp size={16} className="mr-1" /> +8.4%
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `${v}%`} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Revenue Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 className="mb-6 text-lg font-bold text-slate-900">Receita por Categoria</h3>
          <div className="flex items-center">
            <div className="h-[300px] flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 pr-8">
              {revenueData.map((item) => (
                <div key={item.name} className="flex flex-col">
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.name}</span>
                  </div>
                  <span className="ml-5 text-lg font-bold text-slate-900">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Consumption Performance Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Performance de Itens de Consumo</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Item</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Quantidade Vendida</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Receita Gerada</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {consumptionData.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-all">
                <td className="px-6 py-4 text-sm font-bold text-slate-900">{item.item}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{item.qty} un</td>
                <td className="px-6 py-4 text-sm font-bold text-indigo-600">{formatCurrency(item.revenue)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-emerald-600 text-xs font-bold">
                    <TrendingUp size={14} className="mr-1" /> +{Math.floor(Math.random() * 15)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
