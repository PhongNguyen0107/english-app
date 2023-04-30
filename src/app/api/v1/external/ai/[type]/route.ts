import {callApiExternal, callApiOpenAI} from "@/services/callApi";
import {APP} from "@/configuration/Application.config";
import {OPEN_AI_ENDPOINT_API} from "@/services/EndpointApi";
import logger from "@/services/Logger.service";
import {PracticeConfigPayloadType} from "@/services/AppInterface";
import {get} from "lodash";
import moment from "moment";

export async function POST(request: Request, {params}: any) {
  const type = params.type
  const body = await request.json();

  const openAIHost = APP.OPEN_AI_HOST + "/v1/"
  let endpoint = ""

  const response = {
    status: 500,
    en: null,
    vi: null,
    grammar: null,
    words: null,
    meta: null,
    type: type,
    message: null
  }

  switch (type) {
    case "edits":
      endpoint = OPEN_AI_ENDPOINT_API.EDITS
      break;

    case "images":
      endpoint = OPEN_AI_ENDPOINT_API.IMAGES_GENERATIONS
      break;

    case "homonyms":
      endpoint = OPEN_AI_ENDPOINT_API.CHAT_COMPLETIONS
      const homonymsPromptTest = `Give me the list of English words that are formed by replacing one "character" in "word" while keeping the position and the character of the remaining characters correct, along with their Vietnamese translations. The result is a list of words which distinct value. 
An example: 
Input: word is "cave", character is "v"
Output: [cage, cate, cave, cafe, ...]
Now, you can list out help me for the input: word is "Help" and character is "l". (add vietnamese translation next to the english)
`
      const homonymsPrompt = `Give me the list of homonyms English words  of "${body.word}" (add vietnamese translation next to the english)
`
      const respHomonym = await callApiOpenAI(openAIHost + endpoint, "POST", getPayloadGenerate(homonymsPrompt))
      logger.info("OpenAI Homonyms response: with status %s", respHomonym.status)
      response.words = get(respHomonym, "data.choices[0].message.content", null)

      logger.info("OpenAI Homonyms prompt: %s", homonymsPrompt)
      logger.info("OpenAI Homonyms outcomes: %s", response.words)
      response.status = 200;
      break;

    case "grammar":
      endpoint = OPEN_AI_ENDPOINT_API.CHAT_COMPLETIONS
      const grammarPrompt = `Please provide me with common sentence patterns (add a Vietnamese translation below each sentence), the grammars that exist in the following passage: "${body.en}".`
      const respGrammar = await callApiOpenAI(openAIHost + endpoint, "POST", getPayloadGenerate(grammarPrompt))
      logger.info("OpenAI Grammar response: with status %s", respGrammar.status)
      response.grammar = get(respGrammar, "data.choices[0].message.content", null)
      response.status = 200;
      break

    case "practices_en":
      endpoint = OPEN_AI_ENDPOINT_API.CHAT_COMPLETIONS
      const respEn = await callApiOpenAI(openAIHost + endpoint, "POST", getPayloadGenerate(getPromptByConfigs(body)))
      logger.info("OpenAI EN response: with status %s", respEn.status)
      response.en = get(respEn, "data.choices[0].message.content", null)

      response.status = 200;

      break;

    case "practices_vi":
      endpoint = OPEN_AI_ENDPOINT_API.CHAT_COMPLETIONS

      const viPrompt = `Vui lòng tạo dịch nội dung sau sang tiếng Việt Nam: "${body.en}"`
      const respVi = await callApiOpenAI(openAIHost + endpoint, "POST", getPayloadGenerate(viPrompt))
      logger.info("OpenAI VI response: with status %s", respVi.status)
      response.vi = get(respVi, "data.choices[0].message.content", null)

      response.status = 200;

      break;


    case "send_email":
      const mailPayload = {
        "service_id": "service_luljs9w",
        "template_id": "template_lmquy6e",
        "user_id": "jg1tOUpH_GKznJrGo",
        "template_params": {
          "today": moment().format("DD.MM.YYYY hh:mm"),
          "prompt": getPromptByConfigs(body),
          "subject": `Please generate a ${body.genreOfOutput} using the following list of words: [${body.words.join(", ")}]`,
          "en": body.en,
          "vi": body.vi,
          "grammar": body.grammar,
          "from_name": "English Review App",
          "to_name": "My Friend",
          "reply_to": "nguyenlephong1997@gmail.com"
        }
      };

      const endpointEmail = "https://api.emailjs.com/api/v1.0/email/send"
      const respEmail = await callApiExternal(endpointEmail, "POST", mailPayload)
      console.log("Send mail status: ", respEmail.status)
      response.status = respEmail.status;

      break;
    default:
      if (!endpoint) return new Response(JSON.stringify({code: 404, message: "Tôi không hiểu yêu cầu này của bạn!!!"}))

  }

  // logger.info("Content: %s", response.en)
  return new Response(
    response.status === 200 ?
      JSON.stringify(response) :
      JSON.stringify({
        code: response.status,
        message: response.message
      }))
}

export const getPayloadGenerate = (prompt: string) => {
  return {
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "user",
        "content": prompt
      }
    ]
  }
}

export const getPromptByConfigs = (configs: PracticeConfigPayloadType) => {
  const prompt = `Please generate a ${configs.genreOfOutput} using the following list of words: [${configs?.words?.join(", ")}]. The purpose of this is to learn English and improve my grammar. Please ensure that the result includes common sentence structures and grammar rules.`;
  logger.info("Prompt: %s", prompt)
  return prompt
}
