import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Cell from './Cell'

const App = () => {
  const [grid, setGrid] = useState(new Array(40).fill(0).map(row => new Array(40).fill(0)))
  const [simulate, setSimulate] = useState(false)
  const [triggerCount, setTriggerCount] = useState(0);

  const renderGrid = useCallback(() => {
    console.log("Rendering Grid")
    return grid.map((row, rowIndex) =>
      <tr key={rowIndex}>{row.map((cell, cellIndex) => <Cell key={cellIndex} position={[rowIndex, cellIndex]} grid={grid} setGrid={setGrid} isSimulating={simulate} />)}</tr>
    )
  }, [simulate, grid])


  useEffect(() => {
    const interval = setInterval(() => {
      if (simulate) {
        setTriggerCount(seconds => seconds + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [simulate]);

  const randomize = (grid) => {
    const randomCase = Math.round(Math.random());
    let newGrid;

    if (randomCase === 0) {
      // This fills in the whole rows
      newGrid = new Array(40).fill(Math.round(Math.random())).map(row => new Array(40).fill(Math.round(Math.random())))
    } else {
      // This fills in random cell by cell
      newGrid = grid.map(row => row.map(item => item = Math.round(Math.random())));
    }

    setGrid(newGrid)
  }
  return (
    <div className="App">
      <table style={{ border: '1px solid black' }}>
        <tbody>
          {renderGrid()}
        </tbody>
      </table>
      <button onClick={() => setSimulate(!simulate)}>Simulate!</button>
      <button onClick={() => randomize(grid)}>Randomize!</button>
      <div>
        Have been triggered {triggerCount} times
      </div>
    </div>
  );
}

export default App;
