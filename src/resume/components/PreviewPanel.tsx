import { RESUME_TEMPLATES } from '@/resume/templates/registry';
import type { ResumeState } from '@/shared/lib/resume';
import React from 'react';

export const PreviewPanel: React.FC<{ state: ResumeState }> = ({ state }) => {
  // 1. Ambil skema gaya berdasarkan id template aktif
  const theme = RESUME_TEMPLATES.find((t) => t.id === state.template) || RESUME_TEMPLATES[0];

  return (
    <div className="flex h-full w-full justify-center overflow-y-auto bg-slate-100 p-4 lg:p-8 print:h-auto print:overflow-visible print:bg-white print:p-0">
      {/* KERTAS UTAMA DENGAN WRAPPER STYLE DARI TEMPLATE */}
      <div
        className={`min-h-[297mm] w-[210mm] border border-gray-200 bg-white shadow-2xl print:my-0 print:block print:h-auto print:w-full print:overflow-visible print:border-none print:shadow-none ${theme.wrapperClass}`}
      >
        {state.sections.map((section) => {
          if (section.collapsed) return null;

          // Ambil konfigurasi visual khusus untuk tipe layout section ini
          const layoutTheme = theme.layouts[section.layoutStyle];

          return (
            <div key={section.id} className={theme.sectionSpacingClass}>
              {/* 💡 JUDUL SECTION: Otomatis 'hidden' jika tipenya contact-block */}
              <h2
                className={`${theme.sectionTitleClass} ${section.layoutStyle === 'contact-block' ? 'hidden' : ''}`}
              >
                {section.title}
              </h2>

              {/* CONTAINER ENTRIES BAKU */}
              <div className={layoutTheme.containerClass}>
                {section.entries.map((entry) => (
                  /* ITEM ENTRY BAKU */
                  <div key={entry.id} className={layoutTheme.entryClass}>
                    {section.layoutStyle === 'contact-block' ? (
                      // Struktur Khusus Data Kontak (Murni Value + Tailwind Class)
                      <>
                        {entry.title && <div className={layoutTheme.titleClass}>{entry.title}</div>}
                        {entry.subtitle && (
                          <div className={layoutTheme.subtitleClass}>{entry.subtitle}</div>
                        )}
                        {entry.date && <div className={layoutTheme.dateClass}>{entry.date}</div>}
                        {entry.description && (
                          <div className={layoutTheme.descClass}>{entry.description}</div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex items-baseline justify-between">
                          {entry.title && (
                            <span className={layoutTheme.titleClass}>{entry.title}</span>
                          )}
                          {entry.date && (
                            <span className={layoutTheme.dateClass}>{entry.date}</span>
                          )}
                        </div>
                        {entry.subtitle && (
                          <div className={layoutTheme.subtitleClass}>{entry.subtitle}</div>
                        )}
                        {entry.description && (
                          <p className={layoutTheme.descClass}>{entry.description}</p>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
