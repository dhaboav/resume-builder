import { WorkspaceView } from '@/resume/components/WorkspaceView';
import { Navbar } from '@/shared/components/Navbar';

function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <Navbar />
      <WorkspaceView />
    </div>
  );
}

export default App;
