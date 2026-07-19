import { useResumeStore } from '@/resume/hooks/useResumeState';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { RESUME_TEMPLATES } from '../templates/registry';
import { AddSectionDialog } from './section/AddSectionDialog';
import { SectionCard } from './section/SectionCard';

export const FormPanel: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  // 💡 1. Ambil data state secara terpisah/spesifik agar re-render lebih efisien
  const template = useResumeStore((store) => store.state.template);
  const sections = useResumeStore((store) => store.state.sections);

  // 💡 2. Ambil seluruh actions yang dibutuhkan dari store
  const changeTemplate = useResumeStore((store) => store.changeTemplate);
  const patchSection = useResumeStore((store) => store.patchSection);
  const addSection = useResumeStore((store) => store.addSection);
  const deleteSection = useResumeStore((store) => store.deleteSection);
  const moveSection = useResumeStore((store) => store.moveSection);
  const patchEntry = useResumeStore((store) => store.patchEntry);
  const addEntry = useResumeStore((store) => store.addEntry);
  const removeEntry = useResumeStore((store) => store.removeEntry);

  return (
    <div className="flex h-full flex-col p-6">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Builder</h1>
          <p className="mt-1 text-xs text-slate-400">Edits save automatically.</p>
        </div>

        {/* Pemilihan Template */}
        <Select
          value={template}
          onValueChange={(value) => {
            // 💡 Cegah nilai null masuk ke Zustand store
            if (value !== null) {
              changeTemplate(value);
            }
            // Opsi alternatif jika ingin ada fallback string kosong:
            // changeTemplate(value ?? '');
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Template" />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            {RESUME_TEMPLATES.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>

      {/* List / Loop Section List */}
      <div className="mb-4 space-y-4">
        {sections.map((sec, i) => (
          <SectionCard
            key={sec.id}
            section={sec}
            canUp={i > 0}
            canDown={i < sections.length - 1}
            onMove={(direction) => moveSection(sec.id, direction)}
            onDelete={() => deleteSection(sec.id)}
            onToggle={() => patchSection(sec.id, { collapsed: !sec.collapsed })}
            onTitle={(title) => patchSection(sec.id, { title })}
            onPatchEntry={(entryId, patch) => patchEntry(sec.id, entryId, patch)}
            onAddEntry={() => addEntry(sec.id)}
            onRemoveEntry={(entryId) => removeEntry(sec.id, entryId)}
          />
        ))}
      </div>

      {/* Tombol Add New Section */}
      <button
        onClick={() => setDialogOpen(true)}
        className="hover:border-brand hover:text-brand hover:bg-brand/5 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-4 text-sm font-medium text-muted-foreground transition"
      >
        <Plus className="h-4 w-4" /> Add New Section
      </button>

      {/* Dialog untuk Tambah Section */}
      <AddSectionDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={addSection} />
    </div>
  );
};
