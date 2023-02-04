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
import TEST_2_8 from './tests/TEST_2_8';
import TEST_2_9 from './tests/TEST_2_9';

function App() {
  
  let jsxArray = []
  for(let i=1; i<10; i++){
    jsxArray.push(<div key={i}><a href={'/Test_2_'+i}>{"Test_2_"+i}</a></div>)
  }

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
            <Route path='/Test_2_8' element={<TEST_2_8/>} />
            <Route path='/Test_2_9' element={<TEST_2_9/>} />
          </Routes>
          <div key="links">
              {jsxArray}
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;