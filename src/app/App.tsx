import { ViewPanel } from '@/resume-builder/ViewPanel';
import { Navbar } from '@/shared/components/Navbar';

function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <Navbar />
      <ViewPanel />
    </div>
  );
}

export default App;
