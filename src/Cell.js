import { useState } from 'react';

const Cell = () => {
  const [filled, setFilled] = useState(0)

  return <td
    onClick={() => setFilled(1)}
    style={{ border: '1px solid black', width: '50px', height: '50px', backgroundColor: filled ? 'black' : 'white' }}
  />
}

export default Cell;
