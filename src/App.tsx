import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { AuthProvider } from './context/auth.context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { socket } from './utils/socket';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('log: connected', socket.id);
    });

    return () => {
      socket.off('connect');
    };
  }, []);

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
