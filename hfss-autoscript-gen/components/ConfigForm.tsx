
import React from 'react';
import { ScriptConfig, SweepVariable } from '../utils/scriptBuilder';
import { Settings, Play, FolderOutput, Plus, Trash2, Monitor, Server, Info, Network, Bug, Activity, Zap } from 'lucide-react';

interface ConfigFormProps {
  config: ScriptConfig;
  onChange: (key: keyof ScriptConfig, value: any) => void;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({ config, onChange }) => {
  
  const handleAddVariable = () => {
    const newVar: SweepVariable = {
      id: crypto.randomUUID(),
      name: '',
      start: 0,
      stop: 0,
      step: 1,
      units: 'mm'
    };
    onChange('variables', [...config.variables, newVar]);
  };

  const handleRemoveVariable = (id: string) => {
    onChange('variables', config.variables.filter(v => v.id !== id));
  };

  const handleVariableChange = (id: string, field: keyof SweepVariable, value: string | number) => {
    const updatedVars = config.variables.map(v => {
      if (v.id === id) {
        return { ...v, [field]: value };
      }
      return v;
    });
    onChange('variables', updatedVars);
  };

  const handlePlatformChange = (platform: 'windows' | 'linux') => {
    onChange('targetPlatform', platform);
    if (platform === 'linux' && config.exportPath.includes('C:\\')) {
        onChange('exportPath', '/tmp/hfss_export');
    } else if (platform === 'windows' && config.exportPath.startsWith('/')) {
        onChange('exportPath', 'C:\\Temp\\HFSS_Export');
    }
  };

  const handleSmartExportChange = (checked: boolean) => {
      onChange('smartExport', checked);
      if (checked) {
          onChange('simulateIndividually', false);
      }
  };

  const handleSimulateIndividuallyChange = (checked: boolean) => {
      onChange('simulateIndividually', checked);
      if (checked) {
          onChange('smartExport', false);
      }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
      <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            Configuration
          </h2>
          
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
            <button
                onClick={() => handlePlatformChange('windows')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    config.targetPlatform === 'windows' 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
            >
                <Monitor className="w-3 h-3" />
                Windows
            </button>
            <button
                onClick={() => handlePlatformChange('linux')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    config.targetPlatform === 'linux' 
                    ? 'bg-orange-600 text-white shadow' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
            >
                <Server className="w-3 h-3" />
                CentOS/Linux
            </button>
          </div>
      </div>
      
      <div className="space-y-6">
        {/* Simulation Mode Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Smart Export Toggle */}
            <div className={`border rounded p-3 transition-all ${config.smartExport ? 'bg-purple-900/20 border-purple-500/50' : 'bg-slate-900/20 border-slate-700'}`}>
                <label className="flex items-start cursor-pointer gap-3">
                    <input
                        type="checkbox"
                        checked={config.smartExport || false}
                        onChange={(e) => handleSmartExportChange(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-slate-500 bg-slate-900 text-purple-500"
                    />
                    <div>
                        <span className={`text-sm font-bold flex items-center gap-1 ${config.smartExport ? 'text-purple-300' : 'text-slate-300'}`}>
                            <Zap className="w-4 h-4" /> Smart Export (Precise)
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                            Auto-detects solved variations. Uses defined variables below to name files.
                        </p>
                    </div>
                </label>
            </div>

            {/* Manual Loop Toggle */}
            <div className={`border rounded p-3 transition-all ${config.simulateIndividually ? 'bg-blue-900/20 border-blue-500/50' : 'bg-slate-900/20 border-slate-700'}`}>
                <label className="flex items-start cursor-pointer gap-3">
                    <input
                        type="checkbox"
                        checked={config.simulateIndividually || false}
                        onChange={(e) => handleSimulateIndividuallyChange(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-slate-500 bg-slate-900 text-blue-500"
                    />
                    <div>
                        <span className={`text-sm font-bold flex items-center gap-1 ${config.simulateIndividually ? 'text-blue-300' : 'text-slate-300'}`}>
                            <Activity className="w-4 h-4" /> Simulate Individually
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                            Manually sets variables & solves. Use if parametric setup fails. Slower.
                        </p>
                    </div>
                </label>
            </div>
        </div>

        {/* Setup Names */}
        <div className="space-y-4">
            <div className={config.simulateIndividually ? 'opacity-50 pointer-events-none' : ''}>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                Parametric Setup Name
                </label>
                <input
                type="text"
                value={config.parametricSetupName}
                onChange={(e) => onChange('parametricSetupName', e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="ParametricSetup1"
                />
            </div>

            <div className="bg-slate-900/40 p-3 rounded border border-slate-700/50">
                <div className="flex items-center gap-2 mb-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Solution Analysis
                    </label>
                    <div className="group relative">
                        <Info className="w-3 h-3 text-slate-500 cursor-help" />
                        <div className="absolute bottom-full left-0 mb-2 w-56 p-2 bg-slate-950 border border-slate-700 rounded text-[10px] text-slate-300 hidden group-hover:block z-10 shadow-xl">
                            Look at your Project Manager tree. The first box is the parent Setup (e.g. HFSS_Setup_1), the second box is the Sweep under it (e.g. Sweep_1).
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Setup Name</label>
                        <input
                            type="text"
                            value={config.solutionName}
                            onChange={(e) => onChange('solutionName', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="HFSS_Setup_1"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Sweep Name</label>
                        <input
                            type="text"
                            value={config.sweepName}
                            onChange={(e) => onChange('sweepName', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="Sweep_1"
                        />
                    </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Script will combine these as: <span className="font-mono text-blue-400">"{config.solutionName} : {config.sweepName}"</span>
                </p>
            </div>
        </div>

        {/* Variable Definition Section */}
        <div className="border-t border-slate-700 pt-4">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-blue-300 flex items-center gap-2">
              <Play className="w-4 h-4" />
              Sweep Variables {config.smartExport && <span className="text-slate-400 text-xs font-normal">(Filename Filter)</span>}
            </label>
            <button 
                onClick={handleAddVariable}
                className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded transition-colors"
            >
                <Plus className="w-3 h-3" /> Add Variable
            </button>
          </div>
          
          {config.smartExport && (
              <div className="mb-3 p-2 bg-purple-900/30 border border-purple-500/30 rounded text-xs text-purple-200 flex items-start gap-2">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" /> 
                  <span>
                    <strong>Note:</strong> Update Start/Stop/Step to match your HFSS setup. This helps the script calculate progress and validate the file count.
                  </span>
              </div>
          )}

          <div className="space-y-3">
            {config.variables.map((variable, _index) => (
              <div key={variable.id} className="bg-slate-900/50 p-3 rounded border border-slate-700 relative group">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  
                  <div className="md:col-span-3">
                    <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Var Name</label>
                    <input
                      type="text"
                      value={variable.name}
                      onChange={(e) => handleVariableChange(variable.id, 'name', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-200"
                      placeholder="e.g. Length"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Start</label>
                    <input
                      type="number"
                      value={variable.start}
                      onChange={(e) => handleVariableChange(variable.id, 'start', parseFloat(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Stop</label>
                    <input
                      type="number"
                      value={variable.stop}
                      onChange={(e) => handleVariableChange(variable.id, 'stop', parseFloat(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Step</label>
                    <input
                      type="number"
                      value={variable.step}
                      onChange={(e) => handleVariableChange(variable.id, 'step', parseFloat(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Units</label>
                    <input
                      type="text"
                      value={variable.units}
                      onChange={(e) => handleVariableChange(variable.id, 'units', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-200"
                      placeholder="mm"
                    />
                  </div>
                  
                  <div className="md:col-span-1 flex justify-center pb-1">
                    <button 
                      onClick={() => handleRemoveVariable(variable.id)}
                      disabled={config.variables.length === 1}
                      className="text-slate-600 hover:text-red-400 disabled:opacity-30 disabled:hover:text-slate-600 transition-colors"
                      title="Remove Variable"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Settings */}
        <div className="border-t border-slate-700 pt-4">
          <label className="block text-sm font-medium text-green-300 mb-2 flex items-center gap-2">
            <FolderOutput className="w-4 h-4" />
            Export Settings ({config.targetPlatform === 'linux' ? 'Linux' : 'Windows'})
          </label>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-500">
                Output Folder Path 
                {config.targetPlatform === 'linux' && <span className="text-orange-400 ml-2">(Use forward slashes for Linux)</span>}
              </label>
              <input
                type="text"
                value={config.exportPath}
                onChange={(e) => onChange('exportPath', e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-slate-200 font-mono text-sm"
                placeholder={config.targetPlatform === 'linux' ? "/tmp/hfss_results" : "C:\\Temp\\HFSS_Export"}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
               <div className="md:col-span-8">
                <label className="block text-xs text-slate-500">Filename Prefix</label>
                <input
                  type="text"
                  value={config.filenamePrefix}
                  onChange={(e) => onChange('filenamePrefix', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-slate-200"
                  placeholder="Antenna_Run"
                />
              </div>

              <div className="md:col-span-4">
                 <label className="block text-xs text-slate-500 flex items-center gap-1">
                    <Network className="w-3 h-3" />
                    Num Ports (N)
                 </label>
                 <input
                  type="number"
                  min="1"
                  max="99"
                  value={config.numPorts}
                  onChange={(e) => onChange('numPorts', Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-slate-200 font-mono text-center"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-2 gap-4">
              <label className="flex items-center cursor-pointer gap-2">
                <input
                  type="checkbox"
                  checked={config.includeVarInName}
                  onChange={(e) => onChange('includeVarInName', e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-blue-500"
                />
                <span className="text-sm text-slate-300">Append variable values to file</span>
              </label>

              {/* Debug Toggle */}
              <label className="flex items-center cursor-pointer gap-2 bg-red-900/20 px-3 py-1.5 rounded border border-red-900/50 hover:bg-red-900/30 transition-colors">
                <input
                  type="checkbox"
                  checked={config.debugMode}
                  onChange={(e) => onChange('debugMode', e.target.checked)}
                  className="w-4 h-4 rounded border-red-600 bg-slate-900 text-red-500"
                />
                <span className="text-sm text-red-200 font-medium flex items-center gap-1">
                    <Bug className="w-3 h-3" /> Debug Mode
                </span>
              </label>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
