import logo from './logo.svg';
import './App.css';
import Cell from './Cell'

const App = () => {
  const grid = new Array(10).fill(0).map(row => new Array(10).fill(0))
  const renderGrid = (grid) => {
    return grid.map( (row) =>
      <tr>{ row.map((cell) => <Cell />) }</tr>
    )
  }
  console.log(renderGrid(grid))
  return (
    <div className="App">
      <table style={{ border: '1px solid black' }}>
        <tbody>
          {renderGrid(grid)}
        </tbody>
      </table>
      <button>Simulate!</button>
    </div>
  );
}

export default App;
