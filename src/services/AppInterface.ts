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

export type SentenceType = {
  id: string | number;
  en: string;
  vi: string;
  origin?: string;
  image?: string;
}


export type PracticeConfigPayloadType = {
  prompt?: string;
  en?: string;
  vi?: string;
  grammar?: string;
  word?: string;
  character?: string;
  words?: string[];
  genreOfOutput?: string;
}
