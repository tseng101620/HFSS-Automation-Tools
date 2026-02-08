# HFSS AutoScript Gen

A React-based tool to generate **IronPython** automation scripts for **Ansys HFSS**. This tool simplifies the workflow for performing Parametric Sweeps and exporting Touchstone (.sNp) files without manual intervention.

![Version](https://img.shields.io/badge/version-1.2.4-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Features

*   **GUI Configuration**: Easily set up sweep variables, units, and setup names.
*   **Recursive Combination Generation**: Automatically handles multi-variable sweeps (e.g., Length vs. Width).
*   **Cross-Platform Support**: Generates paths suitable for both **Windows** and **Linux (CentOS/RHEL)** environments.
*   **Non-Destructive**: The generated script only triggers "Analyze" and exports data; it does not alter your model geometry.
*   **Live Preview**: View and copy the Python code instantly.

## 🛠️ Tech Stack

*   **React 18**
*   **TypeScript**
*   **Vite** (Build Tool)
*   **Tailwind CSS** (Styling)
*   **Lucide React** (Icons)

## 📦 Installation & Usage

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/hfss-autoscript-gen.git
    cd hfss-autoscript-gen
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Locally**
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` in your browser.

4.  **Build for Production**
    ```bash
    npm run build
    ```

## 📝 How to use with HFSS

1.  Open the app and configure your variables (matches your HFSS Parametric Setup).
2.  Copy the generated Python code.
3.  In HFSS, go to **Tools > Run Script** and select the file.

## 📄 License

This project is open source.