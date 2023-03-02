import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import logger from "@/services/Logger.service";

// https://github.com/nextauthjs/next-auth/issues/5647
export async function GET(request: Request, {params}: any) {
  const wordData = require("data/words.en.json");
  logger.info("Call api: %s %s", request.method, request.url)
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const language = cookieStore.get('language');
  const response = NextResponse.next();
  response.cookies.set('language', `${language}`);
  
  const wordId = params.id;
  const word = wordData.find((w: any) => w.id === wordId);
  const responseData = {
    data: word
  }
  return new Response(JSON.stringify(responseData))
}
