import { React, useState, useEffect } from 'react';
import './styles_2.css';

export default function TEST_2_9() {

  const ROWS = 7
  const columnList = ["A","B","C"]
  const gridColumns = "150px "
  const [cells, setCells] = useState({})
  const [cellValues, setCellValues] = useState({})

  let cellList = []
  for(let i=0; i < ROWS; i++){
    for(let j=0; j < columnList.length; j++){
      cellList.push(columnList[j]+(i+1))
      if(cells[columnList[j]+(i+1)]===undefined){
        setCells({...cells,[columnList[j]+(i+1)]:""})
      }
      if(cellValues[columnList[j]+(i+1)]===undefined){
        setCellValues({...cells,[columnList[j]+(i+1)]:""})
      }
    }
  }

  // useEffect(()=>{
  //   console.log("effect")
  //   for(let i=0; i<cellList.length; i++){
  //     console.log(cellList[i])
  //     handleCalc(cellList[i])
  //     console.log(cellList[i])
  //   }
  // },[cells])

  console.log("render")

  let jsxArray = []
  for(let i=0; i < columnList.length; i++){
    jsxArray.push(<div key={columnList[i]} className="cell header">{columnList[i]}</div>)
  }  
  let jsxArray2 = []
  for(let i=0; i < ROWS; i++){
    jsxArray2.push(<div key={"header"+(i+1)} className="cell header">{i+1}</div>)
    for(let j=0; j < columnList.length; j++){
      jsxArray2.push(   
        <div key={"key"+columnList[j]+(i+1)} className="cell" data-test={columnList[j]+(i+1)} 
        onClick={()=>{
          document.getElementById(columnList[j]+(i+1)).hidden=false;
          document.getElementById(columnList[j]+(i+1)).focus();
        }}  >
          <input hidden={true} id={columnList[j]+(i+1)} type="text" value={cells[columnList[j]+(i+1)]} 
          onKeyDown={(e)=>e.key==="Enter"&&handleCalc(columnList[j]+(i+1))}
          onBlur={()=>handleCalc(columnList[j]+(i+1))} 
          onChange={(e)=>{handleChange([e.target.id,e.target.value])}}/>
          {cellValues[columnList[j]+(i+1)]}
        </div>
      )
    }
  }

  function handleChange(values){
    console.log(values)
    let cell = values[0]
    setCells({...cells,[cell]:values[1]})
    setCellValues({...cellValues,[cell]:values[1]})
  }

  function recursiveCellReplace(cellList, newCell){
    console.log(cellList)
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
    console.log(newCell)
    return(newCell)  
    }
    
  }

  function handleCalc(cello){
    document.getElementById(cello).hidden=true;
    
    let cellList = []
    for(let i=0; i < ROWS; i++){
      for(let j=0; j < columnList.length; j++){
        cellList.push(columnList[j]+(i+1))
      }
    }
    console.log(cello)
    cellList.map(cell=>{
      if(cells[cell]!==""&&cells[cell]!==undefined && cells[cell].substring(0,1)==="="){
        let newCell = cells[cell].substring(1);
        
        
        let newestCell = recursiveCellReplace(cellList, newCell)
        console.log(newestCell)

        cellList.forEach(cell=>{  
          if(newestCell.includes(cell)){
            newestCell = newestCell.replace(cell,cells[cell])
          }  
        })
        console.log(newestCell)
        console.log(eval(newestCell).toString())
        newestCell = eval(newestCell).toString()
         console.log(newestCell)
        try{
          (newestCell.includes("//")||eval(newestCell).toString()==="Infinity"||eval(newestCell).toString()==="NaN")?setCellValues({...cellValues,[cell]:"#ERR"}):setCellValues({...cellValues,[cell]:eval(newestCell).toString()})
        } catch(error){
          console.log(error)
          setCellValues({...cellValues,[cell]:"#ERR"})
        }
      }

    })

    
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
