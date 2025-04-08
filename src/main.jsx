import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './Views/Redux/store.js'; 
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <Provider store={store}> 
    <QueryClientProvider client={queryClient}> 
      <App />
    </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
