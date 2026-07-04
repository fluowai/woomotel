import { useState, useEffect } from 'react';
import { 
  Brush, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Minus,
  ShoppingCart,
  ChevronRight,
  History,
  Bell,
  X,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatCurrency } from '../lib/utils';

const rooms = [
  { id: '101', number: '101', status: 'dirty', type: 'Suíte Luxo', dirtyAt: new Date(Date.now() - 25 * 60000).toISOString() },
  { id: '102', number: '102', status: 'cleaning', type: 'Suíte Master', camareira: 'Maria' },
  { id: '103', number: '103', status: 'available', type: 'Standard' },
  { id: '104', number: '104', status: 'dirty', type: 'Standard', dirtyAt: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: '201', number: '201', status: 'cleaning', type: 'Suíte Luxo', camareira: 'Ana' },
  { id: '202', number: '202', status: 'maintenance', type: 'Suíte Master' },
];

const mockInventory = [
  { id: '1', name: 'Cerveja Heineken', price: 12.00, category: 'Bebidas' },
  { id: '2', name: 'Água Mineral', price: 4.50, category: 'Bebidas' },
  { id: '3', name: 'Preservativo', price: 8.00, category: 'Higiene' },
  { id: '4', name: 'Vinho Tinto', price: 85.00, category: 'Bebidas' },
  { id: '5', name: 'Chocolate', price: 15.00, category: 'Snacks' },
];

export default function Housekeeping() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [now, setNow] = useState(Date.now());
  const [selectedRoomForConsumption, setSelectedRoomForConsumption] = useState<any>(null);
  const [consumptionItems, setConsumptionItems] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000); // Update every 30s
    return () => clearInterval(timer);
  }, []);

  const getDirtyDuration = (dirtyAt?: string) => {
    if (!dirtyAt) return 0;
    const diff = now - new Date(dirtyAt).getTime();
    return Math.floor(diff / 60000); // minutes
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setConsumptionItems(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [itemId]: next };
    });
  };

  const totalConsumption = Object.entries(consumptionItems).reduce((acc, [id, qty]) => {
    const item = mockInventory.find(i => i.id === id);
    const price = item?.price || 0;
    return acc + (price * Number(qty));
  }, 0);

  return (
    <div className="mx-auto max-w-md space-y-6">
      {/* Mobile-first Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <Brush size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Camareiras</h2>
            <p className="text-xs text-slate-500">Operação em tempo real</p>
          </div>
        </div>
        <button className="rounded-full bg-slate-100 p-2 text-slate-600">
          <History size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-slate-100 p-1">
        <button
          onClick={() => setActiveTab('tasks')}
          className={cn(
            "flex-1 rounded-xl py-2.5 text-sm font-bold transition-all",
            activeTab === 'tasks' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
          )}
        >
          Tarefas
        </button>
        <button
          onClick={() => setActiveTab('consumption')}
          className={cn(
            "flex-1 rounded-xl py-2.5 text-sm font-bold transition-all",
            activeTab === 'consumption' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
          )}
        >
          Consumo
        </button>
      </div>

      {/* Room List */}
      <div className="space-y-4">
        {rooms.map((room) => {
          const dirtyDuration = getDirtyDuration(room.dirtyAt);
          const isUrgent = room.status === 'dirty' && dirtyDuration >= 15;

          return (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border bg-white p-4 shadow-sm transition-all hover:border-indigo-200",
                isUrgent ? "border-red-200 ring-2 ring-red-100" : "border-slate-200"
              )}
            >
              {isUrgent && (
                <div className="absolute right-0 top-0 rounded-bl-xl bg-red-600 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-white shadow-sm">
                  Urgente
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "flex h-14 w-14 flex-col items-center justify-center rounded-2xl border transition-colors",
                    isUrgent ? "bg-red-50 border-red-100" : "bg-slate-50 border-slate-100"
                  )}>
                    <span className={cn("text-xl font-black", isUrgent ? "text-red-600" : "text-slate-900")}>{room.number}</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Suíte</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{room.type}</h4>
                    <div className="flex items-center mt-1">
                      <StatusBadge status={room.status} />
                      {room.status === 'dirty' && (
                        <span className={cn(
                          "ml-2 flex items-center text-[10px] font-medium",
                          isUrgent ? "text-red-600" : "text-slate-400"
                        )}>
                          <Clock size={10} className="mr-1" />
                          {dirtyDuration} min atrás
                        </span>
                      )}
                      {room.camareira && (
                        <span className="ml-2 text-[10px] text-slate-400">por {room.camareira}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isUrgent && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Bell size={18} className="text-red-500" />
                    </motion.div>
                  )}
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-400" />
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                {room.status === 'dirty' ? (
                  <button className={cn(
                    "flex flex-1 items-center justify-center space-x-2 rounded-xl py-3 text-xs font-bold text-white shadow-lg transition-all",
                    isUrgent ? "bg-red-600 shadow-red-100 hover:bg-red-700" : "bg-indigo-600 shadow-indigo-100 hover:bg-indigo-700"
                  )}>
                    <Brush size={14} />
                    <span>Iniciar Limpeza</span>
                  </button>
                ) : room.status === 'cleaning' ? (
                  <button className="flex flex-1 items-center justify-center space-x-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-100">
                    <CheckCircle2 size={14} />
                    <span>Concluir</span>
                  </button>
                ) : null}
                
                <button 
                  onClick={() => setSelectedRoomForConsumption(room)}
                  className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  <span className="text-xs font-bold">Consumo</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Consumption Modal */}
      <AnimatePresence>
        {selectedRoomForConsumption && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRoomForConsumption(null)}
              className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-[32px] bg-white p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Package size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Lançar Consumo</h3>
                    <p className="text-xs text-slate-500">Suíte {selectedRoomForConsumption.number}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedRoomForConsumption(null)}
                  className="rounded-full bg-slate-100 p-2 text-slate-400 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[40vh] space-y-3 overflow-y-auto pr-2">
                {mockInventory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.name}</p>
                      <p className="text-xs text-indigo-600 font-medium">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 active:scale-90 transition-transform"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-slate-900">
                        {consumptionItems[item.id] || 0}
                      </span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white active:scale-90 transition-transform"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-slate-100 pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">Total Lançado</span>
                  <span className="text-xl font-black text-indigo-600">{formatCurrency(totalConsumption)}</span>
                </div>
                <button 
                  disabled={totalConsumption === 0}
                  onClick={() => {
                    // Mock save
                    setSelectedRoomForConsumption(null);
                    setConsumptionItems({});
                  }}
                  className="flex w-full items-center justify-center rounded-2xl bg-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all"
                >
                  Confirmar Lançamento
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Action Button for Inventory/Supplies */}
      <button className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-200 transition-all hover:scale-110 active:scale-95">
        <Plus size={24} />
      </button>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: any = {
    dirty: { color: 'bg-red-50 text-red-600', label: 'Sujo', icon: AlertCircle },
    cleaning: { color: 'bg-amber-50 text-amber-600', label: 'Limpando', icon: Clock },
    available: { color: 'bg-emerald-50 text-emerald-600', label: 'Pronto', icon: CheckCircle2 },
    maintenance: { color: 'bg-slate-100 text-slate-500', label: 'Manutenção', icon: AlertCircle },
  };

  const { color, label, icon: Icon } = config[status];

  return (
    <div className={cn("flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", color)}>
      <Icon size={10} className="mr-1" />
      {label}
    </div>
  );
}
