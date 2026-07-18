import type { ResumeState } from '@/shared/lib/resume';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { AddSectionDialog } from './AddSectionDialog';
import { SectionCard } from './SectionCard';

interface FormPanelProps {
  state: ResumeState;
  actions: any;
}

export const FormPanel: React.FC<FormPanelProps> = ({ state, actions }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex h-full flex-col p-6">
      <header className="mb-1">
        <h1 className="text-xl font-bold tracking-tight">Builder</h1>
        <p className="mt-1 text-xs text-slate-400">Edits save automatically.</p>
      </header>

      {state.sections.map((sec, i) => (
        <SectionCard
          key={sec.id}
          section={sec}
          canUp={i > 0}
          canDown={i < state.sections.length - 1}
          onMove={(d) => actions.moveSection(sec.id, d)}
          onDelete={() => actions.deleteSection(sec.id)}
          onToggle={() => actions.patchSection(sec.id, { collapsed: !sec.collapsed })}
          onTitle={(t) => actions.patchSection(sec.id, { title: t })}
          onPatchEntry={(eid, p) => actions.patchEntry(sec.id, eid, p)}
          onAddEntry={() => actions.addEntry(sec.id)}
          onRemoveEntry={(eid) => actions.removeEntry(sec.id, eid)}
        />
      ))}

      <button
        onClick={() => setDialogOpen(true)}
        className="hover:border-brand hover:text-brand hover:bg-brand/5 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-4 text-sm font-medium text-muted-foreground transition"
      >
        <Plus className="h-4 w-4" /> Add New Section
      </button>

      <AddSectionDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={actions.addSection} />
    </div>
  );
};
