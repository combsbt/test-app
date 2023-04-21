 # Practice Problems
 This repo has practice problems for react developers that used to be hosted on practice.dev (which seems to no longer exist).
 <br/>
 Below is an example of a problem with my solution.
 
 ## Problem
 <div>
  Your task is to implement a minimal calculation sheet that supports basic
  math operations and allows you to create formulas that reference other
  cells.
  <br />
  <h4>Requirements:</h4>
  <ul>
    <li>Display a fixed grid: 3 columns (A, B, C) and 7 rows (1-7).</li>
    <li>
      Clicking on the cell should show an input in that cell. The input
      should be focused automatically.
    </li>
    <li>
      It should be possible to enter any text in the input or enter a
      formula.
    </li>
    <li>
      Pressing the 'Enter' key or blurring the input (e.g., focusing on
      other cells or clicking anywhere on the page), should display the
      entered value or calculate the formula.
    </li>
    <li>
      A formula starts with a <code>=</code> character.
    </li>
    <li>
      A formula should support basic operations <code>+, -, *, /</code>, and
      parenthesis <code>(, )</code>.
      <br />
      Example formulas:
      <ul>
        <li>
          <code>=1</code>
        </li>
        <li>
          <code>=1+2</code>
        </li>
        <li>
          <code>=-1+2</code>
        </li>
        <li>
          <code>=2*3/3+1</code>
        </li>
        <li>
          <code>=((1+1) * 2)</code>
        </li>
      </ul>
    </li>
    <li>There can be spaces in the formula.</li>
    <li>
      It should be possible to reference other cells in the formula by
      entering cell coordinates.
      <br />
      Example formulas:
      <ul>
        <li>
          <code>=A1+A2</code>
        </li>
        <li>
          <code>=B1*2</code>
        </li>
        <li>
          <code>=(1+3)*B1 + C2</code>
        </li>
      </ul>
    </li>
    <li>
      Display <code>#ERR</code> if the formula can't be evaluated.
      <br />A formula can't be evaluated if:
      <ul>
        <li>
          There is a division by 0: <code>=10/0</code>.
        </li>
        <li>
          The referenced cell is empty or contains an invalid value:{' '}
          <code>=A1+3</code>, where <code>A1</code> is not a number.
        </li>
        <li>
          There is an infinite cycle between cells: <code>A1</code>{' '}
          references <code>B1</code>, <code>B1</code>
          references <code>C1</code>, <code>C1</code> references{' '}
          <code>A1</code>.
        </li>
      </ul>
    </li>
    <li>No need to support fractions.</li>
  </ul>
  <br />
  You are free to add classes, styles, ids, but don't edit or remove{' '}
  <code>data-test</code> attributes.
</div>
<br/>

