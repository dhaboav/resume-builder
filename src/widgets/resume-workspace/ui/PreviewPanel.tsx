import type { ResumeState } from '@/shared/lib/resume';
import React from 'react';

interface PreviewPanelProps {
  state: ResumeState;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ state }) => {
  return (
    <div className="flex h-full w-full justify-center overflow-y-auto bg-slate-100 p-4 lg:p-8">
      <div className="h-[297mm] w-[210mm] space-y-6 border border-gray-200 bg-white p-16 text-slate-800 shadow-2xl transition-all print:my-0 print:border-none print:shadow-none">
        {state.sections.map((section) => {
          const isContact = section.id === 'contact';

          return (
            <div key={section.id} className="space-y-3">
              <h2 className="border-b pb-1 text-sm font-bold tracking-wider text-slate-900 uppercase">
                {section.title}
              </h2>

              <div className={isContact ? 'grid grid-cols-2 gap-x-4 gap-y-1 text-xs' : 'space-y-4'}>
                {section.entries.map((entry) => {
                  if (isContact) {
                    return (
                      <React.Fragment key={entry.id}>
                        {entry.title && (
                          <div>
                            <span className="font-semibold">Name:</span> {entry.title}
                          </div>
                        )}
                        {entry.subtitle && (
                          <div>
                            <span className="font-semibold">Email:</span> {entry.subtitle}
                          </div>
                        )}
                        {entry.date && (
                          <div>
                            <span className="font-semibold">Phone:</span> {entry.date}
                          </div>
                        )}
                        {entry.description && (
                          <div>
                            <span className="font-semibold">LinkedIn:</span> {entry.description}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  }

                  return (
                    <div key={entry.id} className="text-xs">
                      {section.layoutStyle === 'plain' ? (
                        <p className="leading-relaxed whitespace-pre-line text-slate-600">
                          {entry.description}
                        </p>
                      ) : section.layoutStyle === 'grid' ? (
                        <div className="flex items-center justify-between rounded bg-slate-50 p-2">
                          <span className="font-semibold text-slate-700">{entry.title}</span>
                          <span className="text-slate-500">{entry.subtitle}</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex justify-between font-semibold text-slate-900">
                            <span>{entry.title}</span>
                            <span className="font-normal text-slate-500">{entry.date}</span>
                          </div>
                          <div className="text-slate-600 italic">{entry.subtitle}</div>
                          <p className="mt-1 leading-relaxed whitespace-pre-line text-slate-600">
                            {entry.description}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {state.sections.length === 0 && (
          <div className="flex h-full items-center justify-center text-sm text-slate-400 italic">
            Belum ada data untuk ditampilkan.
          </div>
        )}
      </div>
    </div>
  );
};
