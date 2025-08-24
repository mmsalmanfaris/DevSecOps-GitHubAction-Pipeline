import { useState, useEffect } from 'react';
import { RefreshCw, Award } from 'lucide-react';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import GameHistory from './components/GameHistory';
import { calculateWinner, checkDraw } from './utils/gameLogic';

function App() {
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [gameHistory, setGameHistory] = useState<Array<{
    winner: string | null;
    board: Array<string | null>;
    date: Date;
  }>>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'draw'>('playing');
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  // Move history for undo (store previous board and whose turn it was)
  const [moveHistory, setMoveHistory] = useState<Array<{ board: Array<string | null>; xIsNext: boolean }>>([]);

  // Play against simple AI
  const [playWithComputer, setPlayWithComputer] = useState(false);

  // Editable player names
  const [playerNames, setPlayerNames] = useState({ X: 'Pushpa Raj', O: 'Appanna' });

  // Check for winner or draw
  useEffect(() => {
    const result = calculateWinner(board);

    if (result) {
      setGameStatus('won');
      setWinningLine(result.line);

      // Update scores
      setScores(prevScores => ({
        ...prevScores,
        [result.winner]: prevScores[result.winner as keyof typeof prevScores] + 1
      }));

      // Add to history
      setGameHistory(prev => [
        ...prev,
        { winner: result.winner, board: [...board], date: new Date() }
      ]);
    } else if (checkDraw(board)) {
      setGameStatus('draw');

      // Update draw count
      setScores(prevScores => ({
        ...prevScores,
        draws: prevScores.draws + 1
      }));

      // Add to history
      setGameHistory(prev => [
        ...prev,
        { winner: null, board: [...board], date: new Date() }
      ]);
    }
  }, [board]);

  // Simple AI effect: when it's O's turn and playWithComputer is enabled, make an AI move
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    // AI plays as O (when xIsNext === false)
    if (playWithComputer && !xIsNext && gameStatus === 'playing') {
      // small delay to make it feel natural
      timeout = setTimeout(() => {
        // compute move
        import('./utils/gameLogic').then(mod => {
          const aiMove = mod.getRandomMove(board);
          if (aiMove !== null && !board[aiMove]) {
            // push current state to move history
            setMoveHistory(prev => [...prev, { board: [...board], xIsNext }]);
            const newBoard = [...board];
            newBoard[aiMove] = 'O';
            setBoard(newBoard);
            setXIsNext(true);
          }
        });
      }, 350);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [xIsNext, playWithComputer, gameStatus, board]);

  // Handle square click
  const handleClick = (index: number) => {
    // Return if square is filled or game is over
    if (board[index] || gameStatus !== 'playing') return;
    // push current state for undo
    setMoveHistory(prev => [...prev, { board: [...board], xIsNext }]);

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';

    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus('playing');
    setWinningLine(null);
  };

  // Reset all stats
  const resetStats = () => {
    resetGame();
    setScores({ X: 0, O: 0, draws: 0 });
    setGameHistory([]);
    setMoveHistory([]);
  };

  // Get current game status message
  const getStatusMessage = () => {
    if (gameStatus === 'won') {
      const winner = !xIsNext ? 'X' : 'O';
      return `Player ${winner} wins!`;
    } else if (gameStatus === 'draw') {
      return "It's a draw!";
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8 bg-indigo-600 text-white text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Award className="h-8 w-8" />
            Tic Tac Toe
          </h1>
          <p className="text-indigo-200 mt-1">A classic game reimagined</p>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Game section */}
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="mb-4 text-center w-full">
              <h2 className="text-xl font-semibold text-indigo-800">{getStatusMessage()}</h2>
            </div>

            <div className="flex-1 flex items-center justify-center w-full">
              <Board
                squares={board}
                onClick={handleClick}
                winningLine={winningLine}
              />
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={resetGame}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                New Game
              </button>
              <button
                onClick={() => {
                  // Undo last move
                  if (moveHistory.length === 0) return;
                  const last = moveHistory[moveHistory.length - 1];
                  setMoveHistory(prev => prev.slice(0, prev.length - 1));
                  setBoard(last.board);
                  setXIsNext(last.xIsNext);
                  setGameStatus('playing');
                  setWinningLine(null);
                }}
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-2 px-4 rounded-lg transition-colors"
              >
                Undo
              </button>
              <button
                onClick={resetStats}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
              >
                Reset All
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm select-none">
                <input className="rounded border-gray-300" type="checkbox" checked={playWithComputer} onChange={e => setPlayWithComputer(e.target.checked)} />
                <span className="text-gray-700">Play vs Computer (O)</span>
              </label>
            </div>
          </div>

          {/* Stats section */}
          <div className="flex flex-col gap-6">
            <ScoreBoard scores={scores} playerNames={playerNames} onNameChange={(which, name) => setPlayerNames(prev => ({ ...prev, [which]: name }))} />
            <GameHistory history={gameHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;