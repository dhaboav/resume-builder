import { Navbar } from '@/navbar/Navbar';
import { WorkspaceView } from '@/resume/WorkspaceView';

function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <Navbar />
      <WorkspaceView />
    </div>
  );
}

export default App;
