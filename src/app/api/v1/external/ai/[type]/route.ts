import {callApiOpenAI} from "@/services/callApi";
import {APP} from "@/configuration/Application.config";
import {OPEN_AI_ENDPOINT_API} from "@/services/EndpointApi";
import logger from "@/services/Logger.service";
import {PracticeConfigPayloadType} from "@/services/AppInterface";
import {get} from "lodash";

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

    case "practices":
      endpoint = OPEN_AI_ENDPOINT_API.CHAT_COMPLETIONS
      const respEn = await callApiOpenAI(openAIHost + endpoint, "POST", getPayloadGenerate(getPromptByConfigs(body)))
      logger.info("OpenAI EN response: with status %s", respEn.status)
      response.en = get(respEn, "data.choices[0].message.content", null)

      const viPrompt = `Vui lòng tạo dịch nội dung sau sang tiếng Việt Nam: "${response.en}"`
      const respVi = await callApiOpenAI(openAIHost + endpoint, "POST", getPayloadGenerate(viPrompt))
      logger.info("OpenAI VI response: with status %s", respVi.status)
      response.vi = get(respVi, "data.choices[0].message.content", null)

      const grammarPrompt = `Please provide me with common sentence patterns (add a Vietnamese translation below each sentence), the grammars that exist in the following passage: "${response.en}".`
      const respGrammar = await callApiOpenAI(openAIHost + endpoint, "POST", getPayloadGenerate(grammarPrompt))
      logger.info("OpenAI Grammar response: with status %s", respGrammar.status)
      response.grammar = get(respGrammar, "data.choices[0].message.content", null)


      response.status = 200;

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
  const prompt = `Please generate a ${configs.genreOfOutput} using the following list of words: [${configs.words.join(", ")}]. The purpose of this is to learn English and improve my grammar. Please ensure that the result includes common sentence structures and grammar rules.`;
  logger.info("Prompt: %s", prompt)
  return prompt
}
