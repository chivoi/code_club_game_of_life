import { useState, useEffect } from 'react';
import { getNeighbours } from '../utils/helpers';

const Cell = ({ position, grid, setGrid, isSimulating }) => {
  const [alive, setAlive] = useState(0);

  const die = () => {
    setAlive(0);
    grid[position[0]][position[1]] = 0
    setGrid(grid)
  }

  const live = () => {
    setAlive(1)
    grid[position[0]][position[1]] = 1
    setGrid(grid)
  }

  useEffect(() => {
    setAlive(grid[position[0]][position[1]])
  }, [grid, position])

  useEffect(() => {
    return () => {
      if (isSimulating && position[0] !== 0 && position[0] !== grid.length - 1) {
        const numLiveNeighbours = getNeighbours(position, grid).filter((cell) => cell === 1).length
        if (alive) {
          if (!(numLiveNeighbours === 2 || numLiveNeighbours === 3)) {
            die()
          }
        } else {
          if (numLiveNeighbours === 3) {
            live()
          }
        }
      }
    };
  });

  // RULES
  //Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

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
