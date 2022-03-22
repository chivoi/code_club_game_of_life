import { useState, useEffect, useCallback } from 'react';
import './App.css';
// components
import Cell from './components/Cell'
// helpers
import { resetGrid, randomize, calculateNextState, ROW_SIZE, COL_SIZE } from './utils/helpers';
// material UI
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// styled
import { StyledBoard } from './components/styled/StyledBoard';
import { MainContainer } from './components/styled/MainContainer';
import { StyledHeader } from './components/styled/StyledHeader';
import { StyledParagraph } from './components/styled/StyledParagraph';
import { StyledFooter } from './components/styled/StyledFooter';
import { StyledLink } from './components/styled/StyledLink';
import { NativeSelect } from '@mui/material';



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
    if (localStorage.getItem("savedGames") === null) {
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

  const saveSavedGame = () => {
    const key = `savedGame${localStorage.getItem("savedGames").length + 1}`
    localStorage.setItem("savedGames", JSON.stringify([...JSON.parse(localStorage.getItem("savedGames")), key]))
    localStorage.setItem(key, JSON.stringify(allCellData));
  }

  const loadSavedGame = (v) => {
    setAllCellData(JSON.parse(localStorage.getItem(v)));
  }


  return (
    <div style={{ height: '100vh' }} className="App">
      <MainContainer>
        {/* <StyledHeader>Conway's Гаме Of Лife</StyledHeader> */}
        <StyledHeader>Conway's Game Of Life</StyledHeader>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 2,
            },
          }}
        >
          <ButtonGroup variant="text" aria-label="text button group">
            <Button color="secondary" style={{ textDecoration: 'overline', fontWeight: 'bold' }} onClick={() => setSimulate(!simulate)}>{simulate ? "Stop" : "Simulate"}</Button>
            <Button color="secondary" onClick={() => setAllCellData(randomize(allCellData))}>Randomize</Button>
            <Button color="secondary" onClick={() => {
              setAllCellData(resetGrid());
              setTriggerCount(0);
            }}>Reset</Button>
            <Button color="secondary" onClick={() => saveSavedGame()}>Save game</Button>
            {/* <Button color="secondary" onClick={() => loadSavedGame()}>Load game</Button> */}
            {
              savedGames && <select style={{ backgroundColor: 'transparent', border: 'medium none' }} name="savedGames" onChange={(e) => loadSavedGame(e.target.value)}>
                <option selected disabled hidden value='' style={{ display: 'none' }}>Load Game</option>
                {
                  savedGames.map((savedGame) => <option value={savedGame}>{savedGame}</option>)
                }
              </select>
            }
          </ButtonGroup>
        </Box>
        <StyledParagraph>
          Went through <span style={{ color: '#9036AA' }}>{triggerCount}</span> iterations
        </StyledParagraph>
        <StyledBoard>
          <tbody>
            {renderGrid()}
          </tbody>
        </StyledBoard>
        <StyledFooter>
          <span style={{ margin: '0 5px 0 0' }}>Made by William Tio and Ana Lastoviria for Zendesk Code Club</span><StyledLink href='https://github.com/william-tio/code_club_game_of_life' target={"_blank"}><GitHubIcon fontSize='small' /></StyledLink></StyledFooter>
      </MainContainer>
    </div >
  );
}

export default App;
