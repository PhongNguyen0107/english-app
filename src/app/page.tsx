'use client';
import React, {useEffect} from "react";
import TabBar from "@/components/tab-bar/TabBar";
import {Card, Col, Row, Spin, Typography, Badge} from "antd";
import {QUERY_CONFIG, ROUTE_NAME} from "@/configuration/Application.config";
import {getListOfWordsSavedByUId} from "@/services/Words.service";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/configuration/firebase.config";
import MenuBar from "@/components/MenuBar";
import {useSetState} from "ahooks";
import {SentenceType, WordReviewPropType} from "@/services/AppInterface";
import ReviewWordCard from "@/components/card/ReviewWordCard";
import {useQuery} from "react-query";
import {getTop10WordReview} from "@/services/Review.service";
import {getTop10SentencesReview} from "@/services/Sentences.service";
import {copyToClipboardLargeData} from "@/shared/utils";

const {Title} = Typography;

type IState = {
  listOfWordSaved: any [];
  isShowAnswer: boolean;
  isShowPhrase: boolean;
  active: any;
  sentenceActive: any;
  strategy: string;
  search: string;
  unit: number;
  isShowSentence: boolean;
}
export default function Home() {
  const [user] = useAuthState(auth)

  const [state, setState] = useSetState<IState>({
    listOfWordSaved: [],
    active: null,
    sentenceActive: null,
    strategy: "VIETNAMESE",
    isShowAnswer: false,
    isShowPhrase: false,
    isShowSentence: false,
    search: "",
    unit: 0
  })

  const {data: topWords, isLoading} = useQuery('words/review/mail', getTop10WordReview, QUERY_CONFIG);
  const {
    data: topSentences,
    isLoading: isLoadingSentences
  } = useQuery('sentences/top-10', getTop10SentencesReview, QUERY_CONFIG);

  useEffect(() => {
    user && user?.email && getListOfWordsSavedByUId(user.email).then(words => {
      setState({listOfWordSaved: words})
    })

  }, [user?.email])

  return (
    <main className="page">
      <MenuBar/>
      <div className={"page-body"}>
        <Row gutter={[32, 32]}>

          <Col xs={24}>
            <Title level={2}>Your saved words</Title>
          </Col>
          {state.listOfWordSaved?.map((w: WordReviewPropType, ind: number) => {
            return (
              <Col key={`${w.id}_${ind}`} xs={24} md={12} lg={10} xl={8} xxl={6}>
                <ReviewWordCard
                  strategy={state.strategy}
                  onClick={() => setState({active: w})}
                  active={state.active}
                  isShowSentence={state.isShowSentence}
                  isShowPhrase={state.isShowPhrase}
                  onSaveWord={() => {
                  }}
                  isShowAnswer={state.isShowAnswer}
                  word={w}/>
              </Col>
            )
          })}


          <Col xs={24}>
            <Title level={2}>Top 10 words today</Title>
          </Col>
          {isLoading && <Col xs={24} className={"f-center"}><Spin/></Col>}
          {topWords && topWords?.data?.map((w: WordReviewPropType, ind: number) => {
            return (
              <Col key={`${w.id}_${ind}`} xs={24} md={12} lg={10} xl={8} xxl={6}>
                <ReviewWordCard
                  strategy={state.strategy}
                  onClick={() => setState({active: w})}
                  active={state.active}
                  isShowSentence={state.isShowSentence}
                  isShowPhrase={state.isShowPhrase}
                  onSaveWord={() => {
                  }}
                  isShowAnswer={state.isShowAnswer}
                  word={w}/>
              </Col>
            )
          })}


          <Col xs={24}>
            <Title level={2}>Top 10 sentences today</Title>
          </Col>
          {isLoadingSentences && <Col xs={24} className={"f-center"}><Spin/></Col>}
          {topSentences && topSentences?.data?.map((s: SentenceType, ind: number) => {
            return (
              <Col key={`${s.id}_${ind}`} xs={24} md={12} lg={10} xl={8} xxl={6}>
                <Badge.Ribbon text={s.score ? s.score : 0} color="green">
                  <Card
                    className={"fw"}
                    style={{
                      border: state.sentenceActive?.id === s.id ? "2px solid green" : "unset"
                    }}
                    onClick={() => {
                      setState({sentenceActive: s})
                      copyToClipboardLargeData(s.en)
                    }}>
                    {(state.strategy === "ENGLISH" || state.sentenceActive?.id === s.id) && <div>{s.en}</div>}
                    {(state.strategy === "VIETNAMESE" || state.sentenceActive?.id === s.id) && <div>{s.vi}</div>}
                  </Card>
                </Badge.Ribbon>
              </Col>
            )
          })}

        </Row>
      </div>

      <TabBar active={ROUTE_NAME.HOME}/>
    </main>
  )
}
