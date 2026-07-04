import { useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Mail, Lock, ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl shadow-indigo-100"
      >
        <div className="bg-indigo-600 p-10 text-center text-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
            <Moon size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">MotelOS</h1>
          <p className="mt-2 text-sm font-medium text-indigo-100">Sigilo & Eficiência Operacional</p>
        </div>

        <div className="p-10">
          <div className="mb-8 flex rounded-2xl bg-slate-100 p-1">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              Entrar
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${!isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              Criar Conta
            </button>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nome da Empresa</label>
                <div className="relative">
                  <Moon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Ex: Motel Sigilo"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="seu@email.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>
            </div>

            <button 
              type="submit"
              className="group flex w-full items-center justify-center space-x-2 rounded-2xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300"
            >
              <span>{isLogin ? 'Entrar no Sistema' : 'Começar Agora'}</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-400">
            Ao continuar, você concorda com nossos <br />
            <span className="font-bold text-indigo-600 underline">Termos de Uso</span> e <span className="font-bold text-indigo-600 underline">Privacidade</span>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
