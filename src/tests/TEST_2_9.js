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
  },[COLUMNS])

  //when cells change, update values
  useEffect(()=>{
    let cellsCopy = {...cells}
    let replacedCells = {...cells}
    // take a copy of cells and replace all references with expressions
    replacedCells = replaceCellIDs(cellsCopy, replacedCells)
    // evaluate the expressions
    let evaluatedCells = evaluateCells(replacedCells)
    setCellValues({...evaluatedCells})
  },[cells])

  //calculate cells when keyDown="Enter" or a focused cell is blurred
  function handleCalc(id, value){
    document.getElementById(id).hidden=true;
    let newCells = {...cells}
    newCells[id] = value
    setCells({...newCells})
  }
  
  //create the JSX based on the numbers of ROWS and COLUMNS
  //each div has an input with id corresponding to location ("A1","B2",...)
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
          onKeyDown={(e)=>e.key==="Enter"&&handleCalc(e.target.id,e.target.value)}
          onBlur={(e)=>handleCalc(e.target.id,e.target.value)}/>
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

function replaceCellIDs(cellsCopy, replacedCells){

  Object.keys(cellsCopy).forEach(reduceID=>{
    Object.keys(cellsCopy).forEach(cellID=>{    
      if(replacedCells[reduceID] && replacedCells[reduceID].includes(cellID)){
        if(cellID===reduceID){
          replacedCells = {...replacedCells, [reduceID]:"#ERR"}
        }
        else if(replacedCells[cellID].substring(0,1)==="="){
          replacedCells = {...replacedCells, [reduceID]:replacedCells[reduceID].replace(cellID,
           replacedCells[cellID].substring(1)===""?"#ERR":"("+replacedCells[cellID].substring(1)+")")}  
        }
        else{
          replacedCells = {...replacedCells, [reduceID]:replacedCells[reduceID].replace(cellID,
           replacedCells[cellID]===""?"#ERR":"("+replacedCells[cellID]+")")}
        }
        
      }
    }) 
  })

  let more = isMore(cellsCopy, replacedCells)
  if(more){
    replacedCells = replaceCellIDs(cellsCopy, replacedCells)
  }
  
  return(replacedCells)
}

function isMore(cellsCopy, replacedCells){
    let list = []
    Object.keys(cellsCopy).forEach(cellID=>{
    Object.keys(cellsCopy).forEach(reduceID=>{
        if(replacedCells[cellID] !== undefined && replacedCells[cellID].includes(reduceID)){
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