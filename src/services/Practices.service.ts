import {callApi} from "@/services/callApi";
import {convertUrlParamToEndpoint} from "@/shared/utils";
import {ENDPOINT_API} from "@/services/EndpointApi";
import {PracticeConfigPayloadType} from "@/services/AppInterface";

export const getListOfWordRandomBySize = (size: number) => {
  let endpoint = convertUrlParamToEndpoint(ENDPOINT_API.WORDS_RANDOM_BY_SIZE, `${size}`);
  return callApi(endpoint, 'GET', null);
}

export const getOutcomesEnToPractice = (payload: PracticeConfigPayloadType) => {
  return callApi(ENDPOINT_API.OUTCOME_EN_PRACTICES, 'POST', payload);
}

export const getOutcomesViToPractice = (payload: PracticeConfigPayloadType) => {
  return callApi(ENDPOINT_API.OUTCOME_VI_PRACTICES, 'POST', payload);
}


export const getOutcomesGrammarToPractice = (payload: PracticeConfigPayloadType) => {
  return callApi(ENDPOINT_API.GET_GRAMMAR_PRACTICES_BY_EN, 'POST', payload);
}
