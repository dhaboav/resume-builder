import type { LayoutStyle } from '@/shared/lib/resume';

export interface TemplateStyle {
  id: string;
  name: string;
  author: string;
  wrapperClass: string;
  sectionTitleClass: string;
  sectionSpacingClass: string;
  layouts: Record<
    LayoutStyle,
    {
      containerClass: string;
      entryClass: string;
      titleClass: string;
      subtitleClass: string;
      dateClass: string;
      descClass: string;
    }
  >;
}
