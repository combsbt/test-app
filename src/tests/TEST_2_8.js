import { React, useState, useEffect } from 'react';
import './styles.css';

export default function TEST_2_8() {

  const [click, setClick] = useState(document.cookie?document.cookie.substring(6):"-")
  
  useEffect(()=>{
    //document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

    if(!document.cookie.includes("click") && click !== "-" && document.getElementById("alert")){
      document.getElementById("alert").hidden=true
      document.cookie = click==="Yes"?"click=Yes":"click=No"
    } 
    if(document.cookie.includes("click")){
      document.getElementById("alert").hidden=true
    }
  },[click])

  return (
    <div style={{textAlign:"left", padding:"20px"}}>
      <h2>Cookie alert</h2>
      Cookie consent: <span data-test="consent">{click}</span>
      <div data-test="alert" className="alert" id="alert" hidden={false}>
        <h3>Do you accept cookies?</h3>
        <div>
          <button className="success-btn" data-test="accept-btn" onClick={()=>{setClick("Yes")}}>
            Accept
          </button>
          <button className="danger-btn" data-test="reject-btn" onClick={()=>{setClick("No")}}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}