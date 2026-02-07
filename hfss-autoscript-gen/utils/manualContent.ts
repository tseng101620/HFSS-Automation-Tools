export const MANUAL_CONTENT = `# HFSS Automation Script User Manual

## 1. Introduction
This documentation explains how to use the generated Python script to automate **Parametric Sweeps** and **SNP Data Export** in Ansys HFSS.

The tool is designed to work with **Ansys Electronics Desktop (AEDT)** on both **Windows** and **Linux (CentOS/RHEL)**.

**Important Safety Note**: This script is **non-destructive**. It does **not** create, modify, or delete your existing geometry, materials, or boundary conditions. It operates strictly on the existing Parametric Setup to run simulations and export data.

---

## 2. Prerequisites

### 2.1 HFSS Project Setup
Before running the script, ensure your HFSS project is set up correctly:

1.  **Create Variables**: Define the variables you want to sweep (e.g., \`L_ant\`, \`W_sub\`) in the HFSS properties window.
2.  **Setup Parametric Sweep**:
    *   Go to **Optimetrics > Add > Parametric**.
    *   Add the variables you intend to sweep.
    *   **Important**: The definitions in the script (Start/Stop/Step) **MUST** match the definitions in this HFSS table.
    *   Under the **General** tab, ensure "Save Fields and Mesh" is checked if you need them, though for SNP export, standard solving is usually sufficient.
3.  **Setup Solution**:
    *   Ensure you have a solution setup (e.g., "HFSS_Setup_1") and a Frequency Sweep (e.g., "Sweep_1").

### 2.2 System Requirements
*   **Ansys Electronics Desktop**: Version 2019 R3 or later (2020+ recommended).
*   **Python Environment**: The script uses **IronPython**, which is built into Ansys. No external Python installation is required.

---

## 3. How to Use the App

### 3.1 Configuration
1.  **Platform**: Select **Windows** or **CentOS/Linux** depending on where HFSS is installed. This adjusts file path formats.
2.  **Solution Analysis**: Enter the names exactly as they appear in the Project Manager tree.
    *   **Setup Name**: The parent item (e.g. \`HFSS_Setup_1\`).
    *   **Sweep Name**: The child item (e.g. \`Sweep_1\`).
3.  **Variables**: Add every variable you are sweeping.
    *   **Unit**: Include the unit (e.g., 'mm', 'GHz'). If the variable is unitless, leave it empty.
4.  **Export Settings**:
    *   **Windows Path**: \`C:\\Temp\\Results\`
    *   **Linux Path**: \`/tmp/results\` or \`/home/username/simulation_data\`

### 3.2 Generating & Running
1.  Copy the code from the right-hand panel.
2.  Save it as a \`.py\` file (e.g., \`export_script.py\`).
3.  **In HFSS**:
    *   Go to **Tools > Run Script**.
    *   Select your saved \`.py\` file.
4.  **Batch Mode (Linux)**:
    *   You can run this from terminal:
    *   \`ansysedt -ng -runscript export_script.py ProjectName.aedt\`

---

## 4. Code Explanation

### 4.1 Initialization
The script initializes the Ansys scripting environment:
\`\`\`python
import ScriptEnv
ScriptEnv.Initialize("Ansoft.ElectronicsDesktop")
oDesktop = ScriptEnv.GetDesktop()
\`\`\`
*Note: \`oDesktop.RestoreWindow()\` is wrapped in a try-catch block to ensure compatibility with Linux batch mode (where no window exists).*

### 4.2 Recursive Combination Generator
The script supports multiple variables using a custom recursive function \`get_combinations\`.
*   It generates a Cartesian product of all variable ranges.
*   Example: If Var A has 3 steps and Var B has 2 steps, it generates 6 total variations.

### 4.3 Execution Loop
The script performs two main actions:
1.  **Analyze**: \`oDesign.Analyze(parametric_setup_name)\`
    *   This triggers the solver. If results already exist, HFSS skips solving and just loads data.
2.  **Export**:
    *   It iterates through the calculated combinations.
    *   Constructs a **Variation String**: \`"L='10mm' W='2mm'"\`
    *   Calls \`ExportNetworkData\` to save the Touchstone file (.s2p).

---

## 5. Troubleshooting

| Issue | Solution |
|-------|----------|
| **Script fails immediately** | Check if Project/Design names match the active window. Ensure a project is open. |
| **"Analysis Setup not found"** | Verify \`parametric_setup_name\` matches the Optimetrics name exactly. |
| **"Export failed"** | The Variation String might be mismatched. Ensure start/stop/step in the script matches HFSS exactly (floating point precision matters). |
| **Linux Permission Denied** | Ensure the target user has write permissions to the \`export_folder\`. |

`;