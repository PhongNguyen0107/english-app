'use client'
import React, {useRef} from 'react';
import {QuestionType} from "@/services/AppInterface";
import {Button, Space, Swiper, Toast} from 'antd-mobile'
import {SwiperRef} from 'antd-mobile/es/components/swiper'

type QuestionCardPropType = {
  questions: QuestionType[]
}
const QuestionCard = (props: QuestionCardPropType) => {
  const {questions} = props
  const ref = useRef<SwiperRef>(null)
  if (questions?.length === 0) return <React.Fragment/>
  return (
    <div style={{height: 'calc(100vh - 50px)'}}>
      <Space direction='vertical' block>
        <Swiper allowTouchMove={false} ref={ref} loop>
          {questions.map((q, index) => (
            <Swiper.Item key={index}>
              <div
                style={{
                  height: "calc(100vh - 200px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  Toast.show(`Swiper ${index + 1}`)
                }}
              >
                {q.sentence}
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
        <Space justify={"between"} style={{width: "100%"}}>
          <Button
            onClick={() => {
              ref.current?.swipePrev()
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              ref.current?.swipeNext()
            }}
          >
            Next
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default QuestionCard;
