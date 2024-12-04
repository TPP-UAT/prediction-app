import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FunctionComponent } from 'react';
import './App.css'
import HomeContainer from './containers/HomeContainer';
import TestContainer from './containers/TestContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App: FunctionComponent = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/test" element={<TestContainer />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
