import { React, useState, useEffect } from 'react';

export default function TEST_2_3() {
  const [ratio, setRatio] = useState(null);
  console.log('render')

  // function handleLoad(){
  //   let width = document.getElementById("image").naturalWidth;
  //   let height = document.getElementById("image").naturalHeight;
  //   let gcdImg = gcd(width,height);
  //   if(ratio !== width/gcdImg+"x"+height/gcdImg ){
  //   setRatio(width/gcdImg+"x"+height/gcdImg)}
  // }

  function gcd(a, b) {
    if (b) {
        return gcd(b, a % b);
    } else {
        return Math.abs(a);
    }
  }

  const myImage = new Image(200,300);
  myImage.onload = function() {
    let width = myImage.naturalWidth;
    let height = myImage.naturalHeight;
    let gcdImg = gcd(width,height);
    console.log(width)
    console.log(height)
    setRatio(width/gcdImg+"x"+height/gcdImg)
  }

  function findRatio(target) {
    myImage.src =  URL.createObjectURL(target);
  }

  return (
    <div>
      <h2>Image size ratio</h2>
      <input type="file" data-test="file-input" onChange={(e)=>{
        findRatio(e.target.files[0])
      }}/>
      <div className="result" data-test="result">
        {ratio}
      </div>
      
    </div>
  );
}

//<img style={{display:"none"}} id="image" src={file && file} onLoad={ handleLoad }/>