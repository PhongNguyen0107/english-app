'use client';
import React, {useEffect} from "react";
import {Affix, Button, Card, Col, Input, Row, Space, Spin} from 'antd';
import TabBar from "@/components/tab-bar/TabBar";
import {ROUTE_NAME} from "@/configuration/Application.config";
import {useQuery} from "react-query";
import {getSentences} from "@/services/Sentences.service";
import MenuBar from "@/components/MenuBar";
import {SentenceType} from "@/services/AppInterface";
import {useSetState} from "ahooks";
import Fuse from "fuse.js";

const {Search} = Input
type IState = {
  isShowFull: boolean;
  active: any;
  strategy: string;
  search: string;
  unit: number;
  sentences: any[];
}
const Sentences = () => {

  const {data: sentencesResp, isLoading} = useQuery('sentences', getSentences);
  const sentences = sentencesResp?.data?.data || [];


  const [state, setState] = useSetState<IState>({
    active: null,
    sentences: [],
    strategy: "VIETNAMESE",
    isShowFull: false,
    search: "",
    unit: 0
  })

  useEffect(() => {
    setState({sentences: sentences})
  }, [sentences])

  const onSearchInput = (v: string) => {
    if (!v) setState({search: v, sentences: sentences});
    else {
      const options = {
        includeScore: true,
        keys: [
          {name: 'en', getFn: (w: SentenceType) => w.en.toString()},
          {name: 'vi', getFn: (w: SentenceType) => w.vi.toString()},
          {name: 'origin', getFn: (w: SentenceType) => w.origin},
        ],
        isCaseSensitive: false,
        shouldSort: true,
        includeMatches: false,
        findAllMatches: false,
        minMatchCharLength: 1,
        location: 0,
        threshold: 0.6,
        distance: 1000,
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
      setState({
        sentences: dataFilterUpdate,
        search: v
      })
    }
  }


  return (
    <main className="page">
      <title>Review list of sentences popular in life | Study english</title>
      <MenuBar/>
      <div className="page-body">
        <Row gutter={[24, 24]}>
          {isLoading && <Col xs={24}><Spin/></Col>}

          <Affix offsetTop={24} className={"fw"}>
            <Col xs={24} className={"fw"}>
              <Space size={12} wrap={true}>
                <div className={"fw"}>
                  <Search
                    placeholder={"Search for whatever you want..."}
                    id={"search-word"}
                    value={state.search}
                    //@ts-ignore
                    onChange={(e) => onSearchInput(e.target.value)}
                  />


                </div>

                <Button
                  type={"dashed"}
                  onClick={() => setState({isShowFull: !state.isShowFull})}>
                  {state.isShowFull ? `Hide` : `Show`} all
                </Button>

                <Button
                  type={"primary"}
                  onClick={() => {
                    setState({
                      strategy: state.strategy === "ENGLISH" ? "VIETNAMESE" : "ENGLISH"
                    })
                  }}>
                  {state.strategy === "ENGLISH" ? "VIETNAMESE" : "ENGLISH"}
                </Button>
              </Space>
            </Col>

          </Affix>

          {state.sentences.map((s: SentenceType) => {
            return (
              <Col
                key={s.id}
                xs={24} lg={12} xxl={8}
                style={{height: "100%", cursor: "pointer"}}
              >
                <Card
                  className={"fw"}
                  style={{
                    border: state.active?.id === s.id ? "2px solid green" : "unset"
                  }}
                  onClick={() => setState({active: s})}>
                  {(state.strategy === "ENGLISH" || state.active?.id === s.id || state.isShowFull) &&
                    <div>{s.en}</div>}

                  {(state.strategy === "VIETNAMESE" || state.active?.id === s.id || state.isShowFull) &&
                    <div>{s.vi}</div>}
                </Card>
              </Col>
            )
          })}
        </Row>

      </div>
      <TabBar active={ROUTE_NAME.SETTINGS}/>
    </main>
  )
}

export default Sentences;
