export type LayoutStyle = 'contact' | 'timeline' | 'grid' | 'plain';

export interface EntryLabels {
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface Entry extends Partial<EntryLabels> {
  id: string;
}

export interface Section {
  id: string;
  title: string;
  layoutStyle: LayoutStyle;
  collapsed: boolean;
  isRequired: boolean;
  entries: Entry[];
}

export interface ResumeState {
  template: string;
  sections: Section[];
}
