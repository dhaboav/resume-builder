import type { TemplateStyle } from '@/templates/types';
export const ATS_TEMPLATE: TemplateStyle = {
  id: 'ats-default',
  name: 'ATS Default',
  author: 'Core Team',
  wrapperClass: 'font-sans text-slate-950 p-16 space-y-5',
  sectionTitleClass:
    'text-xs font-bold uppercase tracking-wider border-b border-slate-900 pb-0.5 text-slate-900',
  sectionSpacingClass: 'space-y-2',
  layouts: {
    contact: {
      containerClass: 'grid grid-cols-2 gap-x-4 gap-y-1 text-xs',
      entryClass: 'contents',
      titleClass: 'font-semibold',
      subtitleClass: '',
      dateClass: '',
      descClass: '',
    },
    timeline: {
      containerClass: 'space-y-3',
      entryClass: 'text-xs',
      titleClass: 'font-bold text-slate-900',
      subtitleClass: 'text-slate-600 italic',
      dateClass: 'text-slate-500 text-right',
      descClass: 'mt-1 text-slate-700 leading-relaxed whitespace-pre-line',
    },
    grid: {
      containerClass: 'grid grid-cols-2 gap-3',
      entryClass: 'p-2 border border-slate-200 rounded text-xs bg-slate-50',
      titleClass: 'font-semibold',
      subtitleClass: 'text-slate-500',
      dateClass: 'text-slate-400',
      descClass: 'mt-1 text-slate-600',
    },
    plain: {
      containerClass: 'space-y-2',
      entryClass: 'text-xs',
      titleClass: 'font-semibold hidden',
      subtitleClass: 'hidden',
      dateClass: 'hidden',
      descClass: 'leading-relaxed text-slate-700 whitespace-pre-line',
    },
  },
};
