export type LayoutStyle = 'timeline' | 'grid' | 'plain' | 'contact-block';
export type TemplateStyle = 'ats' | 'creative';

export interface Entry {
  id: string; // Unique identifier for the puzzle piece row
  title?: string; // Morphs based on layout (e.g., Job Title, Full Name)
  subtitle?: string; // Morphs based on layout (e.g., Company Name, Email)
  date?: string; // Morphs based on layout (e.g., Employment Dates, Phone)
  description?: string; // Morphs based on layout (e.g., Bullet Points, Summary)
}

export interface Section {
  id: string; // Unique section identifier (e.g., "experience", "education")
  title: string; // Custom name typed by user (e.g., "Professional Experience")
  layoutStyle: LayoutStyle; // Determines how inputs morph and preview renders
  collapsed: boolean; // Accordion toggle state in the form panel
  isRequired: boolean; // If true, protects section from deletion (like contact info)
  entries: Entry[]; // Array of puzzle piece rows inside this section
}

export interface ResumeState {
  template: TemplateStyle; // Global visual layout style for the preview panel
  sections: Section[]; // Ordered list of sections forming the document body
}
