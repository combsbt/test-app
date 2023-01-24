import { React, useState } from 'react';
import { Category, categories } from './categories';
import './styles.css';

export default function TEST_2_4() {

  const [toggles, setToggles] = useState([null,0,0,0,0,0,0,0,0,0,0,0])
  let children = [null, [3,4], [5,6,7], [8,9,10], [11,12,13], null, null, null, null, null, null, [14,15,16], null, null, null, null, null]
  let parents = [null, null, null, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 11, 11, 11]
  let testarr = arrayRtn();

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

  console.log(categories)

  function arrayRtn(){
    return [
    <div key="blah">
      <ul className="root" data-test="root">
      {categories.map((cat)=>{return(
        <li key={"category-"+cat.id.toString()} data-test={"category-"+cat.id.toString()}>
          <button id={cat.id.toString()} data-test="toggle-btn" className="toggle" onClick={()=>{toggleBtn(cat.id)}}>
            {toggles[cat.id]?"+":"-"}
          </button>
          {cat.name}
          {cat.children &&
            <ul>
            {cat.children.map((child)=>{return(
              <li hidden={toggles[parents[child.id]]} data-test={"category-"+child.id} key={"category-"+child.id}>
              {child.children &&
              <button id={child.id} data-test="toggle-btn" className="toggle" onClick={()=>{toggleBtn(child.id)}}>
                {toggles[child.id]?"+":"-"}
              </button>
              }
              {child.name}
              {child.children && 
                child.children.map((child2)=>{return(
                  <li hidden={toggles[parents[child2.id]]} data-test={"category-"+child2.id} key={"category-"+child2.id}>
                  {child2.children &&
                  <button id={child2.id} data-test="toggle-btn" className="toggle" onClick={()=>{toggleBtn(child2.id)}}>
                    {toggles[child2.id]?"+":"-"}
                  </button>
                  }
                  {child2.name}
                  {child2.children && 
                    child2.children.map((child3)=>{return(
                    <ul>
                      <li hidden={toggles[parents[child3.id]]} data-test={"category-"+child3.id}>{child3.name}</li>
                    </ul>
                  )}
                  )}
                  </li>
              )}
              )}
              </li>
            )}
            )}
            </ul>
          }
        </li>
        )
        }
      )}
      </ul>
    </div>
    ]
  }


  return (
    <div>
      {console.log(testarr)}
      {testarr}
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