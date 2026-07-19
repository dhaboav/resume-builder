import { exportStateToJson, importStateFromJson } from '@/shared/lib/json';
import type { ResumeState } from '@/shared/lib/resume';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { resumeMutators, uid } from './mutators';
import type { ResumeStore } from './types';

const STORAGE_KEY = 'resume_workspace_state';

const getInitialState = (): ResumeState => ({
  template: 'ats',
  sections: [
    {
      id: 'contact',
      title: 'Contact Information',
      layoutStyle: 'contact',
      collapsed: false,
      isRequired: true,
      entries: [{ id: uid() }],
    },
  ],
});

const loadSavedState = (): ResumeState => {
  if (typeof window === 'undefined') return getInitialState();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : getInitialState();
  } catch {
    return getInitialState();
  }
};

export const useResumeStore = create<ResumeStore>()(
  subscribeWithSelector((set, get) => ({
    // State Utama
    state: loadSavedState(),

    // Actions yang sudah dikelompokkan secara terstruktur (Human-Readable)
    actions: {
      document: {
        setFullState: (newState) => set({ state: newState }),
        changeTemplate: (template) => set((s) => ({ state: { ...s.state, template } })),
        exportJson: () => exportStateToJson(get().state),
        importJson: async (file) => {
          try {
            const parsedData = await importStateFromJson(file);
            set({ state: parsedData });
          } catch (error) {
            throw new Error(
              error instanceof Error ? error.message : 'Invalid JSON file structure.',
            );
          }
        },
        downloadPdf: () => {
          const { state } = get();
          const contactSection = state.sections.find((s) => s.id === 'contact');
          const userName = contactSection?.entries[0]?.title || 'Resume';
          const originalTitle = document.title;

          document.title = `${userName.replace(/\s+/g, '_')}_Resume`;
          window.print();
          document.title = originalTitle;
        },
      },

      sections: {
        add: (title, layoutStyle) =>
          set((s) => ({
            state: {
              ...s.state,
              sections: [
                ...s.state.sections,
                {
                  id: uid(),
                  title,
                  layoutStyle,
                  collapsed: false,
                  isRequired: false,
                  entries: [{ id: uid() }],
                },
              ],
            },
          })),
        delete: (secId) =>
          set((s) => ({
            state: {
              ...s.state,
              sections: s.state.sections.filter((sec) => sec.id !== secId || sec.isRequired),
            },
          })),
        move: (secId, direction) =>
          set((s) => ({
            state: {
              ...s.state,
              sections: resumeMutators.moveSection(s.state.sections, secId, direction),
            },
          })),
        patch: (secId, patch) =>
          set((s) => ({
            state: {
              ...s.state,
              sections: resumeMutators.patchSection(s.state.sections, secId, patch),
            },
          })),
      },

      entries: {
        add: (secId) =>
          set((s) => ({
            state: { ...s.state, sections: resumeMutators.addEntry(s.state.sections, secId) },
          })),
        remove: (secId, entryId) =>
          set((s) => ({
            state: {
              ...s.state,
              sections: resumeMutators.removeEntry(s.state.sections, secId, entryId),
            },
          })),
        patch: (secId, entryId, patch) =>
          set((s) => ({
            state: {
              ...s.state,
              sections: resumeMutators.patchEntry(s.state.sections, secId, entryId, patch),
            },
          })),
      },
    },
  })),
);

// Reactive Autosave Middleware
if (typeof window !== 'undefined') {
  useResumeStore.subscribe(
    (store) => store.state,
    (state) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)),
    { fireImmediately: false },
  );
}
