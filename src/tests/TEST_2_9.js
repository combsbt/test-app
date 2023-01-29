import { React, useState, useEffect } from 'react';
import './styles_2.css';

export default function TEST_2_9() {

  const ROWS = 7
  const columnList = ["A","B","C"]
  const gridColumns = "150px "
  const [cells, setCells] = useState([])

  let cellList = []
  for(let i=0; i < ROWS; i++){
    for(let j=0; j < columnList.length; j++){
      cellList.push(columnList[j]+(i+1))
    }
  }
  console.log(cellList)
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
          <input id={jsxArray2.length-1} type="text" defaultValue="" value={cells.id} onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
      )
    }
  }
  console.log(jsxArray2)

  function handleChange(values){
    console.log(values)
    console.log(cells)
    let newCells = cells
    newCells[values[0]]=values[1]
    setCells(newCells)
    
    console.log(newCells)
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
