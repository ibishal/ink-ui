
export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  EXTREME = 'Extreme'
}

export interface Level {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  objective: string;
  sourceCode: string;
  initialState: Record<string, any>;
  contractAddress: string;
}

export interface UserProgress {
  completedLevels: string[];
  currentLevelId: string | null;
  achievements: string[];
}

export interface ConsoleMessage {
  type: 'info' | 'error' | 'success' | 'warning';
  text: string;
  timestamp: string;
}
