'use client';
import React from 'react';
import WordCard from "@/components/card/WordCard";
import {Col, Row} from "antd";

export default function Page() {
  return (
    <div className="page">
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12}>
          <WordCard
            word={"BOOK"}
            meaning={"Đặt chổ"}
            description={"to arrange to have something at a certain time"}
            meme={"https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"}
            phrase={"Book a table = đặt bàn"}
            sentences={[
              "He book a table at a sushi restaurant",
              "Anh ấy đặt bàn tại một nhà hàng sushi",
            ]}
          />
        </Col>
        
        <Col xs={24} md={12}>
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
  )
}
