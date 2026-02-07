import React, { useState, useEffect } from 'react';
import { generateHfssScript, ScriptConfig } from './utils/scriptBuilder';
import { ConfigForm } from './components/ConfigForm';
import { CodeViewer } from './components/CodeViewer';
import { UserGuide } from './components/UserGuide';
import { MANUAL_CONTENT } from './utils/manualContent';
import { Cpu, ArrowRight, FileText, Download } from 'lucide-react';

const App: React.FC = () => {
  const [config, setConfig] = useState<ScriptConfig>({
    targetPlatform: 'windows',
    setupName: 'Setup1 : Sweep',
    parametricSetupName: 'ParametricSetup1',
    variables: [
      {
        id: '1',
        name: 'L_ant',
        start: 10,
        stop: 20,
        step: 2,
        units: 'mm'
      },
      {
        id: '2',
        name: 'W_sub',
        start: 1,
        stop: 3,
        step: 1,
        units: 'mm'
      }
    ],
    exportPath: 'C:\\Temp\\HFSS_Export',
    filenamePrefix: 'Dipole',
    includeVarInName: true,
  });

  const [code, setCode] = useState('');

  // Auto-regenerate code when config changes
  useEffect(() => {
    setCode(generateHfssScript(config));
  }, [config]);

  const handleChange = (key: keyof ScriptConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleDownloadManual = () => {
    const blob = new Blob([MANUAL_CONTENT], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'HFSS_Script_Manual.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                HFSS AutoScript Gen
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">Automated Python Script Generator for Ansys Electronics Desktop</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
                onClick={handleDownloadManual}
                className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors border border-slate-700 px-3 py-1.5 rounded-full hover:bg-slate-800"
            >
                <Download className="w-3 h-3" />
                Download Manual (.md)
            </button>
            <div className="text-xs text-slate-500 font-mono border border-slate-800 px-3 py-1 rounded-full">
                v1.2.0
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Workflow Visualization */}
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 mb-8">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">How it works</h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                <div className="flex items-center gap-4 flex-1">
                    <div className="bg-blue-600/20 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-blue-500/30">1</div>
                    <div>
                        <p className="font-bold text-slate-200">Configure</p>
                        <p className="text-slate-400 text-sm">Set variables & Platform.</p>
                    </div>
                </div>

                <ArrowRight className="hidden md:block w-5 h-5 text-slate-600" />

                <div className="flex items-center gap-4 flex-1">
                    <div className="bg-purple-600/20 text-purple-400 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-purple-500/30">2</div>
                    <div>
                        <p className="font-bold text-slate-200">Generate</p>
                        <p className="text-slate-400 text-sm">Copy Python code.</p>
                    </div>
                </div>

                <ArrowRight className="hidden md:block w-5 h-5 text-slate-600" />

                <div className="flex items-center gap-4 flex-1">
                    <div className="bg-green-600/20 text-green-400 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-green-500/30">3</div>
                    <div>
                        <p className="font-bold text-slate-200">Run</p>
                        <p className="text-slate-400 text-sm">Execute in HFSS (Win/Linux).</p>
                    </div>
                </div>

            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Configuration */}
          <div className="lg:col-span-5 space-y-6">
            <ConfigForm config={config} onChange={handleChange} />
            
            <div className="hidden lg:block">
               <UserGuide />
            </div>
          </div>

          {/* Right Column: Code Output */}
          <div className="lg:col-span-7 h-[600px] lg:h-auto lg:sticky lg:top-24 self-start">
             <CodeViewer code={code} />
          </div>
          
          {/* Mobile only User Guide */}
          <div className="lg:hidden col-span-1">
             <UserGuide />
          </div>

        </div>
      </main>
      
      <footer className="bg-slate-900 border-t border-slate-800 mt-12 py-8 text-center text-slate-500 text-sm">
        <p>Generates IronPython compliant scripts for HFSS 2020+ versions on Windows & Linux.</p>
      </footer>
    </div>
  );
};

export default App;
