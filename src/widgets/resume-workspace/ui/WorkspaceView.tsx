import { useResumeState } from '@/features/resume-form-engine/hooks/useResumeState';
import { exportStateToJson, importStateFromJson } from '@/shared/lib/json';
import { Navbar } from '@/shared/components/Navbar'; 
import { useViewPanel } from '../hooks/useViewPanel';
import { FormPanel } from './FormPanel';
import { MobileToggle } from './MobileToggle';
import { PreviewPanel } from './PreviewPanel';

export function WorkspaceView() {
  const { state, setFullState, ...actions } = useResumeState(); // Pastikan ada setFullState/loadState dari hookmu
  const { activeTab, toggleMobileView } = useViewPanel();

  // Handler untuk sinkronisasi aksi file JSON ke dalam State Feature
  const handleExport = () => {
    exportStateToJson(state);
  };

  const handleImport = async (file: File) => {
    try {
      const parsedData = await importStateFromJson(file);
      if (setFullState) {
        setFullState(parsedData);
      } else {
        console.warn('Fungsi setFullState belum diexpose oleh useResumeState');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Gagal mengimpor file JSON.');
    }
  };

  // Panel display logic based on the active tab
  const formDisplay = activeTab === 'edit' ? 'block' : 'hidden lg:block';
  const previewDisplay = activeTab === 'preview' ? 'block' : 'hidden lg:block';

  return (
    // Menggunakan Flex Column agar Navbar menempati tinggi statis, dan konten mengambil sisa ruangnya
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      
      {/* 2. Taruh Navbar di paling atas dan pasangkan callback IO-nya */}
      <Navbar onExportJSON={handleExport} onImportJSON={handleImport} />

      {/* 3. Area Workspace Editor & Preview (Diubah dari h-screen ke flex-1) */}
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
  );
}