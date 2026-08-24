import React, { useState, useEffect } from 'react';
import { RefreshCw, Terminal, Cpu, User } from 'lucide-react';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TrashMiniGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null); // 'X', 'O', 'draw', or null
  const [winningLine, setWinningLine] = useState(null);
  const [stats, setStats] = useState({ player: 0, cpu: 0, draws: 0 });
  const [isCpuThinking, setIsCpuThinking] = useState(false);

  // Check for winner
  const calculateWinner = (currentBoard) => {
    for (let combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: combo };
      }
    }
    if (currentBoard.every((cell) => cell !== null)) {
      return { winner: 'draw', line: null };
    }
    return null;
  };

  // Human player ('X') click handler
  const handleCellClick = (index) => {
    if (board[index] || winner || isCpuThinking || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      if (result.winner === 'X') setStats((s) => ({ ...s, player: s.player + 1 }));
      else if (result.winner === 'draw') setStats((s) => ({ ...s, draws: s.draws + 1 }));
    } else {
      setIsXNext(false);
    }
  };

  // AI CPU ('O') automatic response
  useEffect(() => {
    if (!isXNext && !winner) {
      setIsCpuThinking(true);
      const timer = setTimeout(() => {
        const availableIndices = board
          .map((val, idx) => (val === null ? idx : null))
          .filter((val) => val !== null);

        if (availableIndices.length > 0) {
          // Check if CPU can win in 1 move
          let chosenMove = null;
          for (let idx of availableIndices) {
            const testBoard = [...board];
            testBoard[idx] = 'O';
            if (calculateWinner(testBoard)?.winner === 'O') {
              chosenMove = idx;
              break;
            }
          }

          // Check if human can win and block
          if (chosenMove === null) {
            for (let idx of availableIndices) {
              const testBoard = [...board];
              testBoard[idx] = 'X';
              if (calculateWinner(testBoard)?.winner === 'X') {
                chosenMove = idx;
                break;
              }
            }
          }

          // Center cell preference
          if (chosenMove === null && availableIndices.includes(4)) {
            chosenMove = 4;
          }

          // Otherwise pick random available cell
          if (chosenMove === null) {
            const randomIndex = Math.floor(Math.random() * availableIndices.length);
            chosenMove = availableIndices[randomIndex];
          }

          const newBoard = [...board];
          newBoard[chosenMove] = 'O';
          setBoard(newBoard);

          const result = calculateWinner(newBoard);
          if (result) {
            setWinner(result.winner);
            setWinningLine(result.line);
            if (result.winner === 'O') setStats((s) => ({ ...s, cpu: s.cpu + 1 }));
            else if (result.winner === 'draw') setStats((s) => ({ ...s, draws: s.draws + 1 }));
          } else {
            setIsXNext(true);
          }
        }
        setIsCpuThinking(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isXNext, winner, board]);

  // Reset Game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
    setIsCpuThinking(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-[#F2F2F2] font-mono select-none overflow-y-auto p-4 sm:p-6">
      {/* Terminal Title / Prompt */}
      <div className="flex flex-col items-center text-center space-y-1 mb-3 shrink-0">
        <div className="text-green-400 font-semibold text-sm sm:text-base tracking-wide flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-400 animate-pulse" />
          <span>"Where my free time goes..."</span>
        </div>
        <div className="text-white/40 text-[11px]">
          [PROCESS: /dev/trash/tictactoe.sh — v2.4.0-release]
        </div>
      </div>

      {/* Scoreboard Bar */}
      <div className="max-w-xs mx-auto w-full bg-black/40 border border-white/10 rounded-xl p-2.5 flex items-center justify-around text-xs mb-4 shadow-inner shrink-0">
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
          <User className="w-3.5 h-3.5" />
          <span>YOU (X): {stats.player}</span>
        </div>
        <div className="text-white/30 font-bold">|</div>
        <div className="flex items-center gap-1.5 text-white/60 font-medium">
          <span>DRAWS: {stats.draws}</span>
        </div>
        <div className="text-white/30 font-bold">|</div>
        <div className="flex items-center gap-1.5 text-ubuntu-orange font-bold">
          <Cpu className="w-3.5 h-3.5" />
          <span>CPU (O): {stats.cpu}</span>
        </div>
      </div>

      {/* 3x3 Tic-Tac-Toe Grid (Fully Explicit 3-col 3-row Matrix) */}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="grid grid-cols-3 grid-rows-3 gap-2 p-4 w-fit mx-auto bg-black/60 border border-white/20 rounded-2xl shadow-2xl">
          {board.map((cell, idx) => {
            const isWinningCell = winningLine?.includes(idx);

            return (
              <button
                key={idx}
                onClick={() => handleCellClick(idx)}
                disabled={cell !== null || winner !== null || isCpuThinking}
                className={`w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center border border-white/20 rounded-xl bg-gray-800 hover:bg-white/10 transition-colors text-4xl sm:text-5xl font-black font-mono select-none ${
                  cell === null && !winner && !isCpuThinking
                    ? 'cursor-pointer active:scale-95'
                    : 'cursor-default'
                } ${
                  isWinningCell
                    ? 'bg-ubuntu-orange/20 border-ubuntu-orange shadow-[0_0_15px_rgba(233,84,32,0.4)]'
                    : ''
                }`}
              >
                {cell === 'X' && (
                  <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)] animate-scale-in">
                    X
                  </span>
                )}
                {cell === 'O' && (
                  <span className="text-ubuntu-orange drop-shadow-[0_0_10px_rgba(233,84,32,0.7)] animate-scale-in">
                    O
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Game State Message & Action */}
        <div className="mt-4 pb-2 flex flex-col items-center space-y-2.5 min-h-[64px] shrink-0">
          {winner ? (
            <div className="space-y-2 text-center animate-fade-in">
              <div
                className={`text-sm sm:text-base font-bold tracking-wide ${
                  winner === 'X'
                    ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                    : winner === 'O'
                    ? 'text-ubuntu-orange drop-shadow-[0_0_8px_rgba(233,84,32,0.5)]'
                    : 'text-amber-400'
                }`}
              >
                {winner === 'X' && '> SYSTEM MATCH: PLAYER X WINS! 🎉'}
                {winner === 'O' && '> SYSTEM MATCH: CPU O WINS! 💻'}
                {winner === 'draw' && "> SYSTEM MATCH: DRAW - CAT'S GAME 🤝"}
              </div>

              <button
                onClick={resetGame}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-ubuntu-orange text-white text-xs font-mono font-bold tracking-wider border border-white/20 hover:border-ubuntu-orange transition-all duration-150 shadow-md transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>[ Click to restart process ]</span>
              </button>
            </div>
          ) : isCpuThinking ? (
            <div className="text-xs text-ubuntu-orange flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-ubuntu-orange animate-ping" />
              <span>&gt; CPU calculating counter-matrix move...</span>
            </div>
          ) : (
            <div className="text-xs text-white/50 font-mono">
              &gt; TURN: {isXNext ? 'Player (X)' : 'CPU (O)'} — click any empty slot
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
