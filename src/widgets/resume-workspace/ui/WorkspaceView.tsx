import { useResumeState } from '@/features/resume-form-engine/hooks/useResumeState';
import { Navbar } from '@/shared/components/Navbar';
import { exportStateToJson, importStateFromJson } from '@/shared/lib/json';
import { useViewPanel } from '../hooks/useViewPanel';
import { FormPanel } from './FormPanel';
import { MobileToggle } from './MobileToggle';
import { PreviewPanel } from './PreviewPanel';

export function WorkspaceView() {
  const { state, setFullState, ...actions } = useResumeState();
  const { activeTab, toggleMobileView } = useViewPanel();

  const handleExport = () => {
    exportStateToJson(state);
  };

  const handleImport = async (file: File) => {
    try {
      const parsedData = await importStateFromJson(file);
      if (setFullState) {
        setFullState(parsedData);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Gagal.');
    }
  };

  // ========================================================
  // Download PDF Handler
  // ========================================================
  const handleDownloadPDF = () => {
    const contactSection = state.sections.find((s) => s.id === 'contact');
    const userName = contactSection?.entries[0]?.title || 'Resume';
    const originalTitle = document.title;

    document.title = `${userName.replace(/\s+/g, '_')}_Resume`;
    window.print();
    document.title = originalTitle;
  };

  const formDisplay = activeTab === 'edit' ? 'block' : 'hidden lg:block';
  const previewDisplay = activeTab === 'preview' ? 'block' : 'hidden lg:block';

  return (
    <>
      <div className="hidden print:block print:h-auto print:w-full print:bg-white">
        <PreviewPanel state={state} />
      </div>

      <div className="flex h-screen w-screen flex-col overflow-hidden print:hidden">
        <Navbar
          onExportJSON={handleExport}
          onImportJSON={handleImport}
          onDownloadPDF={handleDownloadPDF}
        />

        <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[40%_1fr]">
          <aside className={`h-full overflow-y-auto lg:border-r lg:border-gray-200 ${formDisplay}`}>
            <FormPanel state={state} actions={actions} />
          </aside>

          <main className={`h-full overflow-hidden bg-slate-100 ${previewDisplay}`}>
            <PreviewPanel state={state} />
          </main>

          <MobileToggle activeTab={activeTab} onTabChange={toggleMobileView} />
        </div>
      </div>
    </>
  );
}
