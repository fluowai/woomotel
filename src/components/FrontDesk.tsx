import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  User, 
  Clock, 
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Timer,
  Star,
  X,
  Gift,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatCurrency } from '../lib/utils';

const rooms = [
  { id: '101', number: '101', type: 'Suíte Luxo', status: 'available', price: 85 },
  { id: '102', number: '102', type: 'Suíte Master', status: 'occupied', guest: 'Placa ABC-1234', checkIn: '14:30', timeRemaining: '1h 15m' },
  { id: '103', number: '103', type: 'Standard', status: 'cleaning' },
  { id: '104', number: '104', type: 'Standard', status: 'available', price: 65 },
  { id: '201', number: '201', type: 'Suíte Luxo', status: 'occupied', guest: 'Sigiloso', checkIn: '12:00', timeRemaining: '45m' },
  { id: '202', number: '202', type: 'Suíte Master', status: 'maintenance', reason: 'Hidromassagem' },
  { id: '203', number: '203', type: 'Standard', status: 'dirty' },
  { id: '204', number: '204', type: 'Standard', status: 'available', price: 65 },
];

const packages = [
  { id: '1', name: 'Combo Romântico', price: 150 },
  { id: '2', name: 'Combo Aniversário', price: 220 },
];

interface FrontDeskProps {}

export default function FrontDesk({}: FrontDeskProps) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showReviewSim, setShowReviewSim] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const filteredRooms = rooms.filter(room => {
    if (filter !== 'all' && room.status !== filter) return false;
    if (search && !room.number.includes(search) && !room.type.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleCheckOut = (room: any) => {
    setSelectedRoom(room);
    setShowReviewSim(true);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar suíte..."
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
        
        <button 
          onClick={() => setShowCheckIn(true)}
          className="flex h-11 items-center space-x-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300"
        >
          <Plus size={20} />
          <span>Entrada Rápida</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['all', 'available', 'occupied', 'cleaning', 'dirty', 'maintenance'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all",
              filter === f 
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                : "bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
            )}
          >
            {f === 'all' ? 'Todas' : 
             f === 'available' ? 'Disponíveis' : 
             f === 'occupied' ? 'Ocupadas' : 
             f === 'cleaning' ? 'Em Limpeza' : 
             f === 'dirty' ? 'Sujas' : 'Manutenção'}
          </button>
        ))}
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} onCheckOut={() => handleCheckOut(room)} />
          ))}
        </AnimatePresence>
      </div>

      {/* Check-in Modal */}
      <AnimatePresence>
        {showCheckIn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg rounded-[2.5rem] bg-white p-8 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-900">Entrada de Suíte</h3>
                <button onClick={() => setShowCheckIn(false)} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
                  <X size={20} />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowCheckIn(false); }}>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Identificação (Opcional - Sigilo)</label>
                  <input type="text" placeholder="Placa ou Nome" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Suíte</label>
                    <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>101 - Suíte Luxo</option>
                      <option>104 - Standard</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Combo de Entrada</label>
                    <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="">Nenhum</option>
                      {packages.map(p => (
                        <option key={p.id} value={p.id}>{p.name} (+{formatCurrency(p.price)})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="rounded-2xl bg-indigo-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Valor da Hora</span>
                    <span className="text-lg font-bold text-indigo-600">{formatCurrency(85)}</span>
                  </div>
                </div>

                <button type="submit" className="w-full rounded-2xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700">
                  Iniciar Estadia
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Review Simulation Modal */}
      <AnimatePresence>
        {showReviewSim && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full max-w-md rounded-[2.5rem] bg-white p-8 shadow-2xl text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Send size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Check-out Concluído!</h3>
              <p className="mt-2 text-sm text-slate-500">
                Enviamos uma notificação para <strong>{selectedRoom?.guest}</strong> avaliar a estadia.
              </p>

              <div className="mt-8 rounded-3xl border border-slate-100 bg-slate-50 p-6 text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Simulação da Visão do Cliente</p>
                <div className="space-y-4">
                  <p className="text-sm font-medium text-slate-700">Como foi sua experiência no Hospedex?</p>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={24} className={cn(s <= 4 ? "fill-amber-400 text-amber-400" : "text-slate-300")} />
                    ))}
                  </div>
                  <textarea 
                    placeholder="Deixe um comentário..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 h-24"
                    defaultValue="Estadia maravilhosa! O atendimento foi impecável e o quarto estava super limpo."
                  />
                  <button 
                    onClick={() => setShowReviewSim(false)}
                    className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white"
                  >
                    Enviar Avaliação
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RoomCard({ room, onCheckOut }: any) {
  const statusConfig: any = {
    available: { color: 'emerald', icon: CheckCircle2, label: 'Disponível' },
    occupied: { color: 'indigo', icon: User, label: 'Ocupada' },
    cleaning: { color: 'amber', icon: Clock, label: 'Limpeza' },
    dirty: { color: 'orange', icon: AlertCircle, label: 'Suja' },
    maintenance: { color: 'red', icon: AlertCircle, label: 'Manutenção' },
  };

  const config = statusConfig[room.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md",
        room.status === 'occupied' && "border-indigo-100 bg-indigo-50/30"
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <span className="text-3xl font-black tracking-tighter text-slate-900">{room.number}</span>
          <p className="text-xs font-medium text-slate-500">{room.type}</p>
        </div>
        <div className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          `bg-${config.color}-50 text-${config.color}-600`
        )}>
          <config.icon size={18} />
        </div>
      </div>

      <div className="flex-1 space-y-3">
        {room.status === 'occupied' ? (
          <>
            <div className="flex items-center text-sm">
              <User size={14} className="mr-2 text-slate-400" />
              <span className="font-medium text-slate-700">{room.guest || 'Hóspede Sigiloso'}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock size={14} className="mr-2 text-slate-400" />
              <span className="text-slate-500">Entrada: {room.checkIn}</span>
            </div>
            <div className="flex items-center rounded-xl bg-indigo-100/50 px-3 py-2 text-indigo-700">
              <Timer size={14} className="mr-2" />
              <span className="text-xs font-bold uppercase tracking-wider">Tempo: {room.timeRemaining}</span>
            </div>
          </>
        ) : room.status === 'available' ? (
          <div className="flex flex-col justify-center py-2">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-widest">Valor da Hora</span>
            <span className="text-xl font-bold text-slate-900">{formatCurrency(room.price)}</span>
          </div>
        ) : (
          <div className="flex items-center py-4 text-sm text-slate-500 italic">
            {room.status === 'cleaning' ? 'Camareira: Maria' : 
             room.status === 'dirty' ? 'Aguardando limpeza' : 
             room.reason}
          </div>
        )}
      </div>

      <div className="mt-5 flex space-x-2">
        {room.status === 'available' ? (
          <button className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white transition-all hover:bg-indigo-700">
            Entrada
          </button>
        ) : room.status === 'occupied' ? (
          <>
            <button className="flex-1 rounded-xl border border-indigo-200 bg-white py-2.5 text-xs font-bold text-indigo-600 transition-all hover:bg-indigo-50">
              Consumo
            </button>
            <button 
              onClick={onCheckOut}
              className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-bold text-white transition-all hover:bg-red-700"
            >
              Saída
            </button>
          </>
        ) : (
          <button className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50">
            Gerenciar
          </button>
        )}
      </div>
    </motion.div>
  );
}
