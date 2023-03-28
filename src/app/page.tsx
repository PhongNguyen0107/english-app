'use client';
import React from "react";
import TabBar from "@/components/tab-bar/TabBar";
import {Col, Row} from "antd";
import WordCard from "@/components/card/WordCard";
import {ROUTE_NAME} from "@/configuration/Application.config";

export default function Home() {
  return (
    <main className="page">
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
        </Row>
      </div>
      
      <TabBar active={ROUTE_NAME.HOME}/>
    </main>
  )
}
