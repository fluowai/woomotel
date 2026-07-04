import { 
  Users, 
  TrendingUp, 
  Bed, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
  Star
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { formatCurrency, cn } from '../lib/utils';

const data = [
  { name: '00:00', value: 400 },
  { name: '04:00', value: 300 },
  { name: '08:00', value: 600 },
  { name: '12:00', value: 800 },
  { name: '16:00', value: 500 },
  { name: '20:00', value: 900 },
  { name: '23:59', value: 700 },
];

const occupancyData = [
  { name: 'Disponível', value: 12, color: '#10b981' },
  { name: 'Ocupado', value: 24, color: '#6366f1' },
  { name: 'Limpeza', value: 4, color: '#f59e0b' },
  { name: 'Manutenção', value: 2, color: '#ef4444' },
];

interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Ocupação Atual" 
          value="84%" 
          trend="+8.2%" 
          trendUp={true}
          icon={Bed}
          color="indigo"
        />
        <StatCard 
          title="Receita do Dia" 
          value={formatCurrency(5840.50)} 
          trend="+15.5%" 
          trendUp={true}
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard 
          title="Giro de Quartos" 
          value="32" 
          trend="+5" 
          trendUp={true}
          icon={Users}
          color="amber"
        />
        <StatCard 
          title="Ticket Médio" 
          value={formatCurrency(145)} 
          trend="+4.2%" 
          trendUp={true}
          icon={Clock}
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Fluxo de Receita</h3>
              <p className="text-sm text-slate-500">Desempenho financeiro nas últimas 24h</p>
            </div>
            <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Hoje</option>
              <option>Ontem</option>
              <option>Últimos 7 dias</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  tickFormatter={(val) => `R$${val}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Occupancy Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 className="mb-6 text-lg font-semibold text-slate-900">Status dos Quartos</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData} layout="vertical" margin={{ left: 0, right: 30 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  width={80}
                />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-3">
            {occupancyData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Circle size={8} fill={item.color} stroke="none" className="mr-2" />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h3 className="mb-6 text-lg font-semibold text-slate-900">Atividade Recente</h3>
        <div className="space-y-4">
          {[
            { user: 'Recepção', action: 'Entrada realizada', room: 'Suíte 102', time: 'Há 5 min', type: 'checkin' },
            { user: 'Camareira 01', action: 'Limpeza concluída', room: 'Suíte 205', time: 'Há 12 min', type: 'cleaning' },
            { user: 'Recepção', action: 'Consumo lançado', room: 'Suíte 301', time: 'Há 18 min', type: 'consumption' },
            { user: 'Sistema', action: 'Saída realizada', room: 'Suíte 108', time: 'Há 25 min', type: 'booking' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  item.type === 'checkin' ? "bg-emerald-50 text-emerald-600" :
                  item.type === 'cleaning' ? "bg-amber-50 text-amber-600" :
                  item.type === 'consumption' ? "bg-blue-50 text-blue-600" :
                  "bg-indigo-50 text-indigo-600"
                )}>
                  <Circle size={12} fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{item.action}</p>
                  <p className="text-xs text-slate-500">{item.user} • {item.room}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">{item.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon: Icon, color }: any) {
  const colors: any = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all"
    >
      <div className="flex items-center justify-between">
        <div className={cn("rounded-2xl p-3", colors[color])}>
          <Icon size={24} />
        </div>
        <div className={cn(
          "flex items-center rounded-full px-2 py-1 text-xs font-bold",
          trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
        )}>
          {trendUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
          {trend}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h4 className="mt-1 text-2xl font-bold text-slate-900">{value}</h4>
      </div>
    </motion.div>
  );
}
