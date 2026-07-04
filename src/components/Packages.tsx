import { useState } from 'react';
import { 
  Gift, 
  Plus, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Trash2, 
  Tag, 
  Coffee, 
  Wine, 
  Bed,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatCurrency } from '../lib/utils';

const initialPackages = [
  { 
    id: '1', 
    name: 'Pacote Romântico', 
    description: 'Decoração especial, espumante e café da manhã no quarto.', 
    price: 450, 
    discount: 15, 
    items: ['Hospedagem', 'Decoração', 'Espumante', 'Café da Manhã'],
    active: true,
    color: 'bg-rose-50 text-rose-600 border-rose-100'
  },
  { 
    id: '2', 
    name: 'Fim de Semana Relax', 
    description: '2 diárias com massagem inclusa e check-out tardio.', 
    price: 780, 
    discount: 20, 
    items: ['Hospedagem (2d)', 'Massagem', 'Late Check-out'],
    active: true,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
  },
  { 
    id: '3', 
    name: 'Combo Executivo', 
    description: 'Diária com estacionamento e lavanderia inclusos.', 
    price: 320, 
    discount: 10, 
    items: ['Hospedagem', 'Estacionamento', 'Lavanderia'],
    active: false,
    color: 'bg-slate-100 text-slate-600 border-slate-200'
  },
];

export default function Packages() {
  const [packages, setPackages] = useState(initialPackages);
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <Gift size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Pacotes e Promoções</h2>
            <p className="text-sm text-slate-500">Crie ofertas irresistíveis para seus hóspedes</p>
          </div>
        </div>
        <button className="flex h-11 items-center space-x-2 rounded-xl bg-indigo-600 px-6 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700">
          <Plus size={20} />
          <span>Criar Pacote</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar pacote..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            className={cn(
              "relative overflow-hidden rounded-[2rem] border bg-white p-6 shadow-sm transition-all hover:shadow-md",
              !pkg.active && "opacity-60 grayscale"
            )}
          >
            <div className="mb-6 flex items-start justify-between">
              <div className={cn("rounded-2xl border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest", pkg.color)}>
                {pkg.active ? 'Ativo' : 'Inativo'}
              </div>
              <div className="flex space-x-1">
                <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-indigo-600">
                  <Edit3 size={18} />
                </button>
                <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
            <p className="mt-2 text-sm text-slate-500 line-clamp-2">{pkg.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {pkg.items.map((item, i) => (
                <span key={i} className="flex items-center rounded-lg bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-600 border border-slate-100">
                  <Sparkles size={10} className="mr-1 text-indigo-500" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-end justify-between">
              <div>
                <div className="flex items-center text-xs text-slate-400 line-through">
                  {formatCurrency(pkg.price / (1 - pkg.discount / 100))}
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-black text-slate-900">{formatCurrency(pkg.price)}</span>
                  <span className="text-xs font-bold text-emerald-600">-{pkg.discount}% OFF</span>
                </div>
              </div>
              <button 
                className={cn(
                  "rounded-xl px-4 py-2 text-xs font-bold transition-all",
                  pkg.active 
                    ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                )}
              >
                {pkg.active ? 'Ativar Promoção' : 'Reativar'}
              </button>
            </div>
          </motion.div>
        ))}

        {/* Add New Card */}
        <button className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 p-8 text-slate-400 transition-all hover:border-indigo-300 hover:bg-indigo-50/30 hover:text-indigo-600">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all group-hover:bg-indigo-100 group-hover:text-indigo-600">
            <Plus size={32} />
          </div>
          <span className="text-sm font-bold">Criar Novo Pacote</span>
          <p className="mt-1 text-center text-xs text-slate-400">Combine serviços e aumente seu ticket médio</p>
        </button>
      </div>
    </div>
  );
}
