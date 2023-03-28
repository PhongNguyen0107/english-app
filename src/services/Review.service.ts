import {ENDPOINT_API} from "@/services/EndpointApi";
import {callApi} from "@/services/callApi";

export const getWordReview = () => {
  let endpoint = ENDPOINT_API.WORDS_REVIEW
  return callApi(endpoint, "GET", null);
}
