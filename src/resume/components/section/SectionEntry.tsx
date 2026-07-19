import type { Entry, EntryLabels, LayoutStyle } from '@/shared/lib/resume';
import { Field, FieldLabel, Input, Textarea } from '@/shared/ui';
import { X } from 'lucide-react';

interface SectionEntryProps {
  layout: LayoutStyle;
  entry: Entry;
  onChange: (patch: Partial<EntryLabels>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

interface FieldConfig {
  key: keyof EntryLabels;
  label: string;
  Component: typeof Input | typeof Textarea;
  rows?: number;
}

const LAYOUT_FIELDS: Record<LayoutStyle, FieldConfig[]> = {
  plain: [{ key: 'description', label: 'Description', Component: Textarea, rows: 4 }],
  grid: [
    { key: 'title', label: 'Title', Component: Input },
    { key: 'subtitle', label: 'Subtitle', Component: Input },
  ],
  contact: [
    { key: 'title', label: 'Name', Component: Input },
    { key: 'subtitle', label: 'Email', Component: Input },
    { key: 'date', label: 'Linked', Component: Input },
    { key: 'description', label: 'Location', Component: Input },
  ],
  timeline: [
    { key: 'title', label: 'Title', Component: Input },
    { key: 'subtitle', label: 'Subtitle', Component: Input },
    { key: 'date', label: 'Date', Component: Input },
    { key: 'description', label: 'Description', Component: Textarea, rows: 3 },
  ],
};

export function SectionEntry({ layout, entry, onChange, onRemove, canRemove }: SectionEntryProps) {
  const isContact = layout === 'contact';
  const fields = LAYOUT_FIELDS[layout] || LAYOUT_FIELDS.timeline;
  return (
    <div className="relative space-y-2 rounded-md border bg-background/40 p-3">
      {canRemove && !isContact && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 z-10 rounded p-1 text-muted-foreground hover:text-destructive"
          aria-label="Remove entry"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      <div className="grid grid-cols-2 gap-2">
        {fields.map(({ key, label, Component, rows }) => (
          <Field key={key} className={Component === Textarea ? 'col-span-2' : ''}>
            <FieldLabel>{label}</FieldLabel>
            <Component
              rows={rows}
              value={entry[key] ?? ''}
              onChange={(e) => onChange({ [key]: e.target.value })}
            />
          </Field>
        ))}
      </div>
    </div>
  );
}
