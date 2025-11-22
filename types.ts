
export enum SkillType {
  DOCKER = 'DOCKER',
  K8S = 'KUBERNETES',
  PSQL = 'POSTGRESQL',
  GIT = 'GIT',
  LINUX = 'LINUX'
}

export interface Message {
  id: string;
  sender: 'SYSTEM' | 'USER' | 'AI';
  text: string;
  timestamp: number;
  type?: 'info' | 'success' | 'error' | 'warning' | 'hint';
}

export interface MissionStep {
  id: number;
  briefing: string; // Context for this specific step
  objective: string; // What user needs to do
  technicalGuide: string; // Educational explanation of the concept
  commandSyntax: string; // The syntax to help the user
  validationRegex: string; // Regex string to validate command
  successMessage: string; // Message to show when passed
}

export interface MissionState {
  isActive: boolean;
  skill: SkillType | null;
  steps: MissionStep[];
  currentStepIndex: number;
  progress: number; // 0 to 100
  history: Message[];
}

export interface SystemStatus {
  cpuLoad: number;
  memoryUsage: number;
  networkTraffic: number;
  integrity: number;
}

// Theme configuration for different skills/modules
export const THEMES: Record<string, string> = {
  DEFAULT: 'text-amber-500 border-amber-500/50 shadow-amber-500/20',
  DOCKER: 'text-blue-400 border-blue-400/50 shadow-blue-400/20',
  KUBERNETES: 'text-blue-600 border-blue-600/50 shadow-blue-600/20', 
  POSTGRESQL: 'text-indigo-400 border-indigo-400/50 shadow-indigo-400/20',
  GIT: 'text-orange-500 border-orange-500/50 shadow-orange-500/20',
  LINUX: 'text-green-500 border-green-500/50 shadow-green-500/20',
  SYSTEM: 'text-red-500 border-red-500/50 shadow-red-500/20', // For errors
};

// Maps skill to a color hex for charts
export const SKILL_COLORS: Record<string, string> = {
  DOCKER: '#60A5FA',
  KUBERNETES: '#3B82F6',
  POSTGRESQL: '#818CF8',
  GIT: '#F97316',
  LINUX: '#22C55E',
};
