// src/modules/resume/templates/types.ts
import type { LayoutStyle } from '@/shared/lib/resume';

export interface ResumeTemplatePlugin {
  id: string;
  name: string;
  author: string;

  // Gaya untuk container utama (kertas A4)
  wrapperClass: string;

  // Gaya untuk judul setiap Section
  sectionTitleClass: string;

  // Gaya pemisah antar Section (misal margin/padding)
  sectionSpacingClass: string;

  // Pemetaan gaya berdasarkan `layoutStyle` yang dipilih user
  layouts: Record<
    LayoutStyle,
    {
      containerClass: string; // Class untuk pembungkus entries di layout ini
      entryClass: string; // Class untuk setiap item entry
      titleClass: string; // Class untuk entry.title
      subtitleClass: string; // Class untuk entry.subtitle
      dateClass: string; // Class untuk entry.date
      descClass: string; // Class untuk entry.description
    }
  >;
}
