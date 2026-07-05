import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import type { LayoutStyle } from '@/shared/lib/resume';
import React, { useState } from 'react';

interface AddSectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (title: string, layout: LayoutStyle) => void;
}

export const AddSectionDialog: React.FC<AddSectionDialogProps> = ({
  open,
  onOpenChange,
  onAdd,
}) => {
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
          <Field label="Title">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Education, Projects"
            />
          </Field>

          <Field label="Layout Style">
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
          <Button variant="default" size="lg" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* Internal Form Helper */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
        {label}
      </Label>
      {children}
    </div>
  );
}
