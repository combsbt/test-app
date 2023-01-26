import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TEST_2_1 from './tests/TEST_2_1';
import TEST_2_2 from './tests/TEST_2_2';
import TEST_2_3 from './tests/TEST_2_3';
import TEST_2_4 from './tests/TEST_2_4';
import TEST_2_5 from './tests/TEST_2_5';
import TEST_2_6 from './tests/TEST_2_6';
import TEST_2_7 from './tests/TEST_2_7';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
            <Route path='/Test_2_1' element={<TEST_2_1/>} />
            <Route path='/Test_2_2' element={<TEST_2_2/>} />
            <Route path='/Test_2_3' element={<TEST_2_3/>} />
            <Route path='/Test_2_4' element={<TEST_2_4/>} />
            <Route path='/Test_2_5' element={<TEST_2_5/>} />
            <Route path='/Test_2_6' element={<TEST_2_6/>} />
            <Route path='/Test_2_7' element={<TEST_2_7/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;