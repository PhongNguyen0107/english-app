'use client';
import React from "react";
import TabBar from "@/components/tab-bar/TabBar";
import {ROUTE_NAME} from "@/configuration/Application.config";
import {useQuery} from "react-query";
import {getWords} from "@/services/Words.service";
import QuestionCard from "@/components/card/QuestionCard";

export default function Learning() {
  const {data: wordsResp, isLoading, error} = useQuery('words', getWords);
  const words = wordsResp?.data?.data?.[0] || {}
  if (isLoading) return <React.Fragment/>
  return (
    <main className="page">
      <div className="page-body">
        <QuestionCard questions={words.question}/>
      </div>
      <TabBar active={ROUTE_NAME.LEARNING}/>
    </main>
  )
}
