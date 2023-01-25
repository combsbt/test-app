import { React, useState } from 'react';
import { bloodTests, bloodPacks } from './data';
import './styles.css';

export default function TEST_2_5() {

  console.log(bloodTests)
  console.log(bloodPacks)

  const [checkList, setCheckList] = useState(Array(bloodTests.length+1).fill(0))
  const [total, setTotal] = useState(0)


  function handleCheck(id){
    let newCheckList = checkList
    newCheckList[id] = checkList[id]?0:1
    let total = 0;
    for(let i = 0; i < newCheckList.length; i++){
      if(newCheckList[i]){
        total = total + bloodTests[i-1].price
      }
    }
    packSuggestion(newCheckList)
    setTotal(total)
    setCheckList(newCheckList)  
  }

  function packSuggestion(checkList){
    let testes = []
    for(let i = 0; i < checkList.length; i++){
      if(checkList[i]){
        testes.push(i)
      }
    }
    
    let inBoth = []
    bloodPacks.map((pack)=>{return(pack.tests.forEach(itm=>{
        inBoth.push(itm in testes)
        })
      )})


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

    console.log(inBoth)
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
        Suggested pack: <span data-test="pack">Active minimum</span>
      </div>
      <div>
        Save: <span data-test="save">${40}</span>
      </div>
    </div>
  );
}
