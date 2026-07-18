export type LayoutStyle = 'timeline' | 'grid' | 'plain' | 'contact-block';
export type TemplateStyle = 'ats' | 'creative';

export interface Entry {
  id: string;
  title?: string;
  subtitle?: string;
  date?: string;
  description?: string;
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
  template: TemplateStyle;
  sections: Section[];
}
