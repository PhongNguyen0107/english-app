export type WordType = {
  [key: string]: any;
}

export type QuestionType = {
  sentence: string;
  suggestions: string[];
}

export type WordReviewPropType = {
  id: string;
  unitId: number;
  word: string;
  answer: string[];
  phrases?: string[];
  sentences?: string[];
  onClick?: () => void;
}
