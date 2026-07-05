import { Navbar } from '@/shared/components/Navbar';
import { WorkspaceView } from '@/widgets/resume-workspace/ui/WorkspaceView';

function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <Navbar />
      <WorkspaceView />
    </div>
  );
}

export default App;
