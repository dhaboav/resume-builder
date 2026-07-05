import { Download, FileBraces, Hexagon, Upload } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const navItems = [
    { name: 'Export JSON', icon: FileBraces, variant: 'ghost' as const },
    { name: 'Import JSON', icon: Upload, variant: 'ghost' as const },
    { name: 'Download PDF', icon: Download, variant: 'default' as const },
  ];

  return (
    <nav className="flex h-16 w-full items-center justify-between bg-white px-6 text-black">
      <div className="flex items-center gap-2">
        <Hexagon className="h-5 w-5 fill-black" />
        <span className="font-semibold tracking-tight">Resume Builder</span>
      </div>

      <div className="flex items-center gap-1.5">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={index}
              variant={item.variant}
              size="icon"
              className="flex h-9 w-9 items-center gap-2 md:h-10 md:w-auto md:px-4 md:py-2"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden text-sm font-medium md:inline-block">{item.name}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
