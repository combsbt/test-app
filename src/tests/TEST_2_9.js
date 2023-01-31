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
    let cellList = []
    for(let i=0; i < ROWS; i++){
      for(let j=0; j < columnList.length; j++){
        cellList.push(columnList[j]+(i+1))
      }
    }

    //find cells that are equations
    let eqList = []
    cellList.map(cell=>{
      if(cellsCopy[cell]!==""&&cellsCopy[cell]!==undefined && cellsCopy[cell].substring(0,1)==="="){
        eqList.push(cell)
      }
    })
    console.log('eqList')
    console.log(eqList)

    //find paths for each eq cell
    let initPaths = {}
    eqList.forEach(eq=>{
      console.log(cellsCopy[eq])
      let paths = [];
      paths = pathFinder(cellsCopy, cellList, eq, paths)
      console.log(paths)
      initPaths = {...initPaths,[eq]:paths}
    })
    console.log(initPaths)
    pathFinder2("B3", initPaths)

  },[cells])

  function pathFinder2(cell, initPaths){
    console.log(initPaths[cell])
    let newPath = 'err'
    if(initPaths && initPaths[cell]){
      newPath = initPaths[cell];
      for(let i=0; i < initPaths[cell].length; i++){
        if(initPaths[initPaths[cell][i]]){
          console.log(initPaths[cell][i])
          console.log(newPath.indexOf(initPaths[cell][i]))
          newPath[newPath.indexOf(initPaths[cell][i])] = initPaths[initPaths[cell][i]]
        }
        else{
          console.log(cell)
          newPath[i]=cells[initPaths[cell][i]]
        }
      }  
    }
    else{
      newPath=cells[cell]
    }
    console.log(newPath)
    // if(newPath){
    //   for(let i=0; i < newPath.length; i++){
    //     console.log(newPath[i])

    //     newPath[i] && newPath[i].forEach(cell=>pathFinder2[cell])
    //   }  
    // }
    

  }

  function pathFinder(cellsCopy, cellList, start, paths){
    cellList.forEach(cell=>{    
        if(cellsCopy[start].includes(cell)){
          paths.push(cell)
          console.log(cell)
          //pathFinder(cellsCopy, cellList, cell, paths)
        }
      })  
    return paths
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
