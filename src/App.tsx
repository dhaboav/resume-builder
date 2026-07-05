import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-6 antialiased selection:bg-cyan-500/30">
      <section
        id="center"
        className="w-full max-w-sm rounded-2xl bg-slate-800 p-8 shadow-2xl ring-1 ring-slate-700/50"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">Resume Builder Setup</h1>
          <p className="mt-2 text-sm text-slate-400">Tailwind v4 + Prettier Environment Test</p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((prev) => prev + 1)}
            className="group relative flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition-all duration-200 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
          >
            <span>Count is:</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-slate-950/10 px-1 font-mono text-sm text-black tabular-nums">
              {count}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
