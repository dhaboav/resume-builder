import { useResumeStore } from '@/resume/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui';
import { templateStyleRegistry } from '@/templates/registry';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AddSectionDialog, SectionCard } from './section';

export function FormPanel() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { state, actions } = useResumeStore();
  const { template, sections } = state;

  return (
    <div className="flex h-full flex-col p-6">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Builder</h1>
          <p className="mt-1 text-xs text-slate-400">Edits save automatically.</p>
        </div>

        <Select
          value={template}
          onValueChange={(value) => {
            if (value !== null) {
              actions.document.changeTemplate(value);
            }
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Template" />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            {templateStyleRegistry.getAll().map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>

      <div className="mb-4 space-y-4 overflow-y-auto">
        {sections.map((sec, i) => (
          <SectionCard
            key={sec.id}
            section={sec}
            canUp={i > 1}
            canDown={i < sections.length - 1}
            actions={{
              onMove: (dir) => actions.sections.move(sec.id, dir),
              onDelete: () => actions.sections.delete(sec.id),
              onToggle: () => actions.sections.patch(sec.id, { collapsed: !sec.collapsed }),
              onTitle: (title) => actions.sections.patch(sec.id, { title }),
              onPatchEntry: (eid, p) => actions.entries.patch(sec.id, eid, p),
              onAddEntry: () => actions.entries.add(sec.id),
              onRemoveEntry: (eid) => actions.entries.remove(sec.id, eid),
            }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setDialogOpen(true)}
        className="hover:border-brand hover:text-brand hover:bg-brand/5 mb-18 flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-4 text-sm font-medium text-muted-foreground transition lg:mb-0"
      >
        <Plus className="h-4 w-4" /> Add New Section
      </button>

      <AddSectionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={actions.sections.add}
      />
    </div>
  );
}
