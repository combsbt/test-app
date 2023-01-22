import { React, useState, useEffect } from 'react';

export default function TEST_2_3() {
  const [ratio, setRatio] = useState(null);
  const [file, setFile] = useState(null);

  function handleLoad(){
    if(document.getElementById("image") && ratio !== [document.getElementById("image").offsetWidth,document.getElementById("image").offsetHeight] ){
    setRatio([document.getElementById("image").offsetWidth,document.getElementById("image").offsetHeight])}
  }

  return (
    <div>
      <h2>Image size ratio</h2>
      <input type="file" data-test="file-input" onChange={(e)=>{console.log(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]))}}/>
      <div className="result" data-test="result">
        {ratio && ratio[0]+"x"+ratio[1]}
        <img id="image" src={file && file} onLoad={ handleLoad }/>
      </div>
    </div>
  );
}
