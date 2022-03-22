import { useState, useEffect } from 'react';

const SavedGameDropdown = ({ allCellData, setAllCellData, resetGrid }) => {
  const [savedGames, setSavedGames] = useState();

  useEffect(() => {
    if(localStorage.getItem("savedGames") === null) {
      localStorage.setItem("savedGames", JSON.stringify([]))
      setSavedGames([])
    } else {
      setSavedGames(JSON.parse(localStorage.getItem("savedGames")))
    }
  }, [])

  const saveSavedGame= () => {
    const savedGames = JSON.parse(localStorage.getItem("savedGames"))
    const key = `savedGame${savedGames.length + 1}`
    localStorage.setItem("savedGames", JSON.stringify([...savedGames, key]))
    localStorage.setItem(key, JSON.stringify(allCellData))
    setSavedGames(JSON.parse(localStorage.getItem("savedGames")))
  }


  const clearSavedGames = () => {
    localStorage.setItem("savedGames", JSON.stringify([]))
    setSavedGames([])
  }

  const loadSavedGame = (v) => {
    if(v === "") {
      setAllCellData(resetGrid())
    } else {
      setAllCellData(JSON.parse(localStorage.getItem(v)));
    }
  }

  return (
    <div>
      <button onClick={() => saveSavedGame()}>Save game</button>
      <button onClick={() => clearSavedGames()}>Delete all saved games</button>
      {
        (savedGames?.length > 0) && <select defaultValue='' name="savedGames" onChange={(e) => loadSavedGame(e.target.value)}>
        <option value=''></option>
        {
          savedGames.map((savedGame) => <option value={savedGame}>{savedGame}</option>)
        }
        </select>
      }
    </div>
  )
}

export default SavedGameDropdown;
