// src/shared/components/navbar.tsx
import { Download, FileBraces, Hexagon, Upload } from 'lucide-react';
import React, { useRef } from 'react';
import { Button } from './ui/button';

interface NavbarProps {
  onExportJSON: () => void;
  onImportJSON: (file: File) => void;
  onDownloadPDF?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onExportJSON, onImportJSON, onDownloadPDF }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJSON(file);
      e.target.value = ''; // Reset input target buffer file field stream
    }
  };

  return (
    <nav className="flex h-16 w-full items-center justify-between border-b border-slate-300 bg-white px-6 text-black">
      {/* Hidden file uploader pipeline element core */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".json" 
        className="hidden" 
      />

      <div className="flex items-center gap-2">
        <Hexagon className="h-5 w-5 fill-black" />
        <span className="font-semibold tracking-tight">Resume Builder</span>
      </div>

      <div className="flex items-center gap-1.5">
        <Button variant="ghost" size="icon" onClick={onExportJSON} className="flex h-9 w-9 items-center gap-2 md:h-10 md:w-auto md:px-4 md:py-2">
          <FileBraces className="h-4 w-4" />
          <span className="hidden text-sm font-medium md:inline-block">Export JSON</span>
        </Button>

        <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} className="flex h-9 w-9 items-center gap-2 md:h-10 md:w-auto md:px-4 md:py-2">
          <Upload className="h-4 w-4" />
          <span className="hidden text-sm font-medium md:inline-block">Import JSON</span>
        </Button>

        <Button variant="default" size="icon" onClick={onDownloadPDF} className="flex h-9 w-9 items-center gap-2 md:h-10 md:w-auto md:px-4 md:py-2">
          <Download className="h-4 w-4" />
          <span className="hidden text-sm font-medium md:inline-block">Download PDF</span>
        </Button>
      </div>
    </nav>
  );
};