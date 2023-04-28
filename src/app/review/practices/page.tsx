'use client';
import React, {useMemo} from "react";
import {Button, Card, Col, InputNumber, Row, Select, Space, Spin, Tag, Typography} from 'antd';
import {useQuery} from "react-query";
import MenuBar from "@/components/MenuBar";
import {WordReviewPropType, WordType} from "@/services/AppInterface";
import {useSetState} from "ahooks";
import {getListOfWordRandomBySize, getOutcomesToPractice} from "@/services/Practices.service";
import {getWordReview} from "@/services/Review.service";
import {QUERY_CONFIG} from "@/configuration/Application.config";
import type {CustomTagProps} from 'rc-select/lib/BaseSelect';

type IState = {
  listOfWords: WordType[],
  numOfWords: number,
  search: string,
  strategy: string;
  isLoad: boolean;
  genreOfOutput: string;
  outcomes: any;
}
const PracticesPage = () => {

  const {data: wordsResp, isLoading: isLoadingWords} = useQuery('words/review', getWordReview, QUERY_CONFIG);
  const words = wordsResp?.data?.data || []

  const [state, setState] = useSetState<IState>({
    search: "",
    numOfWords: 3,
    listOfWords: [],
    strategy: "ENGLISH",
    isLoad: false,
    genreOfOutput: "paragraph",
    outcomes: null
  })


  const getWordRandom = () => {
    setState({isLoad: true})
    getListOfWordRandomBySize(state.numOfWords)
      .then(resp => {
        if (resp.status === 200) return setState({listOfWords: resp.data});
      }).finally(() => {
      setState({isLoad: false})
    })
  }


  const wordTagRender = (props: CustomTagProps) => {
    const {label, closable, onClose} = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={state.strategy === "ENGLISH" ? "green" : "lime"}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{marginRight: 3}}
      >
        {label}
      </Tag>
    );
  };

  const listWordOptions = useMemo(() => {
    return words.map((x: WordReviewPropType) => {
      return {
        ...x,
        label: `${x.answers[0]} | ${x.word}`,
        value: x.answers[0]
      }
    })
  }, words)

  const onGetOutComes = () => {
    setState({isLoad: true})
    getOutcomesToPractice({
      genreOfOutput: state.genreOfOutput,
      words: state.listOfWords.map((x) => x.answers[0])
    })
      .then(resp => {
        if (resp.status === 200) return setState({outcomes: resp.data})
      })
      .finally(() => setState({isLoad: false}))
  }

  const getOutcomesRender = (type: string) => {
    if (type === "VI") return `${state.outcomes.vi}`;
    if (type === "GRAMMAR") return `${state.outcomes.grammar}`;
    let content = `${state.outcomes.en}`;
    let wordBold = state.listOfWords.map((x) => x.answers[0])
    wordBold.forEach(w => {
      content = content.replaceAll(new RegExp(w, "ig"), `<strong><i>${w}</i></strong>`)
    })
    console.log("Outcomes: ", state.outcomes)
    return content;
  }


  return (
    <main className="page">
      <MenuBar/>
      <div className="page-body">
        <Row gutter={[24, 24]}>
          {(isLoadingWords || state.isLoad) && <Col xs={24} className={"f-center"}><Spin/></Col>}

          <Col xs={24} xl={12}>
            <div className={"fw"}>
              <Select
                mode="multiple"
                placeholder={"Choose some words to generations"}
                showArrow
                tagRender={wordTagRender}
                style={{width: "100%"}}
                onChange={(_v, option) => {
                  //@ts-ignore
                  setState({listOfWords: option})
                }}
                options={listWordOptions}
              />

            </div>
          </Col>

          <Col xs={24} className={"fw"}>
            <Space size={12} wrap={true}>

              <Space size={8} wrap={true}>

                <InputNumber
                  min={1}
                  max={30}
                  defaultValue={3}
                  onChange={(n: number | any) => setState({numOfWords: Number(n || 0)})}/>

                <Button
                  type={"dashed"}
                  onClick={getWordRandom}>
                  Get {state.numOfWords} words random
                </Button>
              </Space>

              <Select
                placeholder={"Choose a genre of output"}
                showArrow
                showSearch={true}
                defaultValue={state.genreOfOutput}
                style={{width: 220}}
                onChange={(v) => {
                  setState({genreOfOutput: v})
                }}
                options={[
                  {
                    label: "paragraph",
                    value: "paragraph"
                  },
                  {
                    label: "poetry",
                    value: "poetry"
                  },
                ]}
              />


              <Button
                type={"primary"}
                onClick={() => {
                  setState({
                    strategy: state.strategy === "ENGLISH" ? "VIETNAMESE" : "ENGLISH"
                  })
                }}>
                {state.strategy === "ENGLISH" ? "VIETNAMESE" : "ENGLISH"}
              </Button>

              {state.listOfWords.length > 0 && state.genreOfOutput && (
                <Button
                  loading={(isLoadingWords || state.isLoad)}
                  type={"primary"}
                  onClick={onGetOutComes}>
                  Get Outcomes
                </Button>
              )}
            </Space>
          </Col>


          {state.listOfWords.length > 0 && (
            <Col xs={24}>
              <Typography.Title level={4}>List of words random:</Typography.Title>
              {state.strategy === "VIETNAMESE" && state.listOfWords.map(w => {
                return <Tag key={w.id} color="lime">{w.word}</Tag>
              })}

              {state.strategy === "ENGLISH" && state.listOfWords.map(w => {
                return <Tag key={w.id} color="green">{w.answers[0]}</Tag>
              })}
            </Col>
          )}

          {state.outcomes && (
            <Col xs={24} xl={12}>
              <Card style={{height: "100%"}}>
                {/*@ts-ignore*/}
                <div
                  style={{
                    whiteSpace: "break-spaces"
                  }}
                  dangerouslySetInnerHTML={{
                    __html: getOutcomesRender("EN")
                  }}/>
              </Card>
            </Col>
          )}

          {state.outcomes && (
            <Col xs={24} xl={12}>
              <Card style={{height: "100%"}}>
                {/*@ts-ignore*/}
                <div
                  style={{
                    whiteSpace: "break-spaces"
                  }}
                  dangerouslySetInnerHTML={{
                    __html: getOutcomesRender("VI")
                  }}/>
              </Card>
            </Col>
          )}

          {state.outcomes && (
            <Col xs={24}>
              <Card>
                {/*@ts-ignore*/}
                <div
                  style={{
                    whiteSpace: "break-spaces"
                  }}
                  dangerouslySetInnerHTML={{
                    __html: getOutcomesRender("GRAMMAR")
                  }}/>
              </Card>
            </Col>
          )}
        </Row>

      </div>
    </main>
  )
}

export default PracticesPage;
