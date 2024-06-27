import React from 'react';
import { Route, Routes } from 'react-router-dom';

//Pages
import 
{ CustomerSearchPage

} from '../pages/index';

function AppRouter() {
  return (
    <Routes>
      <Route path='/'                         element={<CustomerSearchPage />} />
      
    </Routes>
  );
}

export default AppRouter;
