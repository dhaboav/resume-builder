import type { TemplateStyle } from '@/templates/types';
export const CREATIVE_TEMPLATE: TemplateStyle = {
  id: 'classic-serif',
  name: 'Classic Serif Elegant',
  author: 'CommunityDev',
  wrapperClass: 'font-serif text-amber-950 p-12 space-y-6 bg-[#fffdf9]',
  sectionTitleClass: 'text-sm font-bold uppercase border-b-2 border-amber-800 pb-1 text-amber-900',
  sectionSpacingClass: 'space-y-3',
  layouts: {
    contact: {
      containerClass: 'flex flex-wrap justify-center gap-4 text-xs font-medium',
      entryClass: 'flex gap-1',
      titleClass: 'font-bold text-amber-900',
      subtitleClass: '',
      dateClass: '',
      descClass: '',
    },
    timeline: {
      containerClass: 'space-y-4',
      entryClass: 'text-xs border-l-2 border-amber-100 pl-3',
      titleClass: 'text-sm font-bold text-slate-900',
      subtitleClass: 'text-amber-800 italic',
      dateClass: 'text-slate-500 italic',
      descClass: 'mt-1 text-slate-800 leading-relaxed',
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
