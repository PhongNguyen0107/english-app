'use client';
import React from 'react';
import {Badge, Image} from "antd";
import "./WordCard.style.scss";

type WordCardPropType = {
  word: string;
  meaning: string;
  description: string;
  meme: string;
  phrase: string;
  sentences?: string[];
  onClick?: () => void;
}
const WordCard = (props: WordCardPropType) => {
  const {word, meme, meaning, description, phrase, sentences, onClick} = props;
  return (
      <Badge.Ribbon text="Verb" color="green">
        <div className={"word-card"} onClick={onClick}>
          <div className={"block horizontal"}>
            <div className={"meme-photo"}>
              <Image
                width={"100%"}
                height={"160px"}
                src={meme}
              />
            </div>
            <div className={"main-content"}>
              <div className="word">{word}</div>
              <div className="meaning">{meaning}</div>
              <div className="description">{description}</div>
            </div>

          </div>
          <div className="footer green">
            <div className={"phrase"}><strong>*</strong> {phrase}</div>
            {sentences?.map(sentence => {
              return <div key={sentence} title={sentence}>{sentence}</div>
            })}
          </div>
        </div>
       </Badge.Ribbon>
  );
};

export default WordCard;
