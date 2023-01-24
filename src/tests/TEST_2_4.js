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
  }

  function recCollapse(catNum, catList){
    if(children[catNum] !== null){
      for(let i = 0; i < children[catNum].length; i++){
        catList.push(children[catNum][i]) 
        recCollapse(children[catNum][i], catList)  
      }
    }
  }

  function arrayRtn(){
    return [
    <div key="blah" style={{textAlign:"left"}}>
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
              <ul>{child.children && 
                child.children.map((child2)=>{return(
                  <li hidden={toggles[parents[child2.id]]} data-test={"category-"+child2.id} key={"category-"+child2.id}>
                  {child2.children &&
                  <button id={child2.id} data-test="toggle-btn" className="toggle" onClick={()=>{toggleBtn(child2.id)}}>
                    {toggles[child2.id]?"+":"-"}
                  </button>
                  }
                  {child2.name}
                  <ul>{child2.children && 
                    child2.children.map((child3)=>{return(
                      <li hidden={toggles[parents[child3.id]]} data-test={"category-"+child3.id} key={"category-"+child3.id}>{child3.name}</li>
                  )}
                  )}</ul>
                  </li>
              )}
              )}</ul>
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
      <h2>Category tree</h2>
      {testarr}
    </div>
  );
}