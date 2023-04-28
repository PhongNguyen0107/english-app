'use client';
import React from 'react';
import WordCard from "@/components/card/WordCard";
import {Col, Row} from "antd";
import TabBar from "@/components/tab-bar/TabBar";
import {ROUTE_NAME} from "@/configuration/Application.config";
import {useQuery} from "react-query";
import {getWordById} from "@/services/Words.service";
import MenuBar from "@/components/MenuBar";

type WordType = {
  [key: string]: any;
}
export default function Page({params}: any) {
  const {data: dataWordDetail} = useQuery('word_by_id', () => getWordById(params.id));
  const word = dataWordDetail?.data?.data || []
  return (
    <div className="page">
      <title>Detail of {word.word} | Study english</title>
      <MenuBar/>
      <div className={"page-body"}>
        <Row gutter={[12, 12]}>

          <Col key={word.id} xs={24}>
            <WordCard
              word={word.word}
              meaning={word.meaning}
              description={"to arrange to have something at a certain time"}
              meme={"https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"}
              phrase={"Book a table = đặt bàn"}
              sentences={[
                "He book a table at a sushi restaurant",
                "Anh ấy đặt bàn tại một nhà hàng sushi",
              ]}
            />
          </Col>


        </Row>
      </div>

      <TabBar active={ROUTE_NAME.WORDS}/>
    </div>
  )
}
