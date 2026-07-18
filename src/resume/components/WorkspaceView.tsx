import { useViewPanel } from '@/resume/hooks/useViewPanel';
import { FormPanel } from './FormPanel';
import { MobileToggle } from './MobileToggle';
import { PreviewPanel } from './PreviewPanel';

export function WorkspaceView() {
  const { activeTab, toggleMobileView } = useViewPanel();

  const formDisplay = activeTab === 'edit' ? 'block' : 'hidden lg:block';
  const previewDisplay = activeTab === 'preview' ? 'block' : 'hidden lg:block';

  return (
    <>
      <div className="hidden print:block print:h-auto print:w-full print:bg-white">
        <PreviewPanel />
      </div>

      <div className="flex h-screen w-screen flex-col overflow-hidden print:hidden">
        <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[40%_1fr]">
          <aside className={`h-full overflow-y-auto lg:border-r lg:border-gray-200 ${formDisplay}`}>
            <FormPanel />
z          </aside>

          <main className={`h-full overflow-hidden bg-slate-100 ${previewDisplay}`}>
            <PreviewPanel />
          </main>

          <MobileToggle activeTab={activeTab} onTabChange={toggleMobileView} />
        </div>
      </div>
    </>
  );
}
