import { Button } from '@/shared/ui';
import { Download, FileBraces, Hexagon, Upload } from 'lucide-react';
import { useNavbar } from './useNavbar';

export function Navbar() {
  const { fileInputRef, handleFileImport, actions } = useNavbar();

  return (
    <nav className="flex h-16 w-full items-center justify-between border-b bg-white px-6 print:hidden">
      <div className="flex items-center gap-2">
        <Hexagon className="h-5 w-5 fill-black" />
        <span className="font-semibold tracking-tight">Resume Builder</span>
      </div>

      <div className="flex items-center gap-1.5">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileImport}
          accept=".json"
          className="hidden"
        />

        <NavButton icon={FileBraces} label="Export JSON" onClick={actions.exportJson} />
        <NavButton
          icon={Upload}
          label="Import JSON"
          onClick={() => fileInputRef.current?.click()}
        />
        <NavButton
          icon={Download}
          label="Download PDF"
          onClick={actions.downloadPdf}
          variant="default"
        />
      </div>
    </nav>
  );
}

// 🚀 Helper kecil untuk tombol agar kodenya tidak berulang (DRY)
const NavButton = ({ icon: Icon, label, onClick, variant = 'ghost' }: any) => (
  <Button
    variant={variant}
    size="icon"
    onClick={onClick}
    className="flex h-9 w-9 items-center gap-2 md:h-10 md:w-auto md:px-4"
  >
    <Icon className="h-4 w-4" />
    <span className="hidden text-sm font-medium md:inline-block">{label}</span>
  </Button>
);
