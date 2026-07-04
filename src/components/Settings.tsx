import { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Lock, 
  Database, 
  Globe, 
  Smartphone,
  CreditCard,
  User,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const sections = [
  { id: 'profile', icon: User, label: 'Perfil do Usuário', desc: 'Gerencie suas informações pessoais' },
  { id: 'hotel', icon: Globe, label: 'Dados do Hotel', desc: 'Endereço, CNPJ e informações de contato' },
  { id: 'notifications', icon: Bell, label: 'Notificações', desc: 'Alertas de check-in, limpeza e estoque' },
  { id: 'security', icon: Lock, label: 'Segurança', desc: 'Senha, 2FA e permissões de acesso' },
  { id: 'billing', icon: CreditCard, label: 'Assinatura e Faturamento', desc: 'Gerencie seu plano Hospedex' },
  { id: 'integrations', icon: Database, label: 'Integrações', desc: 'Conecte com canais de venda e OTAs' },
  { id: 'app', icon: Smartphone, label: 'Aplicativo PWA', desc: 'Configurações do app de camareiras' },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Sidebar Settings */}
      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={cn(
              "flex w-full items-center justify-between rounded-2xl p-4 text-left transition-all",
              activeSection === section.id 
                ? "bg-white shadow-sm border border-slate-200" 
                : "hover:bg-slate-100"
            )}
          >
            <div className="flex items-center space-x-4">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                activeSection === section.id ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"
              )}>
                <section.icon size={20} />
              </div>
              <div>
                <p className={cn(
                  "text-sm font-bold",
                  activeSection === section.id ? "text-slate-900" : "text-slate-600"
                )}>
                  {section.label}
                </p>
                <p className="text-[10px] text-slate-400">{section.desc}</p>
              </div>
            </div>
            <ChevronRight size={16} className={cn(
              "transition-all",
              activeSection === section.id ? "text-indigo-600 translate-x-1" : "text-slate-300"
            )} />
          </button>
        ))}
      </div>

      {/* Content Settings */}
      <div className="lg:col-span-2">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">
              {sections.find(s => s.id === activeSection)?.label}
            </h3>
            <button className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-700">
              Salvar Alterações
            </button>
          </div>

          <div className="space-y-6">
            {activeSection === 'profile' && (
              <>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nome Completo</label>
                    <input type="text" defaultValue="Paulo Argolo" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">E-mail</label>
                    <input type="email" defaultValue="paulo@hospedex.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Cargo / Função</label>
                  <input type="text" defaultValue="Administrador Geral" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </>
            )}
            
            {activeSection === 'hotel' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nome do Estabelecimento</label>
                  <input type="text" defaultValue="Motel Sigilo Premium" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">CNPJ (Opcional)</label>
                    <input type="text" defaultValue="00.000.000/0001-00" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Telefone de Contato</label>
                    <input type="text" defaultValue="(11) 4002-8922" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other sections */}
            {activeSection !== 'profile' && activeSection !== 'hotel' && (
              <div className="flex h-64 flex-col items-center justify-center text-slate-400">
                <SettingsIcon size={48} className="mb-4 opacity-20" />
                <p className="text-sm">Configurações de {sections.find(s => s.id === activeSection)?.label} em breve.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
