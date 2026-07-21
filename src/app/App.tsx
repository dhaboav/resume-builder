import { NotFound } from '@/navbar/NotFound';
import { WorkspaceView } from '@/resume/WorkspaceView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WorkspaceView />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
