import React from 'react';

interface FormPaneProps {
  text: string;
  onTextChange: (value: string) => void;
}

export const FormPane: React.FC<FormPaneProps> = ({ text, onTextChange }) => {
  return (
    <div className="flex h-full flex-col bg-slate-950 p-6">
      <header className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-white">Builder</h1>
        <p className="mt-1 text-xs text-slate-400">Edits save automatically.</p>
      </header>

      <input
        type="text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        className="w-full rounded bg-slate-800 p-2 text-sm text-white outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Masukkan nama..."
      />
    </div>
  );
};
