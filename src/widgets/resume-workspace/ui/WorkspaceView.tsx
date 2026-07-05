import { useResumeState } from '@/features/resume-form-engine/hooks/useResumeState';
import { useViewPanel } from '../hooks/useViewPanel';
import { FormPanel } from './FormPanel';
import { MobileToggle } from './MobileToggle';
import { PreviewPanel } from './PreviewPanel';

export function WorkspaceView() {
  const { state, ...actions } = useResumeState();
  const { activeTab, toggleMobileView } = useViewPanel();

  // Panel display logic based on the active tab
  const formDisplay = activeTab === 'edit' ? 'block' : 'hidden lg:block';
  const previewDisplay = activeTab === 'preview' ? 'block' : 'hidden lg:block';

  return (
    <div className="relative grid h-screen w-screen grid-cols-1 overflow-hidden lg:grid-cols-[40%_1fr]">
      <aside className={`h-full overflow-y-auto lg:border-r lg:border-gray-200 ${formDisplay}`}>
        <FormPanel state={state} actions={actions} />
      </aside>

      <main className={`h-full overflow-hidden bg-slate-100 ${previewDisplay}`}>
        <PreviewPanel state={state} />
      </main>

      <MobileToggle activeTab={activeTab} onTabChange={toggleMobileView} />
    </div>
  );
}
