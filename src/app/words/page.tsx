'use client';
import React from 'react';
import WordCard from "@/components/card/WordCard";
import {Col, Row} from "antd";
import TabBar from "@/components/tab-bar/TabBar";
import {ROUTE_NAME} from "@/configuration/Application.config";
import {useQuery} from "react-query";
import {getWords} from "@/services/Words.service";
import {useRouter} from "next/navigation";
import {WordType} from "@/services/AppInterface";

export default function Page() {
  const router = useRouter()
  const {data: wordsResp, isLoading, error} = useQuery('words', getWords);
  const words = wordsResp?.data?.data || []
  return (
    <div className="page">
      <div className={"page-body"}>
        <Row gutter={[12, 12]}>
          {words.map((w: WordType) => {
            return (
              <Col key={w.id} xs={24} md={12} xl={10} xxl={8}>
                <WordCard
                  onClick={() => router.push(`/${ROUTE_NAME.WORDS}/${w.id}`)}
                  word={w.word}
                  meaning={w.meaning}
                  description={"to arrange to have something at a certain time"}
                  meme={"https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"}
                  phrase={"Book a table = đặt bàn"}
                  sentences={[
                    "He book a table at a sushi restaurant",
                    "Anh ấy đặt bàn tại một nhà hàng sushi",
                  ]}
                />
              </Col>
            )
          })}
        
        </Row>
      </div>
  
      <TabBar active={ROUTE_NAME.WORDS}/>
    </div>
  )
}
