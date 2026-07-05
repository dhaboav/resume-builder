import { Download, FileBraces, Hexagon, Upload } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <nav className="flex h-16 w-full items-center justify-between bg-white px-6 text-black">
      <div className="flex items-center gap-2">
        <Hexagon />
        <span>Resume Builder</span>
      </div>
      <div className="flex items-center justify-between gap-0.5">
        <Button variant="ghost" size="icon">
          <FileBraces />
        </Button>
        <Button variant="ghost" size="icon">
          <Upload />
        </Button>
        <Button variant="default" size="icon">
          <Download />
        </Button>
      </div>
    </nav>
  );
}
