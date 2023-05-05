import {ENDPOINT_API} from "@/services/EndpointApi";
import {callApi} from "@/services/callApi";

export const getWordReview = () => {
  let endpoint = ENDPOINT_API.WORDS_REVIEW
  return callApi(endpoint, "GET", null);
}

export const getTop10WordReview = () => {
  let endpoint = ENDPOINT_API.TOP_10_WORDS_REVIEW
  return callApi(endpoint, "GET", null);
}

/**
 * - input 46 then result is: "00046"
 * - input 146 then result is: "00146"
 * - input 3242 then result is: "03242"
 * - input 4 then result is: "00004"
 * @param number
 * @param length
 * @returns {string}
 */
export const padWithZeros = (number: number | string, length: number) => {
  let str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}
