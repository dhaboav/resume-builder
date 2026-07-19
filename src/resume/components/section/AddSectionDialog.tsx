import type { LayoutStyle } from '@/shared/lib/resume';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Field,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { useState } from 'react';

interface AddSectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (title: string, layout: LayoutStyle) => void;
}

export function AddSectionDialog({ open, onOpenChange, onAdd }: AddSectionDialogProps) {
  const [title, setTitle] = useState('');
  const [layout, setLayout] = useState<LayoutStyle>('timeline');

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), layout);
    setTitle('');
    setLayout('timeline');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:min-w-lg">
        <DialogHeader>
          <DialogTitle>New Section</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Education, Projects"
            />
          </Field>

          <Field>
            <FieldLabel>Layout Style</FieldLabel>
            <Select value={layout} onValueChange={(v) => setLayout(v as LayoutStyle)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectItem value="timeline">
                  Timeline (title, subtitle, date, description)
                </SelectItem>
                <SelectItem value="grid">Grid (compact 2-column tags)</SelectItem>
                <SelectItem value="plain">Plain (single description block)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
