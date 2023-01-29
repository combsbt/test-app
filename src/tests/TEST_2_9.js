import { React, useState, useEffect } from 'react';
import './styles_2.css';

export default function TEST_2_9() {

  const ROWS = 8
  const columnList = ["A","B","C","D"] 
  const [cells, setCells] = useState(Array(ROWS*columnList.length).fill(0))
  
  let cellList = []
  for(let x = 0; x < columnList.length; x=x+1){
    for(let i = 0; i < cells.length/columnList.length; i = i+1){
      cellList.push(columnList[x]+i)
    }
  }
  console.log(cellList)

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
      <div className="grid">
        <div className="cell"></div>
        <div className="cell header">A</div>
        <div className="cell header">B</div>
        <div className="cell header">C</div>
        <div className="cell header">1</div>
        <div className="cell" data-test="A1">
          <input id="0" type="text" defaultValue="" value={cells.id} onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="B1">
          <input id="1" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="C1">
          <input id="2" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell header">2</div>
        <div className="cell" data-test="A2">
          <input id="3" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="B2">
          <input id="4" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="C2">
          <input id="5" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell header">3</div>
        <div className="cell" data-test="A3">
          <input id="6" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="B3">
          <input id="7" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="C3">
          <input id="8" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell header">4</div>
        <div className="cell" data-test="A4">
          <input id="9" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="B4">
          <input id="10" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="C4">
          <input id="11" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell header">5</div>
        <div className="cell" data-test="A5">
          <input id="12" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="B5">
          <input id="13" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="C5">
          <input id="14" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell header">6</div>
        <div className="cell" data-test="A6">
          <input id="15" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="B6">
          <input id="16" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="C6">
          <input id="17" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell header">7</div>
        <div className="cell" data-test="A7">
          <input id="18" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="B7">
          <input id="19" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
        <div className="cell" data-test="C7">
          <input id="20" type="text" defaultValue="" onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
        </div>
      </div>
    </div>
  );
}
