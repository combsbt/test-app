import { React, useState, useEffect } from 'react';

export default function TEST_2_3() {
  const [ratio, setRatio] = useState(null);
  const [file, setFile] = useState(null);

  function handleLoad(){
    let width = document.getElementById("image").naturalWidth;
    let height = document.getElementById("image").naturalHeight;
    let gcdImg = gcd(width,height);
    if(ratio !== width/gcdImg+"x"+height/gcdImg ){
    setRatio(width/gcdImg+"x"+height/gcdImg)}
  }

  function gcd(a, b) {
    if (b) {
        return gcd(b, a % b);
    } else {
        return Math.abs(a);
    }
  }

  return (
    <div>
      <h2>Image size ratio</h2>
      <input type="file" data-test="file-input" onChange={(e)=>{
        setFile(URL.createObjectURL(e.target.files[0]))
      }}/>
      <div className="result" data-test="result">
        {ratio}
      </div>
      <img style={{display:"none"}} id="image" src={file && file} onLoad={ handleLoad }/>
    </div>
  );
}
