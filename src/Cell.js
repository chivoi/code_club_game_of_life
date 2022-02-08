import { useState } from 'react';

const Cell = ({ position, grid }) => {
  const [filled, setFilled] = useState(0)

  const getNeighbours = ([row, col], grid) => {
    const top = [row - 1, col];
    const right = [row, col + 1];
    const bottom = [row + 1, col];
    const left = [row, col - 1];
    const topRight = [row - 1, col + 1];
    const bottomRight = [row + 1, col + 1];
    const bottomLeft = [row + 1, col - 1];
    const topLeft = [row - 1, col - 1];

    const neighbours = [top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft];

    return neighbours.map(neighbour => grid[neighbour[0]][neighbour[1]])
  }

  // RULES
  //Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  return <td
    onClick={() => {
      setFilled(1);
      console.log(getNeighbours(position, grid));
    }}
    style={{ border: '1px solid black', width: '50px', height: '50px', backgroundColor: filled ? 'black' : 'white' }}
  />
}

export default Cell;
