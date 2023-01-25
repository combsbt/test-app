import { React, useState } from 'react';
import { bloodTests, bloodPacks } from './data';
import './styles.css';

export default function TEST_2_5() {

  console.log(bloodTests)
  console.log(bloodPacks)

  const [checkList, setCheckList] = useState(Array(bloodTests.length+1).fill(0))

  function handleCheck(id){
    console.log(id)

  }

  return (
    <div style={{textAlign:"left"}}>
      {bloodTests.map((item)=>
      <div key={item.name}>
        <input type="checkbox" id={item.id} onChange={()=>handleCheck(item.id)}/>
        <label htmlFor={item.id}>{item.name}</label>
      </div>
      )}
      
    </div>
  );
}