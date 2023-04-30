'use client';
import React from "react";
import {Button, Card, Col, Row, Select, Space, Spin} from 'antd';
import {useQuery} from "react-query";
import MenuBar from "@/components/MenuBar";
import {WordReviewPropType} from "@/services/AppInterface";
import {useSetState} from "ahooks";
import {getWordReview} from "@/services/Review.service";
import {QUERY_CONFIG} from "@/configuration/Application.config";
import {getOutcomesHomonymsToPractice} from "@/services/Practices.service";

type IProps = {}
type IState = {
  character: string,
  search: string,
  isLoad: boolean;
  word: string | null;
  outcomes: any;
}

const HomonymsPage = (props: IProps) => {
  const {data: wordsResp, isLoading: isLoadingWords} = useQuery('words/review', getWordReview, QUERY_CONFIG);
  const words = wordsResp?.data?.data || []

  const [state, setState] = useSetState<IState>({
    character: "",
    search: "",
    isLoad: false,
    word: null,
    outcomes: null
  })

  const onGetOutComes = () => {
    setState({isLoad: true})
    if (state.word) {
      getOutcomesHomonymsToPractice({
        word: state.word,
        character: state.character
      })
        .then(resp => {
          if (resp.status === 200) return setState({outcomes: resp.data});
        }).finally(() => {
        setState({isLoad: false})
      })
    }
  }


  return (
    <React.Fragment>
      <main className="page">
        <title>Practices English via paragraph generation by your words | Study english | chatGPT</title>
        <MenuBar/>
        <div className="page-body">
          <Row gutter={[24, 24]}>
            {(isLoadingWords || state.isLoad) && <Col xs={24} className={"f-center"}><Spin/></Col>}

            <Col xs={24}>
              <Space size={24} wrap={true}>

                <Select
                  placeholder={"Choose a word to find all homonyms"}
                  showArrow
                  showSearch={true}
                  defaultValue={state.word}
                  style={{width: 280}}
                  onChange={(v) => {
                    setState({word: v})
                  }}
                  options={words.map((w: WordReviewPropType) => {
                    return {
                      ...w,
                      label: `${w.answers[0]} - ${w.word}`,
                      value: w.answers[0],
                    }
                  })}
                />

                {1 < 0 && state.word && (
                  <Select
                    placeholder={`Choose a character of ${state.word} to generate`}
                    showArrow
                    showSearch={true}
                    defaultValue={state.character}
                    style={{width: 160}}
                    onChange={(v) => {
                      setState({character: v})
                    }}
                    options={state.word?.split('').filter(x => x.trim()).map((c, i) => {
                      return {
                        id: `${c}__${i}`,
                        label: c,
                        value: c
                      }
                    })}
                  />
                )}

                {state.word && (
                  <Button
                    loading={(isLoadingWords || state.isLoad)}
                    type={"primary"}
                    onClick={onGetOutComes}>
                    Get Outcomes
                  </Button>
                )}
              </Space>
            </Col>

            <Col xs={24}>
              {state.outcomes?.words && (
                <Card>
                  {/*@ts-ignore*/}
                  <div
                    style={{
                      whiteSpace: "break-spaces"
                    }}
                    dangerouslySetInnerHTML={{
                      __html: state.outcomes.words
                    }}/>
                </Card>
              )}
            </Col>


          </Row>
        </div>
      </main>

    </React.Fragment>
  );
};

HomonymsPage.propTypes = {};

export default HomonymsPage;
