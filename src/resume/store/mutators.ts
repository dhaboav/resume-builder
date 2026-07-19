import type { Entry, Section } from '@/shared/lib/resume';

export const uid = () => Math.random().toString(36).substring(2, 9);

export const resumeMutators = {
  patchSection: (sections: Section[], secId: string, patch: Partial<Section>): Section[] =>
    sections.map((sec) => (sec.id === secId ? { ...sec, ...patch } : sec)),

  moveSection: (sections: Section[], secId: string, direction: -1 | 1): Section[] => {
    if (secId === 'contact') return sections;
    const index = sections.findIndex((sec) => sec.id === secId);
    const target = index + direction;
    if (index <= 1 || target < 1 || target >= sections.length) return sections;

    const result = [...sections];
    [result[index], result[target]] = [result[target], result[index]];
    return result;
  },

  patchEntry: (
    sections: Section[],
    secId: string,
    entryId: string,
    patch: Partial<Entry>,
  ): Section[] =>
    sections.map((sec) =>
      sec.id !== secId
        ? sec
        : {
            ...sec,
            entries: sec.entries.map((ent) => (ent.id === entryId ? { ...ent, ...patch } : ent)),
          },
    ),

  addEntry: (sections: Section[], secId: string): Section[] =>
    sections.map((sec) =>
      sec.id !== secId ? sec : { ...sec, entries: [...sec.entries, { id: uid() }] },
    ),

  removeEntry: (sections: Section[], secId: string, entryId: string): Section[] =>
    sections.map((sec) =>
      sec.id !== secId ? sec : { ...sec, entries: sec.entries.filter((ent) => ent.id !== entryId) },
    ),
};
