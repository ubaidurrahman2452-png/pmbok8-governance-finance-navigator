import React, { useState } from 'react';
import { Send, Loader2, Info } from 'lucide-react';
import { DomainConfig } from '../types';

interface ProcessInputProps {
  domain: DomainConfig;
  isLoading: boolean;
  onSubmit: (context: string) => void;
}

const ProcessInput: React.FC<ProcessInputProps> = ({ domain, isLoading, onSubmit }) => {
  const [context, setContext] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (context.trim()) {
      onSubmit(context);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className={`text-2xl font-bold ${domain.id === '1.3' ? 'text-indigo-900' : 'text-emerald-900'}`}>
            {domain.title}: {domain.subtitle}
          </h2>
          <p className="text-slate-500 mt-1">{domain.description}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-opacity-10 ${domain.id === '1.3' ? 'bg-indigo-600 text-indigo-700' : 'bg-emerald-600 text-emerald-700'}`}>
          Active Process
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-3 mb-4 text-sm text-slate-600 border border-slate-100 flex gap-2">
        <Info className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold">Key Focus:</span> {domain.focus}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="context" className="block text-sm font-medium text-slate-700 mb-2">
          Project Scenario / Context
        </label>
        <textarea
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g., We are building a sustainable smart-city infrastructure project with a budget of $5M. We need to decide whether to build our own IoT sensors or buy them from a vendor..."
          className="w-full h-32 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none text-slate-700 placeholder-slate-400 transition-shadow shadow-inner"
          disabled={isLoading}
        />
        
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => setContext('Building a new AI-driven customer support portal for a mid-sized FinTech company. Budget is tight, sustainability is a KPI.')}
            className="mr-auto text-xs text-slate-400 hover:text-brand-600 underline"
          >
            Load Example Scenario
          </button>

          <button
            type="submit"
            disabled={!context.trim() || isLoading}
            className={`flex items-center px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 ${
              !context.trim() || isLoading
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-brand-600 hover:bg-brand-700 hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Processing ITTOs...
              </>
            ) : (
              <>
                Generate Process Guide
                <Send className="h-4 w-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProcessInput;
