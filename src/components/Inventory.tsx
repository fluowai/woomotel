import { useState } from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  AlertTriangle, 
  ArrowUp, 
  ArrowDown,
  Filter,
  MoreVertical
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const inventoryItems = [
  { id: '1', name: 'Cerveja Heineken 330ml', category: 'Bebidas', stock: 142, minStock: 50, price: 12.00 },
  { id: '2', name: 'Água Mineral 500ml', category: 'Bebidas', stock: 210, minStock: 100, price: 4.50 },
  { id: '3', name: 'Preservativo Unitário', category: 'Higiene', stock: 15, minStock: 20, price: 8.00 },
  { id: '4', name: 'Toalha de Banho Branca', category: 'Enxoval', stock: 85, minStock: 30, price: 45.00 },
  { id: '5', name: 'Sabonete 20g', category: 'Higiene', stock: 450, minStock: 100, price: 1.20 },
  { id: '6', name: 'Vinho Tinto Seco 750ml', category: 'Bebidas', stock: 8, minStock: 10, price: 85.00 },
];

export default function Inventory() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar item..."
              className="h-11 w-64 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex h-11 items-center space-x-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
            <span>Filtros</span>
          </button>
        </div>
        
        <button className="flex h-11 items-center space-x-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700">
          <Plus size={20} />
          <span>Novo Item</span>
        </button>
      </div>

      {/* Low Stock Alerts */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {inventoryItems.filter(i => i.stock <= i.minStock).map(item => (
          <div key={item.id} className="flex items-center space-x-4 rounded-2xl border border-amber-100 bg-amber-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900">{item.name}</p>
              <p className="text-xs text-amber-700">Estoque baixo: {item.stock} unidades</p>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Item</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Categoria</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Estoque</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Preço Unit.</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {inventoryItems.map((item) => (
              <tr key={item.id} className="group hover:bg-slate-50/50 transition-all">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <Package size={20} />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className={cn(
                      "text-sm font-bold",
                      item.stock <= item.minStock ? "text-red-600" : "text-slate-900"
                    )}>
                      {item.stock}
                    </span>
                    <span className="text-xs text-slate-400">/ {item.minStock}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                  R$ {item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  {item.stock <= item.minStock ? (
                    <span className="flex items-center text-xs font-bold text-red-600">
                      <ArrowDown size={14} className="mr-1" /> Reposição
                    </span>
                  ) : (
                    <span className="flex items-center text-xs font-bold text-emerald-600">
                      <ArrowUp size={14} className="mr-1" /> Estável
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
