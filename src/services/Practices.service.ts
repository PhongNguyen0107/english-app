import {callApi} from "@/services/callApi";
import {convertUrlParamToEndpoint} from "@/shared/utils";
import {ENDPOINT_API} from "@/services/EndpointApi";
import {ImageGenerateConfigType, PracticeConfigPayloadType} from "@/services/AppInterface";

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

export const getOutcomesHomonymsToPractice = (payload: PracticeConfigPayloadType) => {
  return callApi(ENDPOINT_API.GET_HOMONYMS_PRACTICES_BY_EN, 'POST', payload);
}

export const sendAnEmailReportOutcomes = (payload: PracticeConfigPayloadType) => {
  return callApi(ENDPOINT_API.SEND_AN_EMAIL_OUTCOME_PRACTICES, 'POST', payload);
}

export const getImageCreationByConfig = (payload: ImageGenerateConfigType) => {
  return callApi(ENDPOINT_API.IMAGES_GENERATIONS, 'POST', payload);
}
