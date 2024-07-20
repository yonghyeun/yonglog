import { RouterProvider } from 'react-router-dom';
import router from './router/router';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
const client = new QueryClient();

export const QueryStore = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

const App = () => (
  <QueryStore>
    <RouterProvider router={router} />
  </QueryStore>
);
export default App;
