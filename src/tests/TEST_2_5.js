import { React, useState } from 'react';
import { bloodTests, bloodPacks } from './data';
import './styles.css';

export default function TEST_2_5() {

  console.log(bloodTests)
  console.log(bloodPacks)

  const [checkList, setCheckList] = useState(Array(bloodTests.length+1).fill(0))
  const [total, setTotal] = useState(0)
  const [mins, setMins] = useState([0, 0])

  function handleCheck(id){
    let newCheckList = checkList
    newCheckList[id] = checkList[id]?0:1
    let total = 0;
    for(let i = 0; i < newCheckList.length; i++){
      if(newCheckList[i]){
        total = total + bloodTests[i-1].price
      }
    }
    packSuggestion(newCheckList, setMins)
    setTotal(total)
    setCheckList(newCheckList)  
  }

  function packSuggestion(checkList, setMins){
    let testes = []
    for(let i = 0; i < checkList.length; i++){
      if(checkList[i]){
        testes.push(i)
      }
    }
    console.log(testes+'testes')

    let packList = Array(bloodPacks.length+1).fill([])
    for(let i = 0; i < bloodPacks.length; i++){
      let newTestes = []
      bloodPacks[i].tests.forEach(itm=>{
        if(testes.includes(itm)){
          newTestes.push(itm)
        }
      })
      packList[i+1] = newTestes
    }

    let newPackList=Array(packList.length).fill([])
    for(let i = 0; i < packList.length; i++){
      let newList=[]
      testes.forEach(itm=>{
        if(!packList[i].includes(itm)){
          newList.push(bloodTests[itm-1].price)
        }
      })
      if(i){
        newList.push(bloodPacks[i-1].price)
      }
      newPackList[i] = newList
    }

    let newTotals = Array(newPackList.length).fill(0)
    for(let i = 0; i < newPackList.length; i++){
      let tot = 0
      newPackList[i].forEach(itm=>{
        tot = tot + itm
      })
      newTotals[i]=tot
    }

    let minimum = Math.min(...newTotals)
    let minIndex = newTotals.indexOf(minimum)
    console.log('minin '+minIndex)

    

    console.log(packList)
    console.log(newPackList)
    console.log(newTotals)

    
    setMins([minimum,minIndex])

    // inBoth = bloodPacks.map((pack)=>{return(
    //     pack.map((tests=>{return(
    //       tests.map(test=>{return(
    //         test in tests
    //           )
    //         })
    //       )
    //   }))
    //   )  
    // })

    
  }

  return (
    <div style={{textAlign:"left"}}>
      <h2>Blood test packs</h2>
      <ul>
        {bloodTests.map((item)=>
        <div key={item.name}>
          <label data-test={"test-"+item.id}>
            <input type="checkbox" id={item.id} onChange={()=>handleCheck(item.id)}/>
            {item.name+" $"+item.price}
          </label>
        </div>
        )}
      </ul>
      <div>
        Total: <span data-test="total">${total}</span>
      </div>
      <div>
        Suggested pack: <span data-test="pack">{mins[1]?bloodPacks[mins[1]-1].name:"none"}</span>
      </div>
      <div>
        Save: <span data-test="save">${total - mins[0]}</span>
      </div>
    </div>
  );
}
