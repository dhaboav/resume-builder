import type { WorkspaceTab } from '@/resume/hooks';
import { Button } from '@/shared/ui';
import { Eye, Pencil, type LucideIcon } from 'lucide-react';

interface NavItem {
  tab: WorkspaceTab;
  label: string;
  Icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { tab: 'edit', label: 'Edit Form', Icon: Pencil },
  { tab: 'preview', label: 'View Preview', Icon: Eye },
];

interface MobileWorkspaceTabsProps {
  activeTab: WorkspaceTab;
  onTabChange: (tab: WorkspaceTab) => void;
}
export function MobileWorkspaceTabs({ activeTab, onTabChange }: MobileWorkspaceTabsProps) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-slate-200 bg-white/95 p-2 shadow-xl lg:hidden">
      <div className="flex items-center justify-center gap-1">
        {NAV_ITEMS.map(({ tab, label, Icon }) => {
          const isActive = activeTab === tab;

          return (
            <Button
              key={tab}
              onClick={() => onTabChange(tab)}
              variant="outline"
              className={`flex items-center gap-2 rounded-full border-none px-5 py-2.5 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-primary text-white hover:bg-primary hover:text-white'
                  : 'bg-transparent text-slate-600'
              }`}
            >
              <Icon className="h-3 w-3" />
              <span>{label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

MobileWorkspaceTabs.displayName = 'MobileWorkspaceTabs';
