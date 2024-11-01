export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division';
export type Difficulty = 'single' | 'double' | 'triple' | 'quadruple';

export interface GameSettings {
  operation: Operation;
  difficulty: Difficulty;
}

export interface Problem {
  firstNumber: number;
  secondNumber: number;
  correctAnswer: number;
  options: number[];
}