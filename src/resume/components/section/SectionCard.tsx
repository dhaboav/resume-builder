import type { Entry, Section } from '@/shared/lib/resume';
import { Card } from '@/shared/ui';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { SectionEntry } from './SectionEntry';

interface SectionCardProps {
  section: Section;
  canUp: boolean;
  canDown: boolean;
  actions: {
    onMove: (direction: -1 | 1) => void;
    onDelete: () => void;
    onToggle: () => void;
    onTitle: (title: string) => void;
    onPatchEntry: (entryId: string, patch: Partial<Entry>) => void;
    onAddEntry: () => void;
    onRemoveEntry: (entryId: string) => void;
  };
}

export function SectionCard({ section, canUp, canDown, actions }: SectionCardProps) {
  const isContact = section.id === 'contact';
  return (
    <Card className="mb-4 overflow-hidden border-border p-0 shadow-sm">
      <div className="flex items-center gap-2 border-b bg-muted/40 px-3 py-2">
        <IconButton onClick={actions.onToggle} ariaLabel="Toggle section">
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${section.collapsed ? '-rotate-90' : ''}`}
          />
        </IconButton>

        <input
          value={section.title}
          onChange={(e) => actions.onTitle(e.target.value)}
          disabled={isContact}
          className="flex-1 border-b border-transparent bg-transparent py-0.5 text-sm font-semibold outline-none focus:border-muted-foreground/30 disabled:cursor-not-allowed disabled:opacity-90"
          placeholder="Section Title"
        />

        <span className="rounded-full border bg-background px-2 py-0.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
          {section.layoutStyle}
        </span>

        <div className="ml-1 flex items-center gap-0.5 border-l pl-1.5">
          {!isContact && (
            <>
              <IconButton onClick={() => actions.onMove(-1)} disabled={!canUp} ariaLabel="Move up">
                <ChevronUp className="h-4 w-4" />
              </IconButton>
              <IconButton
                onClick={() => actions.onMove(1)}
                disabled={!canDown}
                ariaLabel="Move down"
              >
                <ChevronDown className="h-4 w-4" />
              </IconButton>
            </>
          )}

          {!section.isRequired && !isContact && (
            <IconButton
              onClick={actions.onDelete}
              ariaLabel="Delete layout section"
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </IconButton>
          )}
        </div>
      </div>

      {/* ==================== CONTENT AREA ==================== */}
      {!section.collapsed && (
        <div className="space-y-3 bg-card p-4">
          {section.entries.map((entry) => (
            <SectionEntry
              key={entry.id}
              layout={section.layoutStyle}
              entry={entry}
              onChange={(patch) => actions.onPatchEntry(entry.id, patch)}
              onRemove={() => actions.onRemoveEntry(entry.id)}
              canRemove={section.entries.length > 1}
            />
          ))}

          {section.layoutStyle !== 'contact' && (
            <button
              onClick={actions.onAddEntry}
              className="hover:border-brand/70 hover:text-brand hover:bg-brand/5 flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border py-2 text-xs font-medium text-muted-foreground transition-all"
            >
              <Plus className="h-3.5 w-3.5" /> Add Row Item
            </button>
          )}
        </div>
      )}
    </Card>
  );
}

// Helper function
interface IconButtonProps {
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
}

function IconButton({ onClick, disabled, ariaLabel, className = '', children }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`rounded p-1 text-muted-foreground transition-all hover:bg-accent hover:text-foreground disabled:opacity-20 ${className}`}
    >
      {children}
    </button>
  );
}
