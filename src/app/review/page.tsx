'use client';
import React from 'react';
import {useRouter} from "next/navigation";
import {useQuery} from "react-query";
import {Affix, Button, Col, Row, Space} from "antd";
import {WordReviewPropType} from "@/services/AppInterface";
import {QUERY_CONFIG, ROUTE_NAME} from "@/configuration/Application.config";
import TabBar from "@/components/tab-bar/TabBar";
import {getWordReview} from "@/services/Review.service";
import ReviewWordCard from "@/components/card/ReviewWordCard";
import {useSetState} from "ahooks";


type IProps = {}
type IState = {
  isShowAnswer: boolean;
  isShowPhrase: boolean;
  active: any;
  strategy: string;
  isShowSentence: boolean;
}
const ReviewPage = (props: IProps) => {
  const router = useRouter()
  // @ts-ignore
  const {data: wordsResp, isLoading, error} = useQuery('words/review', getWordReview, QUERY_CONFIG);
  const words = wordsResp?.data?.data || []
  
  const [reviewState, setReviewState] = useSetState<IState>({
    active: null,
    strategy: "ENGLISH",
    isShowAnswer: false,
    isShowPhrase: false,
    isShowSentence: false,
  })
  
  return (
    <div className="page">
      <div className={"page-body"}>
        <Row gutter={[36, 36]}>
          <Affix offsetTop={24}>
            <Col xs={24} className={"fw"}>
              <Space size={12}>
                <Button
                  type={"dashed"}
                  onClick={() => setReviewState({isShowAnswer: !reviewState.isShowAnswer})}>
                  {reviewState.isShowAnswer ? `Hide` : `Show`} Word
                </Button>
  
                <Button
                  type={"dashed"}
                  onClick={() => setReviewState({isShowPhrase: !reviewState.isShowPhrase})}>
                  {reviewState.isShowPhrase ? `Hide` : `Show`} Phrase
                </Button>
  
                <Button
                  type={"dashed"}
                  onClick={() => setReviewState({isShowSentence: !reviewState.isShowSentence})}>
                  {reviewState.isShowSentence ? `Hide` : `Show`} Sentence
                </Button>
  
                <Button
                  type={"primary"}
                  onClick={() => {
                    setReviewState({
                      strategy: reviewState.strategy === "ENGLISH" ? "VIETNAMESE" : "ENGLISH"
                    })
                  }}>
                  {reviewState.strategy === "ENGLISH" ? "VIETNAMESE" : "ENGLISH"}
                </Button>
              </Space>
            </Col>
          </Affix>
          
          {words.map((w: WordReviewPropType) => {
            return (
              <Col key={w.id} xs={24} md={12} lg={10} xl={8} xxl={6}>
                <ReviewWordCard
                  strategy={reviewState.strategy}
                  onClick={() => setReviewState({active: w})}
                  active={reviewState.active}
                  isShowSentence={reviewState.isShowSentence}
                  isShowPhrase={reviewState.isShowPhrase}
                  isShowAnswer={reviewState.isShowAnswer} word={w}/>
              </Col>
            )
          })}
        
        </Row>
      </div>
    
      <TabBar active={ROUTE_NAME.WORDS}/>
    </div>
  );
};


export default ReviewPage;
