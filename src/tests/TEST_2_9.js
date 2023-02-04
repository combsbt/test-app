import { React, useState, useEffect } from 'react';
import './styles_2.css';

export default function TEST_2_9() {

  const ROWS = 7
  const columnList = ["A","B","C"]
  const gridColumns = "150px "
  
  const [cells, setCells] = useState({})
  const [cellValues, setCellValues] = useState({})

  //set initial cell values
  useEffect(()=>{
    let initialCells = {}
    for(let i=0; i < ROWS; i++){
      for(let j=0; j < columnList.length; j++){
        initialCells[columnList[j]+(i+1)] = "";
      }
    }
    setCells({...initialCells})
    setCellValues({...initialCells})
  },[])

  //when cells change, update values
  useEffect(()=>{
    let cellsCopy = {...cells}
    let reduceList = {...cellsCopy}

    reduceList = replaceCellIDs(cellsCopy, reduceList)
    evaluateCells(reduceList)

  },[cells])

  function evaluateCells(reduceList){
    if(Object.keys(reduceList).length){
      Object.keys(reduceList).forEach(cellID=>{
        if(reduceList[cellID].includes("#ERR") || reduceList[cellID].includes("//")){
          reduceList = {...reduceList, [cellID]:"#ERR"}
        }

        if(reduceList[cellID].substring(0,1)==="="){
          let result = "#ERR"
          try{
            result = isNaN(eval(reduceList[cellID].substring(1)))?"#ERR":eval(reduceList[cellID].substring(1))
          }
          catch{
            result = "#ERR"
          }
          reduceList = {...reduceList, [cellID]:result}
        }
        else if(reduceList[cellID].substring(0,1)!=="=" && reduceList[cellID]!==""){
          let result = "#ERR"
          try{
            result = isNaN(parseInt(reduceList[cellID]))?reduceList[cellID]:parseInt(reduceList[cellID])
          }
          catch{
            result = "#ERR"
          }
          reduceList = {...reduceList, [cellID]:result}
        }

        if(reduceList[cellID].toString().includes("Infinity")){
          reduceList = {...reduceList, [cellID]:"#ERR"} 
        }

      })  
    }
    setCellValues({...reduceList})
  }

  function replaceCellIDs(cellsCopy, reduceList){

    Object.keys(cellsCopy).forEach(reduceID=>{
      Object.keys(cellsCopy).forEach(cellID=>{    
        if(reduceList[reduceID] && reduceList[reduceID].includes(cellID)){
          if(cellID==reduceID){
            reduceList = {...reduceList, [reduceID]:"#ERR"}
          }
          else if(reduceList[cellID].substring(0,1)==="="){
            reduceList = {...reduceList, [reduceID]:reduceList[reduceID].replace(cellID,
             reduceList[cellID].substring(1)===""?"#ERR":"("+reduceList[cellID].substring(1)+")")}  
          }
          else{
            reduceList = {...reduceList, [reduceID]:reduceList[reduceID].replace(cellID,
             reduceList[cellID]===""?"#ERR":"("+reduceList[cellID]+")")}
          }
          
        }
      }) 
    })

    let more = isMore(cellsCopy, reduceList)
    if(more){
      reduceList = replaceCellIDs(cellsCopy, reduceList)
    }
    
    return(reduceList)
  }

  function isMore(cellsCopy, reduceList){
      let list = []
      Object.keys(cellsCopy).forEach(cellID=>{
      Object.keys(cellsCopy).forEach(reduceID=>{
          if(reduceList[cellID] !== undefined && reduceList[cellID].includes(reduceID)){
            list.push(true)
          }
        })
      })
      list.push(false)
      return list.includes(true)
    }


  function handleCalc(id, value){
    document.getElementById(id).hidden=true;
    let newCells = {...cells}
    newCells[id] = value
    setCells({...newCells})
    setCellValues({...newCells})
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
