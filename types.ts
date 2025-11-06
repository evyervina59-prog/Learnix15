export interface DataPoint {
  label: string;
  value: number;
}

export interface DirtyDataPoint {
  label: string;
  value: number | null | string;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  data?: DirtyDataPoint[];
  content?: string;
}

export type ChartType = 'bar' | 'pie' | 'line';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of the correct option
}

export type Answers = {
  [key: number]: number; // questionId: selectedOptionIndex
};
