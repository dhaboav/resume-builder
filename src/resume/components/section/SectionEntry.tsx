import type { Entry, EntryLabels, LayoutStyle } from '@/shared/lib/resume';
import { Input, Label, Textarea } from '@/shared/ui';
import { X } from 'lucide-react';
import React from 'react';

interface SectionEntryProps {
  layout: LayoutStyle;
  entry: Entry;
  onChange: (patch: Partial<EntryLabels>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export const SectionEntry: React.FC<SectionEntryProps> = React.memo(
  ({ layout, entry, onChange, onRemove, canRemove }) => {
    const isContact = layout === 'contact';

    if (layout === 'plain') {
      return (
        <Field label="Description">
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
          <Field label="Title">
            <Input
              value={entry.title ?? ''}
              onChange={(e) => onChange({ title: e.target.value })}
            />
          </Field>
          <Field label="Subtitle">
            <Input
              value={entry.subtitle ?? ''}
              onChange={(e) => onChange({ subtitle: e.target.value })}
            />
          </Field>

          {isContact && (
            <>
              <Field label="Date">
                <Input
                  value={entry.date ?? ''}
                  onChange={(e) => onChange({ date: e.target.value })}
                />
              </Field>
              <Field label="Description">
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
            <Field label="Date">
              <Input
                value={entry.date ?? ''}
                onChange={(e) => onChange({ date: e.target.value })}
              />
            </Field>
            <Field label="Description">
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

SectionEntry.displayName = 'SectionEntry';

/* Internal sub-component to isolate input field layouts cleanly */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-[10px] tracking-wider text-muted-foreground uppercase">{label}</Label>
      {children}
    </div>
  );
}
