import { useResumeStore } from '@/resume/hooks/useResumeState';
import { RESUME_TEMPLATES } from '@/resume/templates/registry';
import React from 'react';

export const PreviewPanel: React.FC = () => {
  /* 
    💡 SELEKTOR ATOMIK ZUSTAND:
    Komponen ini HANYA akan me-render ulang jika objek `state` di dalam store berubah.
    Jika fungsi aksi lain dipicu di aplikasi, komponen ini tidak akan terganggu.
  */
  const state = useResumeStore((store) => store.state);

  // 1. Ambil skema gaya berdasarkan id template aktif
  const theme = RESUME_TEMPLATES.find((t) => t.id === state.template) || RESUME_TEMPLATES[0];

  return (
    <div className="flex h-full w-full justify-center overflow-y-auto bg-slate-100 p-4 lg:p-8 print:block print:h-auto print:overflow-visible print:bg-white print:p-0">
      {/* KERTAS UTAMA (A4) */}
      <article
        className={`min-h-[297mm] w-[210mm] border border-gray-200 bg-white shadow-2xl print:my-0 print:block print:h-auto print:w-full print:overflow-visible print:border-none print:shadow-none ${theme.wrapperClass || ''}`}
      >
        {state.sections.map((section) => {
          if (section.collapsed) return null;

          const layoutTheme = theme.layouts?.[section.layoutStyle] || {};

          return (
            <section
              key={section.id}
              className={`${theme.sectionSpacingClass || ''} print:break-inside-avoid`}
            >
              <h2
                className={`${theme.sectionTitleClass || ''} ${
                  section.layoutStyle === 'contact-block' ? 'sr-only' : ''
                }`}
              >
                {section.title}
              </h2>

              <div className={layoutTheme.containerClass || ''}>
                {section.entries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`${layoutTheme.entryClass || ''} print:break-inside-avoid`}
                  >
                    {section.layoutStyle === 'contact-block' ? (
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
                        <div className="flex items-baseline justify-between gap-4">
                          {entry.title && (
                            <span className={`${layoutTheme.titleClass || ''} font-semibold`}>
                              {entry.title}
                            </span>
                          )}
                          {entry.date && (
                            <span className={`${layoutTheme.dateClass || ''} shrink-0 text-sm`}>
                              {entry.date}
                            </span>
                          )}
                        </div>
                        {entry.subtitle && (
                          <div className={layoutTheme.subtitleClass || ''}>{entry.subtitle}</div>
                        )}
                        {entry.description && (
                          <p className={`${layoutTheme.descClass || ''} whitespace-pre-line`}>
                            {entry.description}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </article>
    </div>
  );
};