## My Solution
```jsx
import { React, useState, useEffect, useMemo } from 'react';
import './styles_2.css';

export default function TEST_2_9() {

  const ROWS = 7
  const COLUMNS = useMemo(() =>["A","B","C"],[])
  const gridColumns = "150px "
  
  const [cells, setCells] = useState({})
  const [cellValues, setCellValues] = useState({})

  //set cells and cellValues as objects with keys corresponding to cell locations ("A1", "B2", ...)
  //inital values are all ""
  useEffect(()=>{
    let initialCells = {}
    for(let i=0; i < ROWS; i++){
      for(let j=0; j < COLUMNS.length; j++){
        initialCells[COLUMNS[j]+(i+1)] = "";
      }
    }
    setCells({...initialCells})
    setCellValues({...initialCells})
  },[ROWS, COLUMNS])

  //when cells object changes, update values
  useEffect(()=>{
    let replacedCells = {...cells}
    // take a copy of cells and replace all references with expressions
    replacedCells = replaceCellIDs(replacedCells)
    // evaluate the expressions
    let evaluatedCells = evaluateCells(replacedCells)
    setCellValues({...evaluatedCells})
  },[cells])

  //update cells object when keyDown="Enter" or a focused cell is blurred
  //set cell value to content of input cell with matching id
  function handleCellUpdate(id, value){
    document.getElementById(id).hidden=true;
    let newCells = {...cells}
    newCells[id] = value
    setCells({...newCells})
  }
  
  //create the JSX based on the numbers of ROWS and COLUMNS
  //each cell has an input with id corresponding to location ("A1","B2", ...)
  //each cell displays the corresponding value in cellValues
  let jsxArray = []
  for(let i=0; i < COLUMNS.length; i++){
    jsxArray.push(<div key={COLUMNS[i]} className="cell2 header">{COLUMNS[i]}</div>)
  }  
  let jsxArray2 = []
  for(let i=0; i < ROWS; i++){
    jsxArray2.push(<div key={"header"+(i+1)} className="cell2 header">{i+1}</div>)
    for(let j=0; j < COLUMNS.length; j++){
      let display = cellValues[COLUMNS[j]+(i+1)]
      jsxArray2.push(   
        <div key={"key"+COLUMNS[j]+(i+1)} className="cell2" data-test={COLUMNS[j]+(i+1)} 
        onClick={()=>{
          document.getElementById(COLUMNS[j]+(i+1)).hidden=false;
          document.getElementById(COLUMNS[j]+(i+1)).focus();
        }}  >
          <input hidden={true} id={COLUMNS[j]+(i+1)} type="text"  
          onKeyDown={(e)=>e.key==="Enter"&&handleCellUpdate(e.target.id,e.target.value)}
          onBlur={(e)=>handleCellUpdate(e.target.id,e.target.value)}/>
          {display}
        </div>
      )
    }
  }
  
  return (
    <div style={{textAlign:"left", padding:"20px"}}>
      <h2>Calculation Sheet</h2>
      <div className="grid2" style={{gridTemplateColumns: "30px "+gridColumns.repeat(COLUMNS.length)}}>
        <div className="cell2"></div>
        {jsxArray}
        {jsxArray2}
      </div>
    </div>
  );
}

function replaceCellIDs(replacedCells){

  Object.keys(replacedCells).forEach(replaceID=>{
    Object.keys(replacedCells).forEach(cellID=>{    
      if(replacedCells[replaceID] && replacedCells[replaceID].includes(cellID)){
        //prevent infinite loop if cell is self-referential
        if(cellID===replaceID){
          replacedCells = {...replacedCells, [replaceID]:"#ERR"}
        }
        //replace references to other cells with referenced cell's content
        else if(replacedCells[cellID].substring(0,1)==="="){
          replacedCells = {...replacedCells, [replaceID]:replacedCells[replaceID].replace(cellID,
           replacedCells[cellID].substring(1)===""?"#ERR":"("+replacedCells[cellID].substring(1)+")")}  
        }
        else{
          replacedCells = {...replacedCells, [replaceID]:replacedCells[replaceID].replace(cellID,
           replacedCells[cellID]===""?"#ERR":"("+replacedCells[cellID]+")")}
        }
        
      }
    }) 
  })

  // if cells still have references, run the function again
  if(doesContainRefs(replacedCells)){
    replacedCells = replaceCellIDs(replacedCells)
  }
  
  return(replacedCells)
}

function doesContainRefs(replacedCells){
    let list = []
    Object.keys(replacedCells).forEach(cellID=>{
      Object.keys(replacedCells).forEach(replaceID=>{
          if(replacedCells[cellID] !== undefined && replacedCells[cellID].includes(replaceID)){
            list.push(true)
          }
        })
    })
    list.push(false)
    return list.includes(true)
  }

function evaluateCells(replacedCells){
    if(Object.keys(replacedCells).length){
      Object.keys(replacedCells).forEach(cellID=>{
        if(replacedCells[cellID].includes("#ERR") || replacedCells[cellID].includes("//")){
          replacedCells = {...replacedCells, [cellID]:"#ERR"}
        }

        if(replacedCells[cellID].substring(0,1)==="="){
          let result = "#ERR"
          try{
            result = isNaN(eval(replacedCells[cellID].substring(1)))?"#ERR":eval(replacedCells[cellID].substring(1))
          }
          catch{
            result = "#ERR"
          }
          replacedCells = {...replacedCells, [cellID]:result}
        }
        else if(replacedCells[cellID].substring(0,1)!=="=" && replacedCells[cellID]!==""){
          let result = "#ERR"
          try{
            result = isNaN(parseInt(replacedCells[cellID]))?replacedCells[cellID]:parseInt(replacedCells[cellID])
          }
          catch{
            result = "#ERR"
          }
          replacedCells = {...replacedCells, [cellID]:result}
        }

        if(replacedCells[cellID].toString().includes("Infinity")){
          replacedCells = {...replacedCells, [cellID]:"#ERR"} 
        }

      })  
    }
    return replacedCells
  }
```
```css
.grid2 {
  display: inline-grid;
  grid-template-columns: 30px 150px 150px 150px;
  grid-gap: 1px;
  background: #999;
  border: 1px solid #999;
  color: #333;
}

.cell2 {
  background: white;
  text-align: left;
  padding: 2px 5px;
}

.header {
  text-align: center;
  font-weight: bold;
}

.cell2 input {
  border: none;
  width: 100%;
}

```
<br/>
The test cases can be found at https://github.com/practice-dev/practice-dev/blob/master/content/modules/02-react-practice/009-calculation-sheet/test-case.ts

Test results for my solution can be seen here: https://github.com/combsbt/test-app/blob/master/output.txt
