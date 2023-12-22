

export default function GameBoard({ onSelectSquare, board }) {
  
  // const [gameBoard, setgameBoard]=useState(initialGameBoard);
  // function handleselectCell(rowIndex,colIndex){
  //     setgameBoard((prevGameBoard)=>{
  //         const updatedBoard=[...prevGameBoard.map(innerArray=>[...innerArray])];
  //         updatedBoard[rowIndex][colIndex]=activePlayerSymbol;
  //         return updatedBoard;
  //     })
  //     onSelectSquare();
  // }
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}
                disabled={playerSymbol!==null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
