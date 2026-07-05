import React from 'react';

interface PreviewPaneProps {
  text: string;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({ text }) => {
  return (
    <div className="flex flex-1 items-start justify-center overflow-y-auto bg-background p-4">
      <div className="aspect-[1/1.414] h-full w-full max-w-2xl rounded-xl p-8 text-slate-900 shadow-2xl">
        <p className="text-lg font-semibold capitalize">{text}</p>
      </div>
    </div>
  );
};
