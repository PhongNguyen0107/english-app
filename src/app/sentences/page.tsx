'use client';
import React, {useEffect} from "react";
import {Affix, Button, Card, Col, Input, Row, Space, Spin, Badge} from 'antd';
import TabBar from "@/components/tab-bar/TabBar";
import {QUERY_CONFIG, ROUTE_NAME} from "@/configuration/Application.config";
import {useQuery} from "react-query";
import {getSentences, increaseSentence} from "@/services/Sentences.service";
import MenuBar from "@/components/MenuBar";
import {SentenceType} from "@/services/AppInterface";
import {useSetState} from "ahooks";
import Fuse from "fuse.js";
import {copyToClipboardLargeData} from "@/shared/utils";
import {AppColors} from "@/shared/AppColors";
import {Plus} from "phosphor-react";

const {Search} = Input
type IState = {
  isShowFull: boolean;
  loading: boolean;
  active: any;
  strategy: string;
  search: string;
  unit: number;
  sentences: any[];
}
const Sentences = () => {

  const {data: sentencesResp, isLoading, refetch} = useQuery('sentences', getSentences, QUERY_CONFIG);
  const sentences = sentencesResp?.data?.data || [];

  const [state, setState] = useSetState<IState>({
    active: null,
    sentences: [],
    strategy: "VIETNAMESE",
    isShowFull: false,
    loading: false,
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

  const addScoreForSentence = (s: SentenceType) => {
    setState({loading: true})
    increaseSentence(s).then((r) => {
      if (r.status === 200) return refetch()
    }).finally(() => setState({loading: false}))
  }


  return (
    <main className="page">
      <title>Review list of sentences popular in life | Study english</title>
      <MenuBar/>
      <div className="page-body">
        <Row gutter={[24, 24]}>
          {(isLoading || state.loading) && <Col xs={24}><Spin/></Col>}

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
                <Badge.Ribbon text={s.score ? s.score : 0} color="green">
                  <Card
                    className={"fw"}
                    style={{
                      border: state.active?.id === s.id ? "2px solid green" : "unset"
                    }}
                    onClick={() => {
                      setState({active: s})
                      copyToClipboardLargeData(s.en)
                    }}>

                    {(state.strategy === "ENGLISH" || state.active?.id === s.id || state.isShowFull) &&
                      <div>{s.en}</div>}

                    {(state.strategy === "VIETNAMESE" || state.active?.id === s.id || state.isShowFull) &&
                      <div>{s.vi}</div>}

                    {state.active?.id === s.id && (
                      <div>
                        <Space size={12}>
                          <Button
                            onClick={() => addScoreForSentence(s)}
                            style={{background: AppColors.green60}}
                            type="primary"
                            shape="circle"
                            icon={<Plus size={12}/>}
                          />
                        </Space>
                      </div>
                    )}
                  </Card>
                </Badge.Ribbon>
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
