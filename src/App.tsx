import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { AuthProvider } from './context/auth.context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
