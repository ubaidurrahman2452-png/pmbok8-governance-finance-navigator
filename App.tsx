import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProcessInput from './components/ProcessInput';
import ResultDisplay from './components/ResultDisplay';
import { DOMAINS } from './constants';
import { ProcessDomain } from './types';
import { generateProcessITTO } from './services/geminiService';

export default function App() {
  const [selectedDomain, setSelectedDomain] = useState<ProcessDomain>(ProcessDomain.GOVERNANCE);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleDomainSelect = (domain: ProcessDomain) => {
    setSelectedDomain(domain);
    setResult(''); // Clear previous results on domain switch
    setError(null);
  };

  const handleGenerate = async (context: string) => {
    setLoading(true);
    setError(null);
    try {
      const markdown = await generateProcessITTO({
        domain: selectedDomain,
        context
      });
      setResult(markdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const activeConfig = DOMAINS[selectedDomain];

  return (
    <div className="flex h-screen w-full bg-slate-50">
      <Sidebar 
        selectedDomain={selectedDomain} 
        onSelect={handleDomainSelect} 
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header background decoration */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-slate-50 z-0"></div>

        <div className="flex-1 overflow-y-auto z-10 p-8 scroll-smooth">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Top Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Process Architect</h1>
              <p className="text-slate-500 mt-2">
                Define, analyze, and optimize your project management processes with PMBOK 8 standards and Gemini AI.
              </p>
            </div>

            {/* Input Form */}
            <ProcessInput 
              domain={activeConfig}
              isLoading={loading}
              onSubmit={handleGenerate}
            />

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <strong>Error:</strong> {error}
              </div>
            )}

            {/* Loading Skeleton or Result */}
            {loading && !result && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/3 mb-6"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-8"></div>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="h-32 bg-slate-100 rounded"></div>
                  <div className="h-32 bg-slate-100 rounded"></div>
                  <div className="h-32 bg-slate-100 rounded"></div>
                </div>
              </div>
            )}

            <ResultDisplay content={result} />
            
            <div className="h-10"></div> {/* Bottom spacer */}
          </div>
        </div>
      </main>
    </div>
  );
}
