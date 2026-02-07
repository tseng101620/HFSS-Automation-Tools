import React from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeViewerProps {
  code: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ code }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 flex flex-col h-full overflow-hidden">
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-slate-200 font-semibold text-sm font-mono">generated_script.py</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <div className="flex-1 overflow-auto bg-[#1e1e1e] p-4">
        <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap break-all">
          {code}
        </pre>
      </div>
    </div>
  );
};
