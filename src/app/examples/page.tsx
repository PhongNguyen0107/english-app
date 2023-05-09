'use client'
import React from 'react';
import MenuBar from "@/components/MenuBar";
import {Col, Input, Row, Space, Button, InputNumber, Select, Image, Spin} from "antd";
import {getImageCreationByConfig} from "@/services/Practices.service";
import {useSetState} from "ahooks";
import axios from 'axios';
import {get} from "lodash";

type IProps = {}
type IState = {
  prompt: string;
  prompt_chat: string;
  numberOfImages: number;
  size: string;
  outcomes: any;
  outcomeText: any;
  isLoad: boolean;
  isLoadText: boolean;
}
const {TextArea} = Input
const ExamplesFeature = (props: IProps) => {
  const [state, setState] = useSetState<IState>({
    numberOfImages: 3,
    prompt: "",
    prompt_chat: "",
    size: "",
    outcomes: null,
    isLoad: false,
    isLoadText: false,
    outcomeText: null
  })

  const getOutcomesImageByPrompt = () => {
    setState({isLoad: true, outcomes: null})
    getImageCreationByConfig({
      number: state.numberOfImages,
      prompt: state.prompt,
      size: state.size
    }).then(resp => {
      if (resp.status === 200) setState({outcomes: resp.data})
    }).finally(() => setState({isLoad: false}))
  }

  const getOutcomesChatByPrompt = () => {
    setState({isLoadText: true, outcomeText: null})
    return axios({
      url: process.env.NEXT_PUBLIC_CALL_API_TOOLS_URL,
      method: "POST",
      data: {
        "license_key": process.env.NEXT_PUBLIC_AI_KEY,
        "url": process.env.NEXT_PUBLIC_CHAT_COMPLETIONS_URL,
        "method": "POST",
        "payload": {
          "model": "gpt-3.5-turbo",
          "messages": [
            {
              "role": "user",
              "content": state.prompt_chat
            }
          ]
        }
      }
    }).then(res => {
      setState({
        outcomeText: get(res, "data.choices[0].message.content"),
        isLoadText: false
      });
    }).catch(err => {
      setState({
        outcomeText: JSON.stringify(err.response),
        isLoadText: false
      });
    });
  }
  return (
    <main className="page">
      <title>Example features implemented here to before release | Study english</title>
      <MenuBar/>
      <div className={"page-body"}>
        <Row gutter={[24, 24]}>
          {(state.isLoad || state.isLoadText) && <Col xs={24} className={"f-center"}><Spin/></Col>}

          <Col xs={24}>
            <TextArea
              placeholder={"Input your prompt to generation image"}
              rows={4} onChange={(e) => setState({prompt: e.target.value})}/>
          </Col>

          <Col xs={24}>
            <Space size={24} wrap={true}>
              <InputNumber
                placeholder={"Number of image generation"}
                min={1}
                max={10}
                defaultValue={3}
                value={state.numberOfImages}
                onChange={(n: number | any) => setState({numberOfImages: Number(n || 0)})}
              />

              <Select
                placeholder={"Choose a size of output"}
                showArrow
                showSearch={true}
                defaultValue={state.size}
                style={{width: 220}}
                onChange={(v) => {
                  setState({size: v})
                }}
                options={[
                  {
                    label: "1024x1024",
                    value: "1024x1024"
                  },
                  {
                    label: "512x512",
                    value: "512x512"
                  },
                  {
                    label: "256x256",
                    value: "256x256"
                  }
                ]}
              />

              <Button
                loading={state.isLoad}
                type={"primary"}
                onClick={getOutcomesImageByPrompt}>
                Get Outcomes
              </Button>
            </Space>
          </Col>

          {state.outcomes && (
            <Col xs={24}>
              <Image.PreviewGroup
                preview={{
                  //@ts-ignore
                  onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                }}
              >
                {state.outcomes?.images?.map((i: any, ind: number) => {
                  return (
                    <Image
                      key={`image_${ind}_${i.url}`}
                      width={200}
                      src={i.url}
                    />
                  )
                })}
              </Image.PreviewGroup>
            </Col>
          )}


          <Col xs={24}>
            <TextArea
              placeholder={"Input your prompt to receive outcome"}
              rows={4} onChange={(e) => setState({prompt_chat: e.target.value})}/>
          </Col>

          <Col xs={24}>
            <Button
              loading={state.isLoadText}
              type={"primary"}
              onClick={getOutcomesChatByPrompt}>
              Get Outcomes
            </Button>
          </Col>

          {state.outcomeText && (
            <Col xs={24}>
              <TextArea
                value={state.outcomeText}
                rows={8}/>
            </Col>
          )}
        </Row>


      </div>
    </main>
  );
};

ExamplesFeature.propTypes = {};

export default ExamplesFeature;
