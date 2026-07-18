import { useState } from 'react';

export type WorkspaceTab = 'edit' | 'preview';

export function useViewPanel() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('edit');

  const toggleMobileView = (tab: WorkspaceTab) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    toggleMobileView,
  };
}
