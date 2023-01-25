import { React, useState } from 'react';
import { Category, categories } from './categories';
import './styles.css';

export default function TEST_2_4() {

  // Create an array to store "+" or "-" state of all buttons
  // Array position corresponds to the category id
  const [toggles, setToggles] = useState([null,0,0,0,0,0,0,0,0,0,0,0])
  
// this can be pulled from the imported categories directly
  let children = [null, [3,4], [5,6,7], [8,9,10], [11,12,13], null, null, null, null, null, null, [14,15,16], null, null, null, null, null]
  let parents = [null, null, null, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 11, 11, 11]
  
  // create the JSX output in an array
  let jsxArray = arrayRtn();

  // Function called from button press that updates and sets the "toggles" array of all button states
  function toggleBtn(catNum){
    // Creates a "newToggles" array with the the input button state flipped
// remove this and add input button to catList
    let newToggles = [];
    for (let i = 0; i < toggles.length; i++){
      if(i===catNum){
        newToggles[i] = toggles[i]?0:1;
      }
      else{
        newToggles[i] = toggles[i]
      }
    }
    // Updates the "newToggles" array with all child buttons flipped
    let catList = [];
    // Populate catList with child ids
    recCollapse(catNum, catList)
    // Update "newToggles" with all child button states flipped
    if(catList !== []){
        for(let i = 0; i < catList.length; i++){
          newToggles[catList[i]] = newToggles[catNum]?1:0;
        }
      }
    setToggles(newToggles)
  }
  // Recursively updates "catList" array to include all child category ids
  function recCollapse(catNum, catList){
    if(children[catNum] !== null){
      for(let i = 0; i < children[catNum].length; i++){
        catList.push(children[catNum][i]) 
        recCollapse(children[catNum][i], catList)  
      }
    }
  }
  // Create the JSX array with data from "categories.js"
// this can be done recursively
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
      {jsxArray}
    </div>
  );
}