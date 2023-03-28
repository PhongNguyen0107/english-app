'use client';
import React from 'react';
import {Badge} from "antd";
import "./WordCard.style.scss";
import {WordReviewPropType} from "@/services/AppInterface";

type IProps = {
  word: WordReviewPropType;
}

const WordCard = (props: IProps) => {
  const {word: wordProps} = props;
  const {word, unitId, phrases, sentences, onClick} = wordProps;
  return (
    <Badge.Ribbon text={`Unit ${unitId}`} color="green">
      <div className={"word-card"} onClick={onClick}>
        <div className={"block horizontal"}>
          
          <div className={"main-content"}>
            <div className="word">{word}</div>
          </div>
        
        </div>
        
        <div className="footer green">
          {phrases?.[0] && <div className={"phrase"}><strong>*</strong> {phrases[0]}</div>}
          {sentences?.map(sentence => {
            return <div key={sentence} title={sentence}>{sentence}</div>
          })}
        </div>
      </div>
    </Badge.Ribbon>
  );
};

export default WordCard;
