'use client';
import React from 'react';
import {useRouter} from "next/navigation";
import {useQuery} from "react-query";
import {Col, Row} from "antd";
import {WordReviewPropType} from "@/services/AppInterface";
import {QUERY_CONFIG, ROUTE_NAME} from "@/configuration/Application.config";
import TabBar from "@/components/tab-bar/TabBar";
import {getWordReview} from "@/services/Review.service";
import ReviewWordCard from "@/components/card/ReviewWordCard";

type IProps = {

}
const ReviewPage = (props: IProps) => {
  const router = useRouter()
  // @ts-ignore
  const {data: wordsResp, isLoading, error} = useQuery('words/review', getWordReview, QUERY_CONFIG);
  const words = wordsResp?.data?.data || []
  return (
    <div className="page">
      <div className={"page-body"}>
        <Row gutter={[36, 36]}>
          {words.map((w: WordReviewPropType) => {
            return (
              <Col key={w.id} xs={24} md={12} lg={10} xl={8} xxl={6}>
                <ReviewWordCard word={w} />
              </Col>
            )
          })}
      
        </Row>
      </div>
    
      <TabBar active={ROUTE_NAME.WORDS}/>
    </div>
  );
};


export default ReviewPage;
