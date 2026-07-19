import { exportStateToJson, importStateFromJson } from '@/shared/lib/json';
import type { Entry, LayoutStyle, ResumeState, Section } from '@/shared/lib/resume';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface ResumeActions {
  setFullState: (newState: ResumeState) => void;
  changeTemplate: (template: string) => void;
  patchSection: (secId: string, patch: Partial<Omit<Section, 'entries' | 'id'>>) => void;
  addSection: (title: string, layoutStyle: LayoutStyle) => void;
  deleteSection: (secId: string) => void;
  moveSection: (secId: string, direction: -1 | 1) => void;
  patchEntry: (secId: string, entryId: string, patch: Partial<Entry>) => void;
  addEntry: (secId: string) => void;
  removeEntry: (secId: string, entryId: string) => void;

  // Document Operations (Single Responsibility Core)
  exportJson: () => void;
  importJson: (file: File) => Promise<void>;
  downloadPdf: () => void;
}

interface ResumeStore extends ResumeActions {
  state: ResumeState;
}

const uid = () => Math.random().toString(36).substring(2, 9);
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

// Safe LocalStorage Loader untuk SSR / Next.js
const loadSavedState = (): ResumeState => {
  if (typeof window === 'undefined') return getInitialState();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : getInitialState();
  } catch {
    return getInitialState();
  }
};

// 💡 Menggunakan middleware `subscribeWithSelector` agar pola subscribe sub-state di bawah aktif
export const useResumeStore = create<ResumeStore>()(
  subscribeWithSelector((set, get) => ({
    // State Murni
    state: loadSavedState(),

    // Mutasi Atomik & Efisien
    setFullState: (newState) => set({ state: newState }),

    changeTemplate: (template) => set((s) => ({ state: { ...s.state, template } })),

    patchSection: (secId, patch) =>
      set((s) => ({
        state: {
          ...s.state,
          sections: s.state.sections.map((sec) => (sec.id === secId ? { ...sec, ...patch } : sec)),
        },
      })),

    addSection: (title, layoutStyle) =>
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

    deleteSection: (secId) =>
      set((s) => ({
        state: {
          ...s.state,
          sections: s.state.sections.filter((sec) => sec.id !== secId || sec.isRequired),
        },
      })),

    moveSection: (secId, direction) => {
      if (secId === 'contact') return;
      set((s) => {
        const index = s.state.sections.findIndex((sec) => sec.id === secId);
        const targetIndex = index + direction;

        // Proteksi guard clause: batalkan operasi jika di luar batas array
        if (
          targetIndex === 0 ||
          index < 0 ||
          targetIndex < 0 ||
          targetIndex >= s.state.sections.length
        ) {
          return {};
        }

        const newSections = [...s.state.sections];
        [newSections[index], newSections[targetIndex]] = [
          newSections[targetIndex],
          newSections[index],
        ];
        return { state: { ...s.state, sections: newSections } };
      });
    },

    patchEntry: (secId, entryId, patch) =>
      set((s) => ({
        state: {
          ...s.state,
          sections: s.state.sections.map((sec) =>
            sec.id !== secId
              ? sec
              : {
                  ...sec,
                  entries: sec.entries.map((ent) =>
                    ent.id === entryId ? { ...ent, ...patch } : ent,
                  ),
                },
          ),
        },
      })),

    addEntry: (secId) =>
      set((s) => ({
        state: {
          ...s.state,
          sections: s.state.sections.map((sec) =>
            sec.id !== secId ? sec : { ...sec, entries: [...sec.entries, { id: uid() }] },
          ),
        },
      })),

    removeEntry: (secId, entryId) =>
      set((s) => ({
        state: {
          ...s.state,
          sections: s.state.sections.map((sec) =>
            sec.id !== secId
              ? sec
              : { ...sec, entries: sec.entries.filter((ent) => ent.id !== entryId) },
          ),
        },
      })),

    // Infrastructure Services (I/O & PDF)
    exportJson: () => {
      exportStateToJson(get().state);
    },

    importJson: async (file) => {
      try {
        const parsedData = await importStateFromJson(file);
        set({ state: parsedData });
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Invalid JSON file structure.');
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
  })),
);

// Autosave Middleware via Reactive Subscriber (Bebas dari React Render Cycle)
if (typeof window !== 'undefined') {
  useResumeStore.subscribe(
    (store) => store.state,
    (state) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    { fireImmediately: false },
  );
}
