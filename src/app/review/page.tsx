'use client';
import React, {useEffect} from 'react';
import {useQuery} from "react-query";
import {Affix, Button, Col, Input, Row, Space, Select, message, Spin} from "antd";
import {WordReviewPropType} from "@/services/AppInterface";
import {QUERY_CONFIG, ROUTE_NAME} from "@/configuration/Application.config";
import TabBar from "@/components/tab-bar/TabBar";
import {getWordReview} from "@/services/Review.service";
import ReviewWordCard from "@/components/card/ReviewWordCard";
import {useSetState} from "ahooks";
import {InstantSearch} from "react-instantsearch-hooks-web";
import {ALGOLIA_SEARCH_CONFIG, searchClient} from "@/configuration/algolia-search-config";
import AlgoliaAutocomplete from "@/components/AlgoliaAutocomplete";
import Fuse from 'fuse.js'
import {getListOfUnit} from "@/services/English.service";
import {auth} from "@/configuration/firebase.config";
import {useAuthState} from "react-firebase-hooks/auth";
import MenuBar from "@/components/MenuBar";
import {saveWordByUserId} from "@/services/Words.service";
import {nError, nSuccess} from "@/services/Errors.service";

const {Search} = Input;
type IProps = {}
type IState = {
  isShowAnswer: boolean;
  isShowPhrase: boolean;
  active: any;
  strategy: string;
  search: string;
  unit: number;
  words: any[];
  isShowSentence: boolean;
}
const ReviewPage = (_: IProps) => {
  const [user] = useAuthState(auth)
  const [messageApi, contextHolder] = message.useMessage();
  const {data: wordsResp, isLoading} = useQuery('words/review', getWordReview, QUERY_CONFIG);
  const words = wordsResp?.data?.data || []

  const [reviewState, setReviewState] = useSetState<IState>({
    active: null,
    words: [],
    strategy: "VIETNAMESE",
    isShowAnswer: false,
    isShowPhrase: false,
    isShowSentence: false,
    search: "",
    unit: 0
  })

  useEffect(() => {
    setReviewState({words: words})
  }, [words]);

  const onSearchInput = (v: string) => {
    if (!v) setReviewState({search: v, words: words});
    else {
      const options = {
        includeScore: true,
        keys: [
          {name: 'unitId', getFn: (w: WordReviewPropType) => w.unitId.toString()},
          {name: 'word', getFn: (w: WordReviewPropType) => w.word},
          {name: 'phrases', getFn: (w: WordReviewPropType) => w.phrases},
          {name: 'answers', getFn: (w: WordReviewPropType) => w.answers},
          {name: 'sentences', getFn: (w: WordReviewPropType) => w.sentences},
        ],
        isCaseSensitive: false,
        shouldSort: true,
        includeMatches: false,
        findAllMatches: false,
        minMatchCharLength: 1,
        location: 0,
        threshold: 0.6,
        distance: 100,
        useExtendedSearch: false,
        ignoreLocation: false,
        ignoreFieldNorm: false,
        fieldNormWeight: 1,
        // keys: ['word', "phrases", "answers", 'sentences', 'unitId']
      }
      //@ts-ignore
      const fuse = new Fuse(words, options)

      const results = fuse.search(v)
      const dataFilterUpdate: any[] = results.map(res => {
        // @ts-ignore
        return {...res.item}
      })
      setReviewState({
        words: dataFilterUpdate,
        search: v
      })
    }
  }

  const onChangeUnit = (v: number) => {
    let filter = [];
    if (v === 0) filter = words;

    else filter = words.filter((x: WordReviewPropType) => x.unitId === v)

    return setReviewState({
      unit: v,
      words: filter
    })
  }

  const onSaveWord = (w: WordReviewPropType) => {
    if (!user?.email) return messageApi.open(nError('You need to sign-in before using this function!'));

    saveWordByUserId(user?.email, w).then((resp) => {
      //@ts-ignore
      if (resp?.status !== 200) return messageApi.open(nError('Something was wrong!'));
      return messageApi.open(nSuccess(`The "${w.word}" word saved!`))
    })
  }

  return (
    <div className="page">
      {contextHolder}
      <title>Review English via words group by unit every days | Study english</title>
      <MenuBar/>
      <div className={"page-body"}>
        <Row gutter={[36, 36]}>
          <Affix offsetTop={24} className={"fw"}>
            <Col xs={24} className={"fw"}>
              <Space size={12} wrap={true}>
                <div className={"fw"}>
                  <Search
                    placeholder={"Search for whatever you want..."}
                    id={"search-word"}
                    value={reviewState.search}
                    //@ts-ignore
                    onChange={(e) => onSearchInput(e.target.value)}
                  />

                  {1 < 0 && (
                    <InstantSearch
                      indexName={ALGOLIA_SEARCH_CONFIG.REVIEW_INDEX_NAME}
                      searchClient={searchClient}
                    >
                      <AlgoliaAutocomplete
                        searchClient={searchClient}
                        placeholder="Search for whatever you want..."
                        detachedMediaQuery="none"
                        openOnFocus
                        className={"auto-complete-tools"}
                      />
                    </InstantSearch>)}
                </div>

                <Select
                  defaultValue={reviewState.unit}
                  style={{width: 220}}
                  onChange={(v) => onChangeUnit(v)}
                  options={getListOfUnit()}
                />

                <Button
                  type={"dashed"}
                  onClick={() => setReviewState({isShowAnswer: !reviewState.isShowAnswer})}>
                  {reviewState.isShowAnswer ? `Hide` : `Show`} Word
                </Button>

                <Button
                  type={"dashed"}
                  onClick={() => setReviewState({isShowPhrase: !reviewState.isShowPhrase})}>
                  {reviewState.isShowPhrase ? `Hide` : `Show`} Phrase
                </Button>

                <Button
                  type={"dashed"}
                  onClick={() => setReviewState({isShowSentence: !reviewState.isShowSentence})}>
                  {reviewState.isShowSentence ? `Hide` : `Show`} Sentence
                </Button>

                <Button
                  type={"primary"}
                  onClick={() => {
                    setReviewState({
                      strategy: reviewState.strategy === "ENGLISH" ? "VIETNAMESE" : "ENGLISH"
                    })
                  }}>
                  {reviewState.strategy === "ENGLISH" ? "VIETNAMESE" : "ENGLISH"}
                </Button>
              </Space>
            </Col>

          </Affix>

          {isLoading && <Col xs={24} className={"f-center"}><Spin/></Col>}
          {reviewState.words.map((w: WordReviewPropType, ind: number) => {
            return (
              <Col key={`${w.id}_${ind}`} xs={24} md={12} lg={10} xl={8} xxl={6}>
                <ReviewWordCard
                  strategy={reviewState.strategy}
                  onClick={() => setReviewState({active: w})}
                  active={reviewState.active}
                  isShowSentence={reviewState.isShowSentence}
                  isShowPhrase={reviewState.isShowPhrase}
                  onSaveWord={onSaveWord}
                  isShowAnswer={reviewState.isShowAnswer} word={w}/>
              </Col>
            )
          })}
        </Row>

      </div>

      <TabBar active={ROUTE_NAME.REVIEW}/>
    </div>

  );
};


export default ReviewPage;
