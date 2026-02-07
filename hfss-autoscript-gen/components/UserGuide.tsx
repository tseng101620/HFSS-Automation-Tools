import React from 'react';
import { BookOpen, Terminal, FileCheck, HelpCircle, Layers } from 'lucide-react';

export const UserGuide: React.FC = () => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-purple-400" />
        User Guide (使用說明)
      </h2>

      <div className="space-y-6 text-slate-300">
        <section>
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            1. Prerequisites (前置作業)
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Ensure your HFSS project is open.</li>
            <li>
              Set up a <strong>Parametric Sweep</strong> in Optimetrics containing the variables you want to test.
            </li>
            <li>
              <strong>Solution Names:</strong> Copy the names from your Project Manager tree.
              <br/>
              Example: Parent <code className="text-xs bg-slate-900 px-1 rounded text-blue-300">HFSS_Setup_1</code> and Child <code className="text-xs bg-slate-900 px-1 rounded text-blue-300">Sweep_1</code>.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            2. Configure Variables (設定變數)
          </h3>
          <p className="text-sm mb-2">
            Add all variables you are sweeping. The script will generate a nested loop to cover all combinations of these variables.
          </p>
          <div className="bg-slate-900/50 p-2 rounded border border-slate-700 text-xs text-slate-400">
            <strong>Tip:</strong> Ensure "Start", "Stop", and "Step" match your HFSS parametric table exactly so the script requests the correct data points.
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            3. Run in HFSS (執行腳本)
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>Copy the generated code.</li>
            <li>In HFSS, go to <strong>Tools &gt; Run Script...</strong></li>
            <li>The script will trigger the simulation (Analyze) first.</li>
            <li>It will then iterate through every combination and export results.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            4. Output Format (輸出結果)
          </h3>
          <p className="text-sm mb-2">
            To ensure file system compatibility, decimal points in variable values are replaced with 'd' in the filename.
          </p>
          <p className="text-sm">
             Example: <code className="bg-slate-900 px-2 py-1 rounded text-green-400">L=2.4mm</code>
          </p>
          <p className="text-sm mt-1">
             Filename: <code className="bg-slate-900 px-2 py-1 rounded text-green-400">Prefix_L_2d4mm.s2p</code>
          </p>
          <p className="text-sm mt-1">
             If you have more ports, change the <strong>Num Ports</strong> setting to generate <code className="bg-slate-900 px-1 rounded text-blue-300">.s3p</code>, <code className="bg-slate-900 px-1 rounded text-blue-300">.s4p</code>, etc.
          </p>
        </section>

        <section className="border-t border-slate-700 pt-5 mt-5">
            <h3 className="text-lg font-semibold text-orange-400 mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                FAQ
            </h3>
            <div className="space-y-4">
                <div>
                    <p className="text-white font-medium text-sm mb-1 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-blue-400" />
                      Q: What if I have multiple designs (HFSS, Circuit, etc.)?
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        The script automatically targets the <strong>Active Design</strong> (the tab currently open/viewable when you click 'Run Script'). 
                        Simply click on the design tab you wish to automate before running the script.
                    </p>
                </div>
                <div>
                    <p className="text-white font-medium text-sm mb-1">Q: Will this change my existing HFSS setup?</p>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        <strong>No.</strong> This script is non-destructive. It does not modify your geometry or setups.
                    </p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};