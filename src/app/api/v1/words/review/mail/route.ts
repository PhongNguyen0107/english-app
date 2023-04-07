import {WordReviewPropType} from "@/services/AppInterface";
import {callApiExternal} from "@/services/callApi";
import moment from "moment";
import {sampleSize} from "lodash";

/**
 * - input 46 then result is: "00046"
 * - input 146 then result is: "00146"
 * - input 3242 then result is: "03242"
 * - input 4 then result is: "00004"
 * @param number
 * @param length
 * @returns {string}
 */
export const padWithZeros = (number: number, length: number) => {
  let str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

export async function POST(request: Request) {
  const wordData = require("data/vocabularies.vi.json");
  const sortData = wordData.sort((a: WordReviewPropType, b: WordReviewPropType) => a.unitId - b.unitId)
  const responseData = {
    data: sortData
  }

  const random = sampleSize(sortData, 10)
  const template: {[key: string]: string} = {
    "today": moment().format("DD.MM.YYYY hh:mm"),
    "message": "Content message",
    "from_name": "English Review App",
    "to_name": "My Boss",
    "reply_to": "nlphong0107@gmail.com"
  }
  random.forEach((w, i) => {
    const enKey = "en_" + padWithZeros(i + 1, 2);
    template[enKey] = w.answers[0]

    const viKey = "vi_" + padWithZeros(i + 1, 2);
    template[viKey] = w.word

    const phraseKey = "ph_" + padWithZeros(i + 1, 2);
    template[phraseKey] = w.phrases[0]

    const sentenceKey = "se_" + padWithZeros(i + 1, 2);
    template[sentenceKey] = w.sentences[0]

  })

  const mailPayload = {
    "service_id": "service_luljs9w",
    "template_id": "template_h7gi7hr" || "template_lmquy6e",
    "user_id": "jg1tOUpH_GKznJrGo",
    "template_params": template
  };

  const endpoint = "https://api.emailjs.com/api/v1.0/email/send"
  const resp = await callApiExternal(endpoint, "POST", mailPayload)
  console.log('log::25  status & mailPayload: ',resp.status ,  mailPayload)
  return new Response(JSON.stringify(responseData))
}