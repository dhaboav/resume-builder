import { FormPanel, MobileWorkspaceTabs, PreviewPanel } from './components';
import { useWorkspaceTabs } from './hooks';

export function WorkspaceView() {
  const { activeTab, changeTab } = useWorkspaceTabs();
  const getDisplayClass = (targetTab: typeof activeTab) => {
    return activeTab === targetTab ? 'block' : 'hidden lg:block';
  };

  return (
    <>
      <div className="hidden print:block print:h-auto print:w-full print:bg-white">
        <PreviewPanel />
      </div>

      <div className="flex h-screen w-full flex-col overflow-hidden print:hidden">
        <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[40%_1fr]">
          <aside
            className={`h-full overflow-y-auto lg:border-r lg:border-gray-200 ${getDisplayClass('edit')}`}
          >
            <FormPanel />
          </aside>

          <main className={`h-full overflow-hidden bg-slate-100 ${getDisplayClass('preview')}`}>
            <PreviewPanel />
          </main>
        </div>
        <MobileWorkspaceTabs activeTab={activeTab} onTabChange={changeTab} />
      </div>
    </>
  );
}
