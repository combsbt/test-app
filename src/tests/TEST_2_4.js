import { React, useState } from 'react';
import { Category, categories } from './categories';
import './styles.css';

export default function TEST_2_4() {

  const [toggles, setToggles] = useState([null,0,0,0,0,0,0,0,0,0,0,0])
  let children = [null, [3,4], null, [8,9,10], null, null, null, null, null, null, null]
  let parents = [null, null, null, 1, 1, null, null, null, 3, 3, 3]

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
    
    let catList = [];
    recCollapse(catNum, catList)
    if(catList !== []){
        for(let i = 0; i < catList.length; i++){
          newToggles[catList[i]] = newToggles[catNum]?1:0;
        }
      }
    setToggles(newToggles)
    console.log(newToggles)
  }

  function recCollapse(catNum, catList){
    if(children[catNum] !== null){
      for(let i = 0; i < children[catNum].length; i++){
        catList.push(children[catNum][i]) 
        recCollapse(children[catNum][i], catList)  
      }
    }
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
            <li hidden={toggles[parents[3]]} data-test="category-3">
              <button id="3" data-test="toggle-btn" className="toggle" onClick={()=>{toggleBtn(3)}}>
                {toggles[3]?"+":"-"}
              </button>
              Accessories
              <ul>
                <li hidden={toggles[parents[8]]} data-test="category-8">Audio Accessories</li>
                <li hidden={toggles[parents[9]]} data-test="category-9">Camera Accessories</li>
                <li hidden={toggles[parents[10]]} data-test="category-10">Cell Phone Accessories</li>
              </ul>
            </li>
            <li hidden={toggles[parents[4]]} data-test="category-4">
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