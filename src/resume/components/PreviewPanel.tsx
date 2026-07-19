import { useResumeStore } from '@/resume/store';
import type { Entry, LayoutStyle } from '@/shared/lib/resume';
import { templateStyleRegistry } from '@/templates/registry';
import type { TemplateStyle } from '@/templates/types';
import { clsx } from 'clsx';

interface EntryProps {
  entry: Entry;
  layout: TemplateStyle['layouts'][LayoutStyle];
}

const LAYOUT_STRATEGIES: Record<
  string,
  {
    isSrOnly: boolean;
    Render: React.FC<EntryProps>;
  }
> = {
  contact: {
    isSrOnly: true,
    Render: ({ entry, layout }) => (
      <>
        {entry.title && <div className={clsx(layout.titleClass)}>{entry.title}</div>}
        {entry.subtitle && <div className={clsx(layout.subtitleClass)}>{entry.subtitle}</div>}
        {entry.date && <div className={clsx(layout.dateClass)}>{entry.date}</div>}
        {entry.description && <div className={clsx(layout.descClass)}>{entry.description}</div>}
      </>
    ),
  },
  default: {
    isSrOnly: false,
    Render: ({ entry, layout }) => (
      <>
        <div className="flex items-baseline justify-between gap-4">
          {entry.title && (
            <span className={clsx(layout.titleClass, 'font-semibold')}>{entry.title}</span>
          )}
          {entry.date && (
            <span className={clsx(layout.dateClass, 'shrink-0 text-sm')}>{entry.date}</span>
          )}
        </div>
        {entry.subtitle && <div className={clsx(layout.subtitleClass)}>{entry.subtitle}</div>}
        {entry.description && (
          <p className={clsx(layout.descClass, 'whitespace-pre-line')}>{entry.description}</p>
        )}
      </>
    ),
  },
};

export function PreviewPanel() {
  const { state } = useResumeStore();
  const theme = templateStyleRegistry.get(state.template);

  return (
    <div className="flex h-full w-full justify-center overflow-y-auto bg-slate-100 p-4 lg:p-8 print:block print:h-auto print:bg-white print:p-0">
      <article
        className={clsx(
          'min-h-[297mm] w-[210mm] border border-gray-200 bg-white shadow-2xl print:my-0 print:block print:h-auto print:w-full print:border-none print:shadow-none',
          theme.wrapperClass,
        )}
      >
        {state.sections.map((section) => {
          const layout = theme.layouts?.[section.layoutStyle] || {};
          const strategy = LAYOUT_STRATEGIES[section.layoutStyle] || LAYOUT_STRATEGIES.default;

          return (
            <section
              key={section.id}
              className={clsx('print:break-inside-avoid', theme.sectionSpacingClass)}
            >
              <h2 className={clsx(theme.sectionTitleClass, strategy.isSrOnly && 'sr-only')}>
                {section.title}
              </h2>

              <div className={clsx(layout.containerClass)}>
                {section.entries.map((entry) => (
                  <div
                    key={entry.id}
                    className={clsx('print:break-inside-avoid', layout.entryClass)}
                  >
                    <strategy.Render entry={entry} layout={layout} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </article>
    </div>
  );
}
