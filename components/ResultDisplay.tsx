import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check } from 'lucide-react';

interface ResultDisplayProps {
  content: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!content) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in-up">
      <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-semibold text-slate-700">Generated Process Documentation</h3>
        <button
          onClick={handleCopy}
          className="flex items-center text-xs font-medium text-slate-500 hover:text-brand-600 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1 text-green-500" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copy Markdown
            </>
          )}
        </button>
      </div>
      <div className="p-8 prose prose-slate max-w-none prose-headings:text-slate-800 prose-headings:font-bold prose-h2:text-xl prose-h2:border-b prose-h2:pb-2 prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-600 prose-li:text-slate-600 prose-table:border-collapse prose-th:bg-slate-100 prose-th:p-3 prose-th:text-left prose-th:text-slate-700 prose-td:p-3 prose-td:border-b prose-td:border-slate-100 prose-strong:text-slate-800">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ResultDisplay;
