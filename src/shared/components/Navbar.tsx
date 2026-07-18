// src/shared/components/navbar.tsx
import { useResumeStore } from '@/resume/hooks/useResumeState';
import { Download, FileBraces, Hexagon, Upload } from 'lucide-react';
import React, { useRef } from 'react';
import { Button } from '../ui/button';
export const Navbar: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🚀 Hubungkan langsung ke global actions tanpa lewat props
  const exportJson = useResumeStore((s) => s.exportJson);
  const importJson = useResumeStore((s) => s.importJson);
  const downloadPdf = useResumeStore((s) => s.downloadPdf);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await importJson(file);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Gagal mengimpor data.');
      } finally {
        e.target.value = ''; // Reset input agar file yang sama bisa di-upload ulang
      }
    }
  };

  return (
    <nav className="flex h-16 w-full items-center justify-between border-b border-slate-300 bg-white px-6 text-black print:hidden">
      {/* Input File Tersembunyi */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Logo / Brand */}
      <div className="flex items-center gap-2">
        <Hexagon className="h-5 w-5 fill-black" />
        <span className="font-semibold tracking-tight">Resume Builder</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={exportJson}
          className="flex h-9 w-9 items-center gap-2 md:h-10 md:w-auto md:px-4 md:py-2"
        >
          <FileBraces className="h-4 w-4" />
          <span className="hidden text-sm font-medium md:inline-block">Export JSON</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-9 w-9 items-center gap-2 md:h-10 md:w-auto md:px-4 md:py-2"
        >
          <Upload className="h-4 w-4" />
          <span className="hidden text-sm font-medium md:inline-block">Import JSON</span>
        </Button>

        <Button
          variant="default"
          size="icon"
          onClick={downloadPdf}
          className="flex h-9 w-9 items-center gap-2 md:h-10 md:w-auto md:px-4 md:py-2"
        >
          <Download className="h-4 w-4" />
          <span className="hidden text-sm font-medium md:inline-block">Download PDF</span>
        </Button>
      </div>
    </nav>
  );
};
