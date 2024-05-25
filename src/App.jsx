import GameBoard from "../components/GameBoard";
import GameOver from "../components/GameOver";
import Player from "../components/Player";
import { useState } from "react";
import Log from "../components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";

const PLAYER = {
  X: 'player 1',
  O: 'player 2'
}

function deriveActiveplayer(gameTurn) {
  let currentplayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].Player === "X") {
    currentplayer = "O";
  }
  return currentplayer;
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveGameBoard(gameTurn){
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurn) {
    console.log(turn);
    const { square, Player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = Player;
    console.log(square, Player);
  }
  return gameBoard
}
function derivewinner(gameBoard, player) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol == secondSquareSymbol &&
      firstSquareSymbol == thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }
  return winner
}

function App() {
  const [player, setPlayer] = useState(PLAYER);
  const [gameTurn, setGameTurns] = useState([]);
  const activeplayer = deriveActiveplayer(gameTurn);
  const gameBoard = deriveGameBoard(gameTurn)
  const winner = derivewinner(gameBoard, player)
  const hasDraw = gameTurn.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevturns) => {
      const currentplayer = deriveActiveplayer(prevturns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, Player: currentplayer },
        ...prevturns,
      ];
      return updatedTurns;
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYER.X}
            symbol="X"
            isActive={activeplayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYER.O}
            symbol="O"
            isActive={activeplayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}
export default App;
