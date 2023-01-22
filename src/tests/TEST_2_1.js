import React, { useState } from 'react';

function TEST_2_1() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h2>Count:
      <span data-test="count">{count}</span>
      </h2>
      <br/>
      <button data-test="increase-btn" onClick={()=>{setCount(count + 1)}}>increase</button>
    </div>
  );
}

export default TEST_2_1;