import { React, useState } from 'react';
import './styles.css';

export default function TEST_2_6() {

  const [oneLetter, setOneLetter] = useState(false)
  const [oneNumber, setOneNumber  ] = useState(false)
  const [oneSpecial, setOneSpecial ] = useState(false)
  const [oneLength, setOneLength  ] = useState(false)
  const [strength, setStrength] = useState('WEAK')

  function testLetter(pass){
    for(let i = 0; i < pass.length; i++ ){
      if(pass[i].toLowerCase() !== pass[i].toUpperCase()){
        return(true)
      }
    }
    return(false)
  }

  function testNumber(pass){
    for(let i = 0; i < pass.length; i++ ){
      if(!isNaN(pass[i])){
        return(true)
      }
    }
    return(false)
  }

  function testSpecial(pass){
    for(let i = 0; i < pass.length; i++ ){
      if(!testLetter(pass[i])&&!testNumber(pass[i])){
        return(true)
      }
    }
    return(false)
  }

  function testLength(pass){
    if(pass && pass.length > 7){
      return(true)
    }
    return(false)
  }

  function testStrength(pass){
    let rules = 0;
    rules = testLetter(pass)?rules+1:rules
    rules = testNumber(pass)?rules+1:rules
    rules = testSpecial(pass)?rules+1:rules
    rules = testLength(pass)?rules+1:rules
    console.log(rules)
    if(rules>3){
      return("STRONG")
    }
    if(rules>1){
      return("MEDIUM")
    }
    return("WEAK")
  }

  return (
    <div style={{textAlign:"left", padding:"20px"}}>
      <h2>Password strength</h2>
      <ul>
        <li data-test="rule-1">
          At least 1 letter: <span data-test="result">{oneLetter?"YES":"NO"}</span>
        </li>
        <li data-test="rule-2">
          At least 1 number: <span data-test="result">{oneNumber?"YES":"NO"}</span>
        </li>
        <li data-test="rule-3">
          At least 1 special character: <span data-test="result">{oneSpecial?"YES":"NO"}</span>
        </li>
        <li data-test="rule-4">
          Min. 8 characters: <span data-test="result">{oneLength?"YES":"NO"}</span>
        </li>
      </ul>
      <div>
        Strength: <span data-test="strength">{strength}</span>
      </div>
      <input type="password" data-test="pass" onChange={(e)=>{
        setOneLetter(testLetter(e.target.value))
        setOneNumber(testNumber(e.target.value))
        setOneSpecial(testSpecial(e.target.value))
        setOneLength(testLength(e.target.value))
        setStrength(testStrength(e.target.value))
      }}/>
    </div>
  );
}
