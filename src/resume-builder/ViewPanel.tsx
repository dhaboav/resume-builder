import { useViewPanel } from './hooks/useViewPanel';
import { FormPane } from './ui/FormPane';
import { MobileNav } from './ui/MobileNav';
import { PreviewPane } from './ui/PreviewPane';

export function ViewPanel() {
  const { text, activeTab, setActiveTab, handleTextChange } = useViewPanel();

  // Panel display logic based on the active tab
  const formDisplay = activeTab === 'edit' ? 'block' : 'hidden lg:block';
  const previewDisplay = activeTab === 'preview' ? 'flex' : 'hidden lg:flex';

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden lg:flex-row">
      {/* Left Panel */}
      <aside
        className={`h-full flex-1 overflow-y-auto lg:w-[45%] lg:flex-none lg:border-r lg:border-slate-800 ${formDisplay}`}
      >
        <FormPane text={text} onTextChange={handleTextChange} />
      </aside>

      {/* Right Panel (Preview) */}
      <main className={`h-full flex-1 flex-col overflow-hidden bg-slate-100 ${previewDisplay}`}>
        <PreviewPane text={text} />
      </main>

      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
