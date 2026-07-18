import type { WorkspaceTab } from '@/resume/hooks/useViewPanel';
import { Button } from '@/shared/ui';
import { Eye, Pencil, type LucideIcon } from 'lucide-react';
import React from 'react';

interface MobileToggleProps {
  activeTab: WorkspaceTab;
  onTabChange: (tab: WorkspaceTab) => void;
}

interface NavItem {
  id: WorkspaceTab;
  label: string;
  Icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'edit', label: 'Edit Form', Icon: Pencil },
  { id: 'preview', label: 'View Preview', Icon: Eye },
];

const BUTTON_VARIANTS = {
  active: 'bg-primary text-white hover:bg-primary hover:text-white',
  inactive: 'bg-transparent text-slate-600',
};

export const MobileToggle: React.FC<MobileToggleProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-slate-200 bg-white/95 p-2 shadow-xl lg:hidden">
      <div className="flex items-center justify-center gap-1">
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <Button
            key={id}
            onClick={() => onTabChange(id)}
            variant="outline"
            className={`flex items-center gap-2 rounded-full border-none px-5 py-2.5 text-xs font-medium transition-all ${
              BUTTON_VARIANTS[activeTab === id ? 'active' : 'inactive']
            }`}
          >
            <Icon className="h-3 w-3" />
            <span>{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
