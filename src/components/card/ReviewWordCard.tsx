'use client';
import React from 'react';
import {Badge} from "antd";
import "./WordCard.style.scss";
import {WordReviewPropType} from "@/services/AppInterface";

type IProps = {
  word: WordReviewPropType;
  active: WordReviewPropType | null;
  isShowAnswer?: boolean;
  isShowSentence?: boolean;
  isShowPhrase?: boolean;
  strategy: string;
  onClick: () => void;
}

const WordCard = (props: IProps) => {
  const {
    word: wordProps, isShowAnswer,
    isShowPhrase, isShowSentence, onClick,
    active, strategy
  } = props;
  const {word, unitId, phrases, sentences, answers, id} = wordProps;
  
  return (
    <Badge.Ribbon text={`Unit ${unitId}`} color="green">
      <div className={"word-card"} onClick={onClick}>
        <div className={"block horizontal"}>
          {strategy === "ENGLISH" ? (
            <div className={"main-content"}>
              <div className="word">{answers[0]}</div>
              {(isShowAnswer || active?.id === id) && <div className="word green">{word}</div>}
            </div>
          ) : (
            <div className={"main-content"}>
              <div className="word">{word}</div>
              {(isShowAnswer || active?.id === id) && <div className="word green">{answers[0]}</div>}
            </div>
          )}
        </div>
        
        <div className="footer green">
          {(isShowPhrase || active?.id === id) && phrases?.[0] &&
            <div className={"phrase"}><strong>*</strong> {phrases[0]}</div>}
          
          {(isShowSentence || active?.id === id) && sentences?.map(sentence => {
            return <div key={sentence} title={sentence}>{sentence}</div>
          })}
        </div>
      </div>
    </Badge.Ribbon>
  );
};

export default WordCard;
