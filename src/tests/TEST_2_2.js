import { React, useState } from 'react';

export default function TEST_2_2() {
  const [count, setCount] = useState(0);
  
  const [iFrames, setiFrames] = useState([]);


  return (
    <div>
      <h2>Unstable iframes</h2>
      <button
        data-test="add-btn"
        onClick={() => {
          setCount(count + 1);
          setiFrames([<iframe key={count} title={count} src="https://unstable-iframe.netlify.app" />,...iFrames])
          console.log(iFrames)
        }}
      >
        add
      </button>

      <div data-test="iframes">
        {iFrames && iFrames}
      </div>
    </div>
  );
}
