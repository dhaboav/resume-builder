import type { Entry, LayoutStyle, ResumeState, Section } from '@/shared/lib/resume';

export interface ResumeActions {
  document: {
    setFullState: (newState: ResumeState) => void;
    changeTemplate: (template: string) => void;
    exportJson: () => void;
    importJson: (file: File) => Promise<void>;
    downloadPdf: () => void;
  };

  sections: {
    add: (title: string, layoutStyle: LayoutStyle) => void;
    delete: (secId: string) => void;
    move: (secId: string, direction: -1 | 1) => void;
    patch: (secId: string, patch: Partial<Omit<Section, 'entries' | 'id'>>) => void;
  };

  entries: {
    add: (secId: string) => void;
    remove: (secId: string, entryId: string) => void;
    patch: (secId: string, entryId: string, patch: Partial<Entry>) => void;
  };
}

export interface ResumeStore {
  state: ResumeState;
  actions: ResumeActions;
}
