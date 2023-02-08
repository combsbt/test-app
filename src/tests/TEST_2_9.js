import { React, useState, useEffect, useMemo } from 'react';
import './styles_2.css';

export default function TEST_2_9() {

  const ROWS = 7
  const COLUMNS = useMemo(() =>["A","B","C"],[])
  const gridColumns = "150px "
  
  const [cells, setCells] = useState({})
  const [cellValues, setCellValues] = useState({})

  //set initial cell values
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

  //when cells change, update values
  useEffect(()=>{
    let replacedCells = {...cells}
    // take a copy of cells and replace all references with expressions
    replacedCells = replaceCellIDs(replacedCells)
    // evaluate the expressions
    let evaluatedCells = evaluateCells(replacedCells)
    setCellValues({...evaluatedCells})
  },[cells])

  //update cell when keyDown="Enter" or a focused cell is blurred
  function handleCellUpdate(id, value){
    document.getElementById(id).hidden=true;
    let newCells = {...cells}
    newCells[id] = value
    setCells({...newCells})
  }
  
  //create the JSX based on the numbers of ROWS and COLUMNS
  //each cell has an input with id corresponding to location ("A1","B2",...)
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