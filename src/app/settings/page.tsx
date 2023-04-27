'use client';
import React from "react";
import {Row, Col, Card} from 'antd';
import TabBar from "@/components/tab-bar/TabBar";
import {ROUTE_NAME} from "@/configuration/Application.config";
import Link from "next/link";
import MenuBar from "@/components/MenuBar";

const menu = [
  {
    id: 'login',
    path: ROUTE_NAME.SIGN_IN,
    title: "Sign In"
  },
  {
    id: 'words',
    path: ROUTE_NAME.WORDS,
    title: "List of words"
  },
  {
    id: 'reviews',
    path: ROUTE_NAME.REVIEW,
    title: "Review"
  },
  {
    id: 'sentences',
    path: ROUTE_NAME.SENTENCES,
    title: "Sentences"
  },
]

const Settings = () => {

  return (
    <main className="page">
      <MenuBar/>
      <div className="page-body">
        <Row gutter={[12, 24]}>
          {menu.map(item => {
            return (
              <Col key={item.id} xs={24}>
                <Link href={`/${item.path}`}>
                  <Card
                    style={{
                      width: "100%",
                      cursor: "pointer"
                    }}>
                    <h2>{item.title}</h2>
                  </Card>
                </Link>
              </Col>
            )
          })}
        </Row>

      </div>
      <TabBar active={ROUTE_NAME.SETTINGS}/>
    </main>
  )
}

export default Settings;
