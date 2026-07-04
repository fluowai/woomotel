import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ConciergeBell, 
  Brush, 
  Package as PackageIcon, 
  DollarSign, 
  Users, 
  Settings as SettingsIcon,
  Moon,
  LogOut,
  ChevronRight,
  Menu,
  X,
  BarChart3,
  Gift
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ConciergeBell, label: 'Recepção', path: '/front-desk' },
  { icon: Brush, label: 'Camareiras', path: '/housekeeping' },
  { icon: PackageIcon, label: 'Estoque', path: '/inventory' },
  { icon: Gift, label: 'Combos', path: '/packages' },
  { icon: DollarSign, label: 'Financeiro', path: '/finance' },
  { icon: BarChart3, label: 'Relatórios', path: '/reports' },
  { icon: SettingsIcon, label: 'Configurações', path: '/settings' },
];

export default function Layout({}: LayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="relative flex flex-col border-r border-slate-200 bg-white shadow-sm"
      >
        <div className="flex h-16 items-center justify-between px-4">
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <Moon className="text-indigo-600" size={24} />
              <span className="text-xl font-bold tracking-tight text-indigo-600">
                MotelOS
              </span>
            </motion.div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg p-1.5 hover:bg-slate-100"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-indigo-50 text-indigo-700 shadow-sm" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                )}
              >
                <item.icon 
                  size={20} 
                  className={cn(
                    "shrink-0",
                    isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-600"
                  )} 
                />
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-3 truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <div className="mb-4 flex items-center justify-center rounded-xl bg-indigo-50 p-3 text-indigo-700">
             <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider">
               <Moon size={14} />
               <span>Modo Motel Ativo</span>
             </div>
          </div>
          
          <button className="flex w-full items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600">
            <LogOut size={20} className="mr-3" />
            {isSidebarOpen && "Sair"}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-slate-900">
              {menuItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
              Unidade Sigilo Total
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-slate-900">Operador Master</span>
              <span className="text-xs text-slate-500">Administrador</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              OM
            </div>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
