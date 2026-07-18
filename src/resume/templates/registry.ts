import type { ResumeTemplatePlugin } from './types';

export const RESUME_TEMPLATES: ResumeTemplatePlugin[] = [
  {
    id: 'ats-default',
    name: 'ATS Default',
    author: 'Core Team',
    wrapperClass: 'font-sans text-slate-950 p-16 space-y-5',
    sectionTitleClass:
      'text-xs font-bold uppercase tracking-wider border-b border-slate-900 pb-0.5 text-slate-900',
    sectionSpacingClass: 'space-y-2',
    layouts: {
      'contact-block': {
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
  },
  {
    id: 'classic-serif',
    name: 'Classic Serif Elegant',
    author: 'CommunityDev',
    wrapperClass: 'font-serif text-amber-950 p-12 space-y-6 bg-[#fffdf9]',
    sectionTitleClass:
      'text-sm font-bold uppercase border-b-2 border-amber-800 pb-1 text-amber-900',
    sectionSpacingClass: 'space-y-3',
    layouts: {
      'contact-block': {
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
  },
  {
    id: 'creative-two-columns',
    name: 'Modern Split Column',
    author: 'CommunityDev',

    // 1. UBAH WRAPPER MENJADI GRID 3 KOLOM
    wrapperClass: 'font-sans text-slate-900 p-12 grid grid-cols-3 gap-6 h-full items-start',

    // Gaya umum section
    sectionTitleClass: 'text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2',
    sectionSpacingClass: 'mb-6 print:break-inside-avoid',

    layouts: {
      'contact-block': {
        // 2. Kunci Kolom Kiri: Paksa section contact nangkring di kolom 1, spans seluruh baris kiri
        containerClass: 'col-span-1 border-r border-slate-200 pr-4 space-y-3 flex flex-col',
        entryClass: 'text-xs space-y-1',
        titleClass: 'text-lg font-bold text-slate-900 block', // Nama user jadi besar
        subtitleClass: 'text-slate-600 font-medium',
        dateClass: 'text-slate-500',
        descClass: 'text-slate-500',
      },
      timeline: {
        // 3. Kunci Kolom Kanan: Semua section selain contact otomatis dilempar ke kolom kanan (span 2)
        containerClass: 'col-span-2 space-y-4',
        entryClass: 'text-xs border-b border-slate-100 pb-3 last:border-none',
        titleClass: 'font-bold text-slate-900 text-sm',
        subtitleClass: 'text-indigo-900 font-medium italic',
        dateClass: 'text-slate-400 float-right', // Tanggal melayang di kanan entry
        descClass: 'mt-1 text-slate-600 leading-relaxed',
      },
      grid: {
        containerClass: 'col-span-2 grid grid-cols-2 gap-2', // Di dalam kolom kanan, bisa nge-grid lagi!
        entryClass: 'p-2 bg-slate-50 rounded',
        titleClass: 'font-semibold text-slate-800',
        subtitleClass: 'hidden',
        dateClass: 'hidden',
        descClass: 'text-slate-600 mt-0.5',
      },
      plain: {
        containerClass: 'col-span-2 space-y-2',
        entryClass: 'text-xs italic text-slate-700',
        titleClass: 'hidden',
        subtitleClass: 'hidden',
        dateClass: 'hidden',
        descClass: 'leading-relaxed',
      },
    },
  },
];
