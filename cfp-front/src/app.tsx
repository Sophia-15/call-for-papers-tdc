import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';

export function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            style: {
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: '700',
            },
            duration: 3000,
            closeButton: true,
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
