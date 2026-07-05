import type { Entry, LayoutStyle, ResumeState, Section, TemplateStyle } from '@/shared/lib/resume';
import { useEffect, useState } from 'react';

const uid = () => Math.random().toString(36).substring(2, 9);

const STORAGE_KEY = 'resume_workspace_state';

const getInitialState = (): ResumeState => ({
  template: 'ats',
  sections: [
    {
      id: 'contact',
      title: 'Contact Information',
      layoutStyle: 'contact-block',
      collapsed: false,
      isRequired: true,
      entries: [{ id: uid() }],
    },
  ],
});

export function useResumeState() {
  const [state, setState] = useState<ResumeState>(() => {
    if (typeof window === 'undefined') return getInitialState();
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : getInitialState();
    } catch {
      return getInitialState();
    }
  });

  const setFullState = (newState: ResumeState) => {
    setState(newState);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const changeTemplate = (template: TemplateStyle) => setState((s) => ({ ...s, template }));

  const patchSection = (secId: string, patch: Partial<Omit<Section, 'entries' | 'id'>>) =>
    setState((s) => ({
      ...s,
      sections: s.sections.map((sec) => (sec.id === secId ? { ...sec, ...patch } : sec)),
    }));

  const addSection = (title: string, layoutStyle: LayoutStyle) =>
    setState((s) => ({
      ...s,
      sections: [
        ...s.sections,
        {
          id: uid(),
          title,
          layoutStyle,
          collapsed: false,
          isRequired: false,
          entries: [{ id: uid() }],
        },
      ],
    }));

  const deleteSection = (secId: string) =>
    setState((s) => ({
      ...s,
      sections: s.sections.filter((sec) => sec.id !== secId || sec.isRequired),
    }));

  const moveSection = (secId: string, direction: -1 | 1) => {
    if (secId === 'contact') return;

    setState((s) => {
      const index = s.sections.findIndex((sec) => sec.id === secId);
      const targetIndex = index + direction;

      if (targetIndex === 0 || index < 0 || targetIndex < 0 || targetIndex >= s.sections.length) {
        return s;
      }

      const newSections = [...s.sections];
      [newSections[index], newSections[targetIndex]] = [
        newSections[targetIndex],
        newSections[index],
      ];
      return { ...s, sections: newSections };
    });
  };

  const patchEntry = (secId: string, entryId: string, patch: Partial<Entry>) =>
    setState((s) => ({
      ...s,
      sections: s.sections.map((sec) =>
        sec.id !== secId
          ? sec
          : {
              ...sec,
              entries: sec.entries.map((ent) => (ent.id === entryId ? { ...ent, ...patch } : ent)),
            },
      ),
    }));

  const addEntry = (secId: string) =>
    setState((s) => ({
      ...s,
      sections: s.sections.map((sec) =>
        sec.id !== secId ? sec : { ...sec, entries: [...sec.entries, { id: uid() }] },
      ),
    }));

  const removeEntry = (secId: string, entryId: string) =>
    setState((s) => ({
      ...s,
      sections: s.sections.map((sec) =>
        sec.id !== secId
          ? sec
          : { ...sec, entries: sec.entries.filter((ent) => ent.id !== entryId) },
      ),
    }));

  return {
    state,
    setFullState,
    changeTemplate,
    patchSection,
    addSection,
    deleteSection,
    moveSection,
    patchEntry,
    addEntry,
    removeEntry,
  };
}

export type UseResumeStateReturn = ReturnType<typeof useResumeState>;
