import { Card } from '@/shared/components/ui/card';
import type { Entry, Section } from '@/shared/lib/resume';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import React from 'react';
import { EntryEditor } from './EntryEditor';

interface SectionCardProps {
  section: Section;
  canUp: boolean;
  canDown: boolean;
  onMove: (direction: -1 | 1) => void;
  onDelete: () => void;
  onToggle: () => void;
  onTitle: (title: string) => void;
  onPatchEntry: (entryId: string, patch: Partial<Entry>) => void;
  onAddEntry: () => void;
  onRemoveEntry: (entryId: string) => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  section,
  canUp,
  canDown,
  onMove,
  onDelete,
  onToggle,
  onTitle,
  onPatchEntry,
  onAddEntry,
  onRemoveEntry,
}) => {
  const isContactSection = section.id === 'contact';

  return (
    <Card className="mb-4 overflow-hidden border-border p-0 shadow-sm">
      <div className="flex items-center gap-2 border-b bg-muted/40 px-3 py-2">
        <button
          onClick={onToggle}
          className="rounded p-1 transition-transform hover:bg-accent"
          aria-label="Toggle section configuration view"
        >
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${section.collapsed ? '-rotate-90' : ''}`}
          />
        </button>

        <input
          value={section.title}
          onChange={(e) => onTitle(e.target.value)}
          disabled={isContactSection}
          className="flex-1 border-b border-transparent bg-transparent py-0.5 text-sm font-semibold outline-none focus:border-muted-foreground/30 disabled:cursor-not-allowed disabled:opacity-90"
          placeholder="Section Title"
        />

        <span className="rounded-full border bg-background px-2 py-0.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
          {section.layoutStyle}
        </span>

        <div className="ml-1 flex items-center gap-0.5 border-l pl-1.5">
          {!isContactSection && (
            <>
              <button
                onClick={() => onMove(-1)}
                disabled={!canUp}
                className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-20"
                aria-label="Move up"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => onMove(1)}
                disabled={!canDown}
                className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-20"
                aria-label="Move down"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </>
          )}

          {!section.isRequired && !isContactSection && (
            <button
              onClick={onDelete}
              className="rounded p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Delete layout section"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {!section.collapsed && (
        <div className="space-y-3 bg-card p-4">
          {section.entries.map((entry) => (
            <EntryEditor
              key={entry.id}
              layout={section.layoutStyle}
              entry={entry}
              onChange={(patch) => onPatchEntry(entry.id, patch)}
              onRemove={() => onRemoveEntry(entry.id)}
              canRemove={section.entries.length > 1 || !section.isRequired}
            />
          ))}

          {section.layoutStyle !== 'contact-block' && (
            <button
              onClick={onAddEntry}
              className="hover:border-brand/70 hover:text-brand hover:bg-brand/5 flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border py-2 text-xs font-medium text-muted-foreground transition-all"
            >
              <Plus className="h-3.5 w-3.5" /> Add Row Item
            </button>
          )}
        </div>
      )}
    </Card>
  );
};
