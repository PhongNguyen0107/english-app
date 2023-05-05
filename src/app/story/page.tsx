'use client';
import React from 'react';
import {Affix, Col, Image, Row, Select, Space, Spin} from "antd";
import {padWithZeros} from "@/services/Review.service";
import {useSetState} from "ahooks";
import {getListOfUnit, Unit} from "@/services/English.service";
import MenuBar from "@/components/MenuBar";

type IProps = {}
type IState = {
  [key: string]: any
}
const StoryPage = (_: IProps) => {

  const [state, setState] = useSetState<IState>({
    loading: false,
    unit: 0,
    units: getListOfUnit(),
  })

  const onChangeUnit = (v: number) => {
    let filter = [];
    if (v === 0) filter = getListOfUnit();

    else filter = getListOfUnit().filter((x: Unit) => x.value === v)

    return setState({
      unit: v,
      units: filter
    })
  }

  return (
    <div className="page">
      <title>Story English via words group by unit every days | Study english</title>
      <MenuBar/>
      <div className={"page-body"}>
        <Row gutter={[36, 36]}>
          <Affix offsetTop={24} className={"fw"}>
            <Col xs={24} className={"fw"}>
              <Space size={12} wrap={true}>

                <Select
                  defaultValue={state.unit}
                  style={{width: 220}}
                  onChange={(v) => onChangeUnit(v)}
                  options={getListOfUnit()}
                />

              </Space>
            </Col>

          </Affix>

          {state.loading && <Col xs={24} className={"f-center"}><Spin/></Col>}

          {state.units && (
            <Col xs={24}>
              <Image.PreviewGroup
                preview={{
                  //@ts-ignore
                  onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                }}
              >
                <Row gutter={[12, 12]}>
                  {state.units.map((u: Unit) => {
                    if (u.value === 0) return <React.Fragment key={u.value}/>
                    return [1, 2, 3].map((i: any, ind: number) => {
                      const unitId = `U${padWithZeros(u.value, 2)}_${padWithZeros(ind + 1, 2)}`
                      return (
                        <Col key={`image_${ind}_${i.url}`} xs={24} md={12} lg={8} xl={6} xxl={4}>
                          <Image
                            width={"100%"}
                            src={`/story/${unitId}.jpeg`}
                            alt={`Unit ${padWithZeros(state.unit, 2)} image ${ind + 1}`}/>
                        </Col>

                      )
                    })
                  })}
                </Row>
              </Image.PreviewGroup>
            </Col>
          )}
        </Row>

      </div>

    </div>

  );
};


export default StoryPage;
