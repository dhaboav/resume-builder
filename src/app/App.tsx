import { Navbar } from '@/shared/components/Navbar';
import { useState } from 'react';

function App() {
  const [text, setText] = useState('John Doe');

  return (
    // Kita bungkus dengan flex-col h-screen agar Navbar berada di atas, dan layout split-screen berada di bawahnya
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-900 font-sans text-slate-100 antialiased">
      {/* 1. GLOBAL NAVBAR */}
      <Navbar />

      {/* 2. AREA UTAMA (SPLIT SCREEN) */}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* SISI KIRI: PANEL INPUT (FORM) */}
        <aside className="h-1/2 w-full overflow-y-auto border-b border-slate-800 bg-slate-950 p-6 md:h-full md:w-[45%] md:border-r md:border-b-0">
          <header className="mb-6">
            <h1 className="text-xl font-bold tracking-tight text-white">Project Builder</h1>
            <p className="mt-1 text-xs text-slate-400">
              Isi data di bawah untuk memperbarui dokumen.
            </p>
          </header>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white transition-colors focus:border-cyan-500 focus:outline-none"
                placeholder="Masukkan nama Anda..."
              />
            </div>
          </div>
        </aside>

        {/* SISI KANAN: PANEL PREVIEW */}
        <main className="flex h-1/2 flex-1 flex-col overflow-hidden bg-slate-900 md:h-full">
          <div className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 backdrop-blur-md">
            <span className="text-xs font-medium text-slate-400">Live Preview</span>
            <button
              type="button"
              onClick={() => window.print()}
              className="cursor-pointer rounded-lg bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-slate-950 transition-all hover:bg-cyan-400"
            >
              Export PDF
            </button>
          </div>

          <div className="flex flex-1 items-start justify-center overflow-y-auto p-6 md:p-12">
            <div className="aspect-[1/1.414] w-full max-w-2xl rounded-xl bg-white p-8 text-slate-900 shadow-2xl">
              <h2 className="border-b border-slate-200 pb-4 text-3xl font-bold text-slate-900">
                {text || 'Nama Kosong'}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Apapun yang Anda ketik di sisi kiri akan langsung ter-render di sini secara waktu
                nyata.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
