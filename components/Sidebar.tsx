import React from 'react';
import { ShieldCheck, TrendingUp, BookOpen, Layers } from 'lucide-react';
import { ProcessDomain } from '../types';

interface SidebarProps {
  selectedDomain: ProcessDomain;
  onSelect: (domain: ProcessDomain) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedDomain, onSelect }) => {
  return (
    <div className="w-64 bg-slate-900 text-white h-full flex flex-col flex-shrink-0 shadow-xl z-20">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Layers className="h-6 w-6 text-brand-500" />
          <h1 className="text-xl font-bold tracking-tight">PMBOK 8 <br/><span className="text-brand-500 text-base font-normal">Navigator</span></h1>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
          Domain Selection
        </p>
        
        <nav className="space-y-2">
          <button
            onClick={() => onSelect(ProcessDomain.GOVERNANCE)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              selectedDomain === ProcessDomain.GOVERNANCE
                ? 'bg-indigo-600 text-white shadow-lg ring-1 ring-indigo-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ShieldCheck className={`h-5 w-5 ${selectedDomain === ProcessDomain.GOVERNANCE ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
            <div className="text-left">
              <span className="block font-medium">1.3 Governance</span>
              <span className="text-xs opacity-80">Sourcing Strategy</span>
            </div>
          </button>

          <button
            onClick={() => onSelect(ProcessDomain.FINANCE)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              selectedDomain === ProcessDomain.FINANCE
                ? 'bg-emerald-600 text-white shadow-lg ring-1 ring-emerald-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <TrendingUp className={`h-5 w-5 ${selectedDomain === ProcessDomain.FINANCE ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
            <div className="text-left">
              <span className="block font-medium">4.1 Finance</span>
              <span className="text-xs opacity-80">Financial Management</span>
            </div>
          </button>
        </nav>

        <div className="mt-8 px-4 py-4 bg-slate-800 rounded-xl">
          <div className="flex items-center mb-2 text-yellow-500">
            <BookOpen className="h-4 w-4 mr-2" />
            <span className="text-xs font-bold uppercase">Did you know?</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            PMBOK 8 emphasizes <b>Performance Domains</b> over strict processes. However, structured ITTOs remain vital for auditable governance and financial control.
          </p>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-700 text-xs text-center text-slate-500">
        Powered by Gemini 3.0 Flash
      </div>
    </div>
  );
};

export default Sidebar;
