import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Cell from './components/Cell'
import { resetGrid, randomize, calculateNextState, ROW_SIZE, COL_SIZE } from './utils/helpers';

const App = () => {
  const [simulate, setSimulate] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);
  const [allCellData, setAllCellData] = useState(resetGrid())
  const [savedGames, setSavedGames] = useState();
  const [savedGameToLoad, setSavedGameToLoad] = useState();

  const renderGrid = useCallback(() => {
    console.log("Rendering Grid")
    return [...Array(ROW_SIZE).keys()].map((rowIndex) => <tr key={rowIndex}>
      {
        [...Array(COL_SIZE).keys()].map((colIndex) => <Cell key={colIndex} position={[rowIndex, colIndex]} allCellData={allCellData} setAllCellData={setAllCellData} isSimulating={simulate} />)
      }
    </tr>)
  }, [allCellData, simulate])

  useEffect(() => {
    if(localStorage.getItem("savedGames") === null) {
      localStorage.setItem("savedGames", JSON.stringify([]))
      setSavedGames([])
    } else {
      setSavedGames(JSON.parse(localStorage.getItem("savedGames")))
    }
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      if (simulate) {
        calculateNextState(allCellData, setAllCellData)
        setTriggerCount(seconds => seconds + 1);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [allCellData, simulate]);

  const saveSavedGame= () => {
    const key = `savedGame${localStorage.getItem("savedGames").length + 1}`
    localStorage.setItem("savedGames", JSON.stringify([...JSON.parse(localStorage.getItem("savedGames")), key]))
    localStorage.setItem(key, JSON.stringify(allCellData));
  }

  const loadSavedGame = (v) => {
    setAllCellData(JSON.parse(localStorage.getItem(v)));
  }


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
      <button onClick={() => saveSavedGame()}>Save as preset</button>
      <button onClick={() => loadSavedGame()}>Load preset</button>
      {
        savedGames && <select name="savedGames" onChange={(e) => loadSavedGame(e.target.value)}>
          <option selected disabled hidden value=''></option>
          {
            savedGames.map((savedGame) => <option value={savedGame}>{savedGame}</option>)
          }
        </select>
      }

      <div>
        Have been triggered {triggerCount} times
      </div>
    </div>
  );
}

export default App;
