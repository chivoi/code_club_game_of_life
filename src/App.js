import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Cell from './components/Cell'
import { resetGrid, randomize, calculateNextState, ROW_SIZE, COL_SIZE } from './utils/helpers';

const App = () => {
  const [simulate, setSimulate] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);
  const [allCellData, setAllCellData] = useState(resetGrid())

  const renderGrid = useCallback(() => {
    console.log("Rendering Grid")
    return [...Array(ROW_SIZE).keys()].map((rowIndex) => <tr key={rowIndex}>
      {
        [...Array(COL_SIZE).keys()].map((colIndex) => <Cell key={colIndex} position={[rowIndex, colIndex]} allCellData={allCellData} setAllCellData={setAllCellData} isSimulating={simulate} />)
      }
    </tr>)
  }, [allCellData, simulate])


  useEffect(() => {
    const interval = setInterval(() => {
      if (simulate) {
        calculateNextState(allCellData, setAllCellData)
        setTriggerCount(seconds => seconds + 1);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [allCellData, simulate]);


  return (
    <div className="App">
      <table style={{ border: '1px solid black' }}>
        <tbody>
          {renderGrid()}
        </tbody>
      </table>
      <button onClick={() => setSimulate(!simulate)}>{simulate ? "Stop" : "Simulate!"}</button>
      <button onClick={() => setAllCellData(randomize(allCellData))}>Randomize!</button>
      <button onClick={() => setAllCellData(resetGrid())}>Clear!</button>
      <div>
        Have been triggered {triggerCount} times
      </div>
    </div>
  );
}

export default App;
