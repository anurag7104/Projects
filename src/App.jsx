import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Homescreen, Authentication } from './Pages';
 import {QueryClient,QueryClientProvider} from "react-query"
 import{ReactQueryDevtools} from"react-query/devtools";

 import 'react-toastify/dist/ReactToastify.css';
 import { ToastContainer } from 'react-toastify';
const App = () => {
  const queryClient=new QueryClient();
  return (
   <QueryClientProvider client={queryClient}>
     <Router>
      <Suspense fallback={<div>Loading.....</div>}>
        <Routes>
          <Route path="/*" element={<Homescreen />} />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </Suspense>
    </Router>
    <ToastContainer position='top-right '/>
    <ReactQueryDevtools initialIsOpen={false}/>
   </QueryClientProvider>
  );
};

export default App;
