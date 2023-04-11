export type WordType = {
  [key: string]: any;
}

export type QuestionType = {
  sentence: string;
  suggestions: string[];
}

export type WordReviewPropType = {
  id: string;
  docId?: string;
  unitId: number;
  word: string;
  answers: string[];
  phrases?: string[];
  sentences?: string[];
  verb?: string[];
}