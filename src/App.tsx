import React from 'react';
import Router from './routes';
import { ToastContainer } from 'react-toastify';
import ThemeConfig from './Theme';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
      <ThemeConfig>
        <Router />
      </ThemeConfig>
    </>

  );
}

export default App;
