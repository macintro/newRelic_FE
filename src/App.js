import React from 'react';
import './App.css';
import AppRouter from './router/AppRouter';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='App'>
      <AppRouter />
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
}

export default App;
