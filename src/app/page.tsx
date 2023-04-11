'use client';
import React, {useEffect} from "react";
import TabBar from "@/components/tab-bar/TabBar";
import {Col, Row} from "antd";
import WordCard from "@/components/card/WordCard";
import {ROUTE_NAME} from "@/configuration/Application.config";
import {getListOfWordsSavedByUId} from "@/services/Words.service";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/configuration/firebase.config";
import MenuBar from "@/components/MenuBar";
import {useSetState} from "ahooks";
import {WordReviewPropType} from "@/services/AppInterface";
import ReviewWordCard from "@/components/card/ReviewWordCard";

type IState = {
  listOfWordSaved: any [];
  isShowAnswer: boolean;
  isShowPhrase: boolean;
  active: any;
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
    strategy: "VIETNAMESE",
    isShowAnswer: false,
    isShowPhrase: false,
    isShowSentence: false,
    search: "",
    unit: 0
  })

  useEffect(() => {
    user && user?.email && getListOfWordsSavedByUId(user.email).then(words => {
      setState({listOfWordSaved: words})
    })

  }, [user?.email])

  return (
    <main className="page">
      <div className={"page-head"}>
        <MenuBar/>
      </div>
      <div className={"page-body"}>
        <Row gutter={[12, 12]}>
          <Col xs={24} md={12} lg={10} xl={8} xxl={6}>
            <WordCard
              word={"BOOK"}
              meaning={"Sách"}
              description={"to arrange to have something at a certain time"}
              phrase={"Buy a book = mua một quyển sách"}
              meme={"https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"}
              sentences={[
                "He book a table at a sushi restaurant",
                "Anh ấy đặt bàn tại một nhà hàng sushi",
              ]}
            />
          </Col>
          <Col xs={24} md={12} lg={10} xl={8} xxl={6}>
            <WordCard
              word={"BOOK"}
              meaning={"Sách"}
              description={"to arrange to have something at a certain time"}
              phrase={"Buy a book = mua một quyển sách"}
              meme={"https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"}
              sentences={[
                "He book a table at a sushi restaurant",
                "Anh ấy đặt bàn tại một nhà hàng sushi",
              ]}
            />
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
        </Row>
      </div>

      <TabBar active={ROUTE_NAME.HOME}/>
    </main>
  )
}