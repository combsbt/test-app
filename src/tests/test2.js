import { React, useState, useEffect } from 'react';
import './styles_2.css';

export default function TEST_2_9() {

  const ROWS = 7
  const columnList = ["A","B","C"]
  const gridColumns = "150px "
  
  const [cells, setCells] = useState({})
  const [cellValues, setCellValues] = useState({})

  console.log('render')

  //set initial cell values
  useEffect(()=>{
    let cellList = {}
    for(let i=0; i < ROWS; i++){
      for(let j=0; j < columnList.length; j++){
        cellList[columnList[j]+(i+1)] = "";
      }
    }
    setCells({...cellList})
    setCellValues({...cellList})
  },[])

  //when cells change, update values
  useEffect(()=>{
    let cellsCopy = {...cells}
// this is repeated, declare const at top
    let cellList = []
    for(let i=0; i < ROWS; i++){
      for(let j=0; j < columnList.length; j++){
        cellList.push(columnList[j]+(i+1))
      }
    }

    //find cells that contain equations and add their IDs to eqList
    let eqList = []
    cellList.forEach(cellID=>{
      if(cellsCopy[cellID]!==""&&cellsCopy[cellID]!==undefined && cellsCopy[cellID].substring(0,1)==="="){
        eqList.push(cellID)
      }
    })

    console.log('eqList')
    console.log(eqList)

    //make an object "refCells" with cellIDs as the keys
    //and an array of cells they reference as values
    let refCells = {}
    eqList.forEach(cellID=>{
      let refs = [];
      refs = refsFinder(cellsCopy, cellList, cellID, refs)
      refCells = {...refCells,[cellID]:refs}
    })
    console.log('refCells')
    console.log(refCells)

    //
    evaluateCell("B3", refCells)

  },[cells])

  function evaluateCell(cell, refCells){

    let references = undefined
    if(refCells[cell]){
      references = [...refCells[cell]]
    }
    console.log('references')
    console.log(references)
    let newRefs = '#ERR'

    if(refCells && references){
      newRefs = [...references];
      console.log(references.length)
      // if there are no references to other cells, evaluate the cell
      if(!references.length){
        newRefs = eval(cells[cell].substring(1))
      }

      // iterate through referenced equations 
      for(let i=0; i < references.length; i++){
        // if the referenced cell is an equation
        if(refCells[references[i]] !== undefined){
          console.log(references[i])
          console.log(i)
          console.log("LENGTH " + refCells[references[i]].length)
          // if the referenced cell has its own references
          // replace the cell with the array of references
          if(refCells[references[i]].length){
            newRefs[i] = refCells[references[i]]  
          }
          // if there are no references in the referenced cell
          // replace the cell with the evaluated equation
          else{
            newRefs[newRefs.indexOf(references[i])] = eval(cells[references[i]].substring(1))
          }
        }
        // if the referenced cell is not an equation
        // replace the cell with the value
        else{
          console.log(references[i])
// more error handling needed
          if(cells[references[i]]!==""){
            newRefs[i]=cells[references[i]]  
          }
          else{
            newRefs[i]="#ERR"
          }
          
        }
      }  
    }
    else{
      console.log('CELL NOT AN EQUATION')
    }

    // newRefs is now evaluated one pass deep
    console.log(cell + " " + newRefs)
    console.log(newRefs)

    
  }

  function refsFinder(cellsCopy, cellList, cellID, refs){
    cellList.forEach(refID=>{    
        if(cellsCopy[cellID].includes(refID)){
          refs.push(refID)
        }
      })  
    return refs
  }

  function handleCalc(id, value){
    document.getElementById(id).hidden=true;
    let newCells = {...cells}
    newCells[id] = value
    setCells({...newCells})
  }
  
  let jsxArray = []
  for(let i=0; i < columnList.length; i++){
    jsxArray.push(<div key={columnList[i]} className="cell header">{columnList[i]}</div>)
  }  
  let jsxArray2 = []
  for(let i=0; i < ROWS; i++){
    jsxArray2.push(<div key={"header"+(i+1)} className="cell header">{i+1}</div>)
    for(let j=0; j < columnList.length; j++){
      let display = cellValues[columnList[j]+(i+1)]
      jsxArray2.push(   
        <div key={"key"+columnList[j]+(i+1)} className="cell" data-test={columnList[j]+(i+1)} 
        onClick={()=>{
          document.getElementById(columnList[j]+(i+1)).hidden=false;
          document.getElementById(columnList[j]+(i+1)).focus();
        }}  >
          <input hidden={true} id={columnList[j]+(i+1)} type="text"  
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
      <div className="grid" style={{gridTemplateColumns: "30px "+gridColumns.repeat(columnList.length)}}>
        <div className="cell"></div>
        {jsxArray}
        {jsxArray2}
      </div>
    </div>
  );
}
