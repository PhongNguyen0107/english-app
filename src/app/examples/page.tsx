'use client'
import React from 'react';
import MenuBar from "@/components/MenuBar";
import {Col, Input, Row, Space, Button, InputNumber, Select, Image, Spin} from "antd";
import {getImageCreationByConfig} from "@/services/Practices.service";
import {useSetState} from "ahooks";

type IProps = {}
type IState = {
  prompt: string;
  numberOfImages: number;
  size: string;
  outcomes: any;
  isLoad: boolean;
}
const {TextArea} = Input
const ExamplesFeature = (props: IProps) => {
  const [state, setState] = useSetState<IState>({
    numberOfImages: 3,
    prompt: "",
    size: "",
    outcomes: null,
    isLoad: false
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
  return (
    <main className="page">
      <title>Example features implemented here to before release | Study english</title>
      <MenuBar/>
      <div className={"page-body"}>
        <Row gutter={[24, 24]}>
          {(state.isLoad) && <Col xs={24} className={"f-center"}><Spin/></Col>}

          <Col xs={24}>
            <TextArea
              placeholder={"Input your prompt"}
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
        </Row>
      </div>
    </main>
  );
};

ExamplesFeature.propTypes = {};

export default ExamplesFeature;
