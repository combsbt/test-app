import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TEST_2_1 from './tests/TEST_2_1';
import TEST_2_2 from './tests/TEST_2_2';
import TEST_2_3 from './tests/TEST_2_3';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
            <Route path='/Test_2_1' element={<TEST_2_1/>} />
            <Route path='/Test_2_2' element={<TEST_2_2/>} />
            <Route path='/Test_2_3' element={<TEST_2_3/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;