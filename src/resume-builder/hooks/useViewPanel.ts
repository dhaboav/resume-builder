import { useState } from 'react';

export type TabMode = 'edit' | 'preview';

export function useViewPanel() {
  const [text, setText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabMode>('edit');

  const handleTextChange = (value: string) => {
    setText(value);
  };

  return {
    text,
    activeTab,
    setActiveTab,
    handleTextChange,
  };
}
