import {callApi} from "@/services/callApi";
import {ENDPOINT_API} from "@/services/EndpointApi";
import {convertUrlParamToEndpoint} from "@/shared/utils";

export const getWords = () => {
  let endpoint = ENDPOINT_API.WORDS
  return callApi(endpoint, "GET", null);
}

export const getWordById = (wordId: string) => {
  let endpoint = convertUrlParamToEndpoint(ENDPOINT_API.WORD_BY_ID, wordId);
  return callApi(endpoint, 'GET', null);
}
