import {callApi} from "@/services/callApi";
import {ENDPOINT_API} from "@/services/EndpointApi";
import {convertUrlParamToEndpoint} from "@/shared/utils";
import {WordReviewPropType} from "@/services/AppInterface";

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