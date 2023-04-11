'use client';
import React from 'react';
import {Badge, Button, Space} from "antd";
import "./WordCard.style.scss";
import {WordReviewPropType} from "@/services/AppInterface";
import {FloppyDisk} from "@phosphor-icons/react";
import {AppColors} from "@/shared/AppColors";

type IProps = {
  word: WordReviewPropType;
  active: WordReviewPropType | null;
  isShowAnswer?: boolean;
  isShowSentence?: boolean;
  isShowPhrase?: boolean;
  strategy: string;
  onClick: () => void;
  onSaveWord: (w: WordReviewPropType) => void;
}

const WordCard = (props: IProps) => {
  const {
    word: wordProps, isShowAnswer,
    isShowPhrase, isShowSentence, onClick,
    active, strategy, onSaveWord
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


        <div className="controls">
          <Space size={4} direction={"vertical"}>
            <Button
              onClick={() => onSaveWord(wordProps)}
              style={{background: AppColors.green60}}
              type="primary"
              shape="circle"
              icon={<FloppyDisk size={12}/>}
            />
          </Space>
        </div>
      </div>
    </Badge.Ribbon>
  );
};

export default WordCard;