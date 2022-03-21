import { useState, useEffect } from 'react';
import { StyledCell } from './styled/StyledCell';

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

  return <StyledCell
    onClick={() => {
      if (!isSimulating) {
        if (alive) {
          die()
        } else {
          live()
        }
      }
    }}
    style={{ backgroundColor: alive ? 'black' : 'white' }}
  />
}

export default Cell;
