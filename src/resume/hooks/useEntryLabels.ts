import type { LayoutStyle } from '@/shared/lib/resume';

interface EntryLabels {
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

const DEFAULT_LABELS: EntryLabels = {
  title: 'Title',
  subtitle: 'Subtitle',
  date: 'Date',
  description: 'Description',
};

const CONTACT_LABELS: EntryLabels = {
  title: 'Full Name',
  subtitle: 'Email',
  date: 'Phone',
  description: 'LinkedIn',
};

export function getLabelsByLayout(layout: LayoutStyle): EntryLabels {
  return layout === 'contact-block' ? CONTACT_LABELS : DEFAULT_LABELS;
}
