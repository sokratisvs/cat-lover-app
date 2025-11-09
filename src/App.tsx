import { BrowserRouter } from 'react-router-dom';
import { ClientProvider } from './providers/QueryClientProvider';
import { AppRoutes } from './routes';

function App() {
  return (
    <ClientProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ClientProvider>
  );
}

export default App;
