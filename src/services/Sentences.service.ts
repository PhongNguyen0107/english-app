import {ENDPOINT_API} from "@/services/EndpointApi";
import {callApi} from "@/services/callApi";

export const getSentences = () => {
  let endpoint = ENDPOINT_API.SENTENCES
  return callApi(endpoint, "GET", null);
}
