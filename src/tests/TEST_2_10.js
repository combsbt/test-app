import { React, useRef, useEffect } from 'react';
import './styles_3.css';

export default function TEST_2_10() {

  let activeCell = 1;
  let grid = new Array(6).fill(undefined);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(6).fill(undefined);
  }
  for (let i=0; i < 6; i++) {
    for(let j=0; j < 6; j++)
      grid[i][j]= j + 6*(i) +1
  }
  console.log(grid)
  function useEventListener(eventName, handler, element = window){
      // Create a ref that stores handler
      const savedHandler = useRef();

      // Update ref.current value if handler changes.
      // This allows our effect below to always get latest handler ...
      // ... without us needing to pass it in effect deps array ...
      // ... and potentially cause effect to re-run every render.
      useEffect(() => {
        savedHandler.current = handler;
      }, [handler]);

      useEffect(
        () => {
          // Make sure element supports addEventListener
          // On 
          const isSupported = element && element.addEventListener;
          if (!isSupported) return;

          // Create event listener that calls handler function stored in ref
          const eventListener = event => savedHandler.current(event);

          // Add event listener
          element.addEventListener(eventName, eventListener);

          // Remove event listener on cleanup
          return () => {
            element.removeEventListener(eventName, eventListener);
          };
        },
        [eventName, element] // Re-run if eventName or element changes
      );
    };

    function handler({ key }) {
      console.log(key)
      if(key==="ArrowUp"){

      }
      else if(key==="ArrowRight"){
        
      }
      else if(key==="ArrowLeft"){
        
      }
      else if(key==="ArrowDown"){
        
      }
    }

    useEventListener('keydown', handler)

  let jsxArray=[]
  for(let i=1; i<37; i++){
    if(i === activeCell){
      jsxArray.push(
      <div key={i} className="cell active" data-test={"cell-"+i}>
        {i}
      </div>
      )
    }
    else{
      jsxArray.push(
      <div key={i} className="cell" data-test={"cell-"+i}>
        {i}
      </div>
      ) 
    }
    
  }

  return (
    <div>
      <h2>Grid navigation</h2>
      <div className="grid" >
        {jsxArray}
      </div>
    </div>
  );
}