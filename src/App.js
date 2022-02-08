import { useState, useEffect } from 'react';
import './App.css';
import Cell from './Cell'

const App = () => {
  const grid = new Array(10).fill(0).map(row => new Array(10).fill(0))
  const renderGrid = (grid) => {
    return grid.map((row, rowIndex) =>
      <tr key={rowIndex}>{row.map((cell, cellIndex) => <Cell key={cellIndex} position={[rowIndex, cellIndex]} grid={grid} />)}</tr>
    )
  }

  const [simulate, setSimulate] = useState(false)
  const [triggerCount, setTriggerCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (simulate) {
        setTriggerCount(seconds => seconds + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [simulate]);

  // console.log(renderGrid(grid))
  return (
    <div className="App">
      <table style={{ border: '1px solid black' }}>
        <tbody>
          {renderGrid(grid)}
        </tbody>
      </table>
      <button onClick={() => setSimulate(!simulate)}>Simulate!</button>
      <div>
        Have been triggered {triggerCount} times
      </div>
    </div>
  );
}

export default App;
