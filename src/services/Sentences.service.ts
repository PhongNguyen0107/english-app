import {ENDPOINT_API} from "@/services/EndpointApi";
import {callApi} from "@/services/callApi";
import {SentenceType} from "@/services/AppInterface";

export const getSentences = () => {
  let endpoint = ENDPOINT_API.SENTENCES
  return callApi(endpoint, "GET", null);
}


export const getTop10SentencesReview = () => {
  let endpoint = ENDPOINT_API.TOP_NUM_SENTENCES_REVIEW
  return callApi(endpoint, "POST", {num: 10});
}

export const increaseSentence = (sentence: SentenceType) => {
  let endpoint = ENDPOINT_API.SENTENCES
  return callApi(endpoint, "PUT", sentence)
}
