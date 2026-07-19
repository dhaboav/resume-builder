import { useState } from 'react';

export type WorkspaceTab = 'edit' | 'preview';
export const useWorkspaceTabs = () => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('edit');

  const changeTab = (tab: WorkspaceTab) => {
    setActiveTab(tab);
  };

  return { activeTab, changeTab };
};
