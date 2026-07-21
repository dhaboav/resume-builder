import { Button } from '@/shared/ui';
import { Download, FileBraces, Hexagon, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavbar } from './useNavbar';

export function Navbar() {
  const { fileInputRef, handleFileImport, actions } = useNavbar();

  return (
    <header className="flex justify-between border-b px-6">
      <Link to="/" className="flex items-center gap-2">
        <Hexagon className="h-5 w-5 fill-black" />
        <h1 className="font-semibold tracking-tight">Resume Builder</h1>
      </Link>
      <nav className="flex h-10 items-center lg:h-14 lg:gap-1">
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
      </nav>
    </header>
  );
}

const NavButton = ({ icon: Icon, label, onClick, variant = 'ghost' }: any) => (
  <Button
    variant={variant}
    size="icon"
    onClick={onClick}
    className="flex h-8 w-8 items-center gap-2 md:h-10 md:w-auto md:px-4"
  >
    <Icon className="h-4 w-2" />
    <span className="hidden text-sm font-medium md:inline-block">{label}</span>
  </Button>
);
