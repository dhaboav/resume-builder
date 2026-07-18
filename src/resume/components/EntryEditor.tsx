import { getLabelsByLayout } from '@/resume/hooks/useEntryLabels';
import type { Entry, LayoutStyle } from '@/shared/lib/resume';
import { Input, Label, Textarea } from '@/shared/ui';
import { X } from 'lucide-react';
import React from 'react';

interface EntryEditorProps {
  layout: LayoutStyle;
  entry: Entry;
  onChange: (patch: Partial<Entry>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export const EntryEditor: React.FC<EntryEditorProps> = React.memo(
  ({ layout, entry, onChange, onRemove, canRemove }) => {
    const labels = getLabelsByLayout(layout);
    const isContact = layout === 'contact-block';

    if (layout === 'plain') {
      return (
        <Field label={labels.description}>
          <Textarea
            rows={4}
            value={entry.description ?? ''}
            onChange={(e) => onChange({ description: e.target.value })}
          />
        </Field>
      );
    }

    return (
      <div className="relative space-y-2 rounded-md border bg-background/40 p-3">
        {canRemove && !isContact && (
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 rounded p-1 text-muted-foreground hover:text-destructive"
            aria-label="Remove entry"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Field label={labels.title}>
            <Input
              value={entry.title ?? ''}
              onChange={(e) => onChange({ title: e.target.value })}
            />
          </Field>
          <Field label={labels.subtitle}>
            <Input
              value={entry.subtitle ?? ''}
              onChange={(e) => onChange({ subtitle: e.target.value })}
            />
          </Field>

          {isContact && (
            <>
              <Field label={labels.date}>
                <Input
                  value={entry.date ?? ''}
                  onChange={(e) => onChange({ date: e.target.value })}
                />
              </Field>
              <Field label={labels.description}>
                <Input
                  value={entry.description ?? ''}
                  onChange={(e) => onChange({ description: e.target.value })}
                />
              </Field>
            </>
          )}
        </div>

        {layout === 'timeline' && (
          <>
            <Field label={labels.date}>
              <Input
                value={entry.date ?? ''}
                onChange={(e) => onChange({ date: e.target.value })}
              />
            </Field>
            <Field label={labels.description}>
              <Textarea
                rows={3}
                value={entry.description ?? ''}
                onChange={(e) => onChange({ description: e.target.value })}
              />
            </Field>
          </>
        )}
      </div>
    );
  },
);

EntryEditor.displayName = 'EntryEditor';

/* Internal sub-component to isolate input field layouts cleanly */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-[10px] tracking-wider text-muted-foreground uppercase">{label}</Label>
      {children}
    </div>
  );
}
