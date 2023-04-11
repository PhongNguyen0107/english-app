import {callApi} from "@/services/callApi";
import {ENDPOINT_API} from "@/services/EndpointApi";
import {convertUrlParamToEndpoint} from "@/shared/utils";
import {WordReviewPropType} from "@/services/AppInterface";
import {collection, getDocs, query, where} from "firebase/firestore";
import {DB_NAME} from "@/configuration/firebase.constant";
import {db} from "@/configuration/firebase.config";

export const getWords = () => {
  let endpoint = ENDPOINT_API.WORDS
  return callApi(endpoint, "GET", null);
}

export const getWordById = (wordId: string) => {
  let endpoint = convertUrlParamToEndpoint(ENDPOINT_API.WORD_BY_ID, wordId);
  return callApi(endpoint, 'GET', null);
}

export const saveWordByUserId = (userId: string, word: WordReviewPropType) => {
  const endpoint = convertUrlParamToEndpoint(ENDPOINT_API.SAVE_WORD_BY_UID, userId);
  return callApi(endpoint, "POST", {word});
}

export const getListOfWordsSavedByUId = async (userId: string) => {
  let words: any[] = []
  const querySnapshot = await getDocs(query(collection(db, DB_NAME.WORD_SAVE), where("userId", "==" , userId)))
  querySnapshot.forEach(item => {
    let data = item.data()
    words.push({
      docId: item.id,
      ...data.word
    })
  })
  return words;
}