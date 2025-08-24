import React from 'react';
import { Trophy, User, Users } from 'lucide-react';

interface ScoreBoardProps {
  scores: {
    X: number;
    O: number;
    draws: number;
  };
  playerNames?: { X: string; O: string };
  onNameChange?: (which: 'X' | 'O', name: string) => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores, playerNames, onNameChange }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-500" />
        Score Board
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-indigo-600" />
            {onNameChange ? (
              <input
                className="bg-transparent focus:outline-none font-medium text-sm w-40 md:w-52"
                value={playerNames?.X ?? 'X'}
                onChange={e => onNameChange('X', e.target.value)}
                aria-label="Player X name"
              />
            ) : (
              <span className="font-medium">{playerNames?.X ?? 'Pushpa Raj'}</span>
            )}
          </div>
          <span className="text-lg font-bold text-indigo-600">{scores.X}</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-purple-600" />
            {onNameChange ? (
              <input
                className="bg-transparent focus:outline-none font-medium text-sm w-40 md:w-52"
                value={playerNames?.O ?? 'O'}
                onChange={e => onNameChange('O', e.target.value)}
                aria-label="Player O name"
              />
            ) : (
              <span className="font-medium">{playerNames?.O ?? 'Appanna'}</span>
            )}
          </div>
          <span className="text-lg font-bold text-purple-600">{scores.O}</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-gray-600" />
            <span className="font-medium">Draws</span>
          </div>
          <span className="text-lg font-bold text-gray-600">{scores.draws}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
