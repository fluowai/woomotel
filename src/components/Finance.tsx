import { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn, formatCurrency } from '../lib/utils';

const transactions = [
  { id: '1', description: 'Saída Suíte 102', category: 'Estadia', amount: 450.00, type: 'income', date: 'Hoje, 14:20' },
  { id: '2', description: 'Reposição Frigobar', category: 'Estoque', amount: -1200.00, type: 'expense', date: 'Hoje, 11:30' },
  { id: '3', description: 'Saída Suíte 301', category: 'Estadia', amount: 890.00, type: 'income', date: 'Hoje, 09:15' },
  { id: '4', description: 'Pagamento Energia', category: 'Contas Fixas', amount: -3450.00, type: 'expense', date: 'Ontem, 16:45' },
  { id: '5', description: 'Consumo Bar Suíte 205', category: 'Consumo', amount: 125.50, type: 'income', date: 'Ontem, 22:10' },
];

export default function Finance() {
  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
              <TrendingUp size={24} />
            </div>
            <span className="flex items-center text-xs font-bold text-emerald-600">
              <ArrowUpRight size={14} className="mr-1" /> +12%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500">Receita Mensal</p>
            <h4 className="mt-1 text-2xl font-bold text-slate-900">{formatCurrency(48250.00)}</h4>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-2xl bg-red-50 p-3 text-red-600">
              <TrendingDown size={24} />
            </div>
            <span className="flex items-center text-xs font-bold text-red-600">
              <ArrowDownRight size={14} className="mr-1" /> +5%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500">Despesas Mensais</p>
            <h4 className="mt-1 text-2xl font-bold text-slate-900">{formatCurrency(12400.00)}</h4>
          </div>
        </div>

        <div className="rounded-3xl border border-indigo-600 bg-indigo-600 p-6 shadow-lg shadow-indigo-200 text-white">
          <div className="flex items-center justify-between">
            <div className="rounded-2xl bg-white/20 p-3 text-white">
              <DollarSign size={24} />
            </div>
            <span className="flex items-center text-xs font-bold text-indigo-100">
              Saldo Líquido
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-indigo-100">Lucro Estimado</p>
            <h4 className="mt-1 text-2xl font-bold">{formatCurrency(35850.00)}</h4>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Fluxo de Caixa</h3>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Download size={18} />
              <span>Exportar</span>
            </button>
            <button className="flex items-center space-x-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              <Calendar size={18} />
              <span>Período</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-2xl border border-slate-50 bg-slate-50/30 p-4 transition-all hover:bg-slate-50">
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl",
                  t.type === 'income' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                )}>
                  {t.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.description}</p>
                  <p className="text-xs text-slate-500">{t.category} • {t.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  "text-sm font-bold",
                  t.type === 'income' ? "text-emerald-600" : "text-red-600"
                )}>
                  {t.type === 'income' ? '+' : ''} {formatCurrency(t.amount)}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Confirmado</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
