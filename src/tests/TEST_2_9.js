import { React, useState, useEffect } from 'react';
import './styles_2.css';

export default function TEST_2_9() {

  const ROWS = 7
  const columnList = ["A","B","C"]
  const gridColumns = "150px "
  
  const [cells, setCells] = useState({})
  const [cellValues, setCellValues] = useState({})

  console.log('test')

  useEffect(()=>{
    let cellList = {}
    for(let i=0; i < ROWS; i++){
      for(let j=0; j < columnList.length; j++){
        cellList[columnList[j]+(i+1)] = "";
      }
    }
    console.log(cellList)
    setCells({...cellList})
    setCellValues({...cellList})
  },[])

  useEffect(()=>{
    let cellsCopy = {...cells}
    let cellVals = {...cells}
    let cellList = []
    for(let i=0; i < ROWS; i++){
      for(let j=0; j < columnList.length; j++){
        cellList.push(columnList[j]+(i+1))
      }
    }
    cellList.map(cell=>{
      console.log(cell)
      if(cellsCopy[cell]!==""&&cellsCopy[cell]!==undefined && cellsCopy[cell].substring(0,1)==="="){
        //newValues[cell]="eq"
        let newCell = cells[cell].substring(1);
        console.log(newCell)
        
        let newestCell = recursiveCellReplace(cellList, newCell)
        console.log(newestCell)

        cellList.forEach(celler=>{  
          if(newestCell.includes(celler)){
            if(cells[celler]===""){
              console.log(true)
              newestCell = newestCell.replace(celler,"err")
            }
            else{newestCell = newestCell.replace(celler,cells[celler])}
          }  
        })
        
        console.log(newestCell)

        try{
          cellVals[cell]=(newestCell.includes("//")||eval(newestCell).toString()==="Infinity"||eval(newestCell).toString()==="NaN")?"#ERR":eval(newestCell).toString()
        } catch(error){
          console.log(error)
          cellVals[cell]="#ERR"
        }
      }
    })

    setCellValues({...cellVals})
  },[cells])

  function recursiveCellReplace(cellList, newCell){
    // console.log(cellList)
    let newerCell = newCell;
    cellList.map(cell=>{  
      if(newCell.includes(cell) && cells[cell]!==""&&cells[cell]!==undefined && cells[cell].substring(0,1)==="="){
        newCell = newCell.replace(cell,cells[cell].replace("=",""))
      }
    })
    if(newerCell!==newCell){
      return(recursiveCellReplace(cellList, newCell))
    }
    else{
    // console.log(newCell)
    return(newCell)  
    }
    
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
