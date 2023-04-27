'use client';
import React from "react";
import {Affix, Button, Card, Col, Input, Row, Space, Spin} from 'antd';
import TabBar from "@/components/tab-bar/TabBar";
import {ROUTE_NAME} from "@/configuration/Application.config";
import {useRouter} from "next/navigation";
import {useQuery} from "react-query";
import {getSentences} from "@/services/Sentences.service";
import MenuBar from "@/components/MenuBar";
import {SentenceType} from "@/services/AppInterface";
import {useSetState} from "ahooks";
import Fuse from "fuse.js";

const {Search} = Input
type IState = {
  isShowAnswer: boolean;
  isShowPhrase: boolean;
  active: any;
  strategy: string;
  search: string;
  unit: number;
  sentences: any[];
  isShowSentence: boolean;
}
const Sentences = () => {
  const router = useRouter()


  const {data: sentencesResp, isLoading} = useQuery('sentences', getSentences);
  const sentences = sentencesResp?.data?.data || [];


  const [reviewState, setReviewState] = useSetState<IState>({
    active: null,
    sentences: [],
    strategy: "VIETNAMESE",
    isShowAnswer: false,
    isShowPhrase: false,
    isShowSentence: false,
    search: "",
    unit: 0
  })


  const onSearchInput = (v: string) => {
    if (!v) setReviewState({search: v, sentences: sentences});
    else {
      const options = {
        includeScore: true,
        keys: [
          {name: 'en', getFn: (w: SentenceType) => w.en.toString()},
          {name: 'vi', getFn: (w: SentenceType) => w.vi},
          {name: 'origin', getFn: (w: SentenceType) => w.origin},
        ],
        isCaseSensitive: false,
        shouldSort: true,
        includeMatches: false,
        findAllMatches: false,
        minMatchCharLength: 1,
        location: 0,
        threshold: 0.6,
        distance: 100,
        useExtendedSearch: false,
        ignoreLocation: false,
        ignoreFieldNorm: false,
        fieldNormWeight: 1,
      }
      //@ts-ignore
      const fuse = new Fuse(sentences, options)

      const results = fuse.search(v)
      const dataFilterUpdate: any[] = results.map(res => {
        // @ts-ignore
        return {...res.item}
      })
      setReviewState({
        sentences: dataFilterUpdate,
        search: v
      })
    }
  }


  return (
    <main className="page">
      <MenuBar/>
      <div className="page-body">
        <Row gutter={[12, 12]}>
          {isLoading && <Col xs={24}><Spin/></Col>}

          <Affix offsetTop={24} className={"fw"}>
            <Col xs={24} className={"fw"}>
              <Space size={12} wrap={true}>
                <div className={"fw"}>
                  <Search
                    placeholder={"Search for whatever you want..."}
                    id={"search-word"}
                    value={reviewState.search}
                    //@ts-ignore
                    onChange={(e) => onSearchInput(e.target.value)}
                  />


                </div>

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

          {sentences.map((s: SentenceType) => {
            return (
              <Card key={s.id}>

                <div>{s.en}</div>
              </Card>
            )
          })}
        </Row>

      </div>
      <TabBar active={ROUTE_NAME.SETTINGS}/>
    </main>
  )
}

export default Sentences;
