import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}


function App() {
  let winner;
  const [gameTurns, SetgameTurns] = useState([]);
  const [playerName, setPlayerName]=useState({
    'X':'Player 1',
    'O':'Player 2',
  }); 
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = playerName[firstSymbol];
    }
  }
  const hasdrawn = (gameTurns.length === 9 && !winner);

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer)=>currActivePlayer==='X'?'O':'X');
    SetgameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
    
  }
  function handleRestart() {
    SetgameTurns([]);
  }
  function handlePlayerNameChange(symbol,newName)
  {
    setPlayerName(prevPlayer=>{
      return{
      ...prevPlayer,
      [symbol]:newName
      };
    });
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player-1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange}/>
          <Player name="Player-2" symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasdrawn) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
