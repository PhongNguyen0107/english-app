import logger from "@/services/Logger.service";
import {sampleSize} from "lodash";

export async function GET(request: Request, {params}: any) {
  const wordData = require("data/vocabularies.vi.json");

  const size = params.size || 5;
  const random = sampleSize(wordData, size)
  //@ts-ignore
  logger.info("%s words random is %o", size, random.map((x) => x.answers[0]))
  return new Response(JSON.stringify(random))
}
