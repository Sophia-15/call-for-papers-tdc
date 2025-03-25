import { createBrowserRouter } from 'react-router';
import { ListPapers } from './pages/papers';
import { CreatePapers } from './pages/papers/create';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ListPapers />,
  },
  {
    path: '/enviar',
    element: <CreatePapers />,
  },
]);
