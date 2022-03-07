import { useState, useEffect } from 'react';

const Cell = ({ position, allCellData, setAllCellData, isSimulating }) => {
  const [alive, setAlive] = useState(0);

  const die = () => {
    setAlive(0);
    allCellData[position].isAlive = 0
    setAllCellData(allCellData)
  }

  const live = () => {
    setAlive(1)
    allCellData[position].isAlive = 1
    setAllCellData(allCellData)
  }

  useEffect(() => {
    setAlive(allCellData[position].isAlive)
  }, [allCellData, position])

  return <td
    onClick={() => {
      if (!isSimulating) {
        if (alive) {
          die()
        } else {
          live()
        }
      }
    }}
    style={{ border: '1px solid black', width: '25px', height: '25px', backgroundColor: alive ? 'black' : 'white' }}
  />
}

export default Cell;
