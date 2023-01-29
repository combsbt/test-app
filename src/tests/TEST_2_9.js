import { React, useState, useEffect } from 'react';
import './styles_2.css';

export default function TEST_2_9() {

  const ROWS = 7
  const columnList = ["A","B","C"]
  const gridColumns = "150px "
  const [cells, setCells] = useState({})

  let cellList = []
  for(let i=0; i < ROWS; i++){
    for(let j=0; j < columnList.length; j++){
      cellList.push(columnList[j]+(i+1))
    }
  }

  let jsxArray = []
  for(let i=0; i < columnList.length; i++){
    jsxArray.push(<div key={columnList[i]} className="cell header">{columnList[i]}</div>)
  }  
  let jsxArray2 = []
  for(let i=0; i < ROWS; i++){
    jsxArray2.push(<div key={"header"+(i+1)} className="cell header">{i+1}</div>)
    for(let j=0; j < columnList.length; j++){
      jsxArray2.push(   
        <div key={columnList[j]+(i+1)} className="cell" data-test={columnList[j]+(i+1)}>
          <input id={columnList[j]+(i+1)} type="text" defaultValue="" value={cells.id} 
          onKeyDown={(e)=>e.key==="Enter"&&handleCalc(columnList[j]+(i+1))}
          onBlur={()=>handleCalc(columnList[j]+(i+1))} 
          onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
      )
    }
  }

  function handleChange(values){
    console.log(values)
    let cell = values[0]
    setCells({...cells,[cell]:values[1]})
  }

  function handleCalc(cell){
    console.log(cell)
  }

  return (
    <div style={{textAlign:"left", padding:"20px"}}>
      <h2>Calculation Sheet</h2>
      <div className="grid" style={{gridTemplateColumns: "30px "+gridColumns.repeat(columnList.length)}}>
        <div className="cell"></div>
        {jsxArray}
        {jsxArray2}
      </div>
    </div>
  );
}
