import { React, useState } from 'react';
import { Category, categories } from './categories';
import './styles.css';

export default function TEST_2_4() {

  const [toggles, setToggles] = useState([null,0,null,0,1])

  function toggleBtn(catNum){
    let newToggles = [];
    for (let i = 0; i < toggles.length; i++){
      if(i===catNum){
        newToggles[i] = toggles[i]?0:1;
      }
      else{
        newToggles[i] = toggles[i]
      }
    }
    setToggles(newToggles)
  }

  return (
    <div>
      <h2>Category tree</h2>
      <ul className="root" data-test="root">
        <li data-test="category-1">
          <button id="1" data-test="toggle-btn" className="toggle" onClick={()=>{toggleBtn(1)}}>
            {toggles[1]?"+":"-"}
          </button>
          Electronics
          <ul>
            <li data-test="category-3">
              <button id="3" data-test="toggle-btn" className="toggle" onClick={()=>{toggleBtn(3)}}>
                {toggles[3]?"+":"-"}
              </button>
              Accessories
              <ul>
                <li data-test="category-8">Audio Accessories</li>
                <li data-test="category-9">Camera Accessories</li>
                <li data-test="category-10">Cell Phone Accessories</li>
              </ul>
            </li>
            <li data-test="category-4">
              <button id="4" data-test="toggle-btn" className="toggle" onClick={()=>{toggleBtn(4)}}>
                {toggles[4]?"+":"-"}
              </button>
              Computers
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}