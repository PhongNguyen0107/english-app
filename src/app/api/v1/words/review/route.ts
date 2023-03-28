import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
  const wordData = require("data/vocabularies.vi.json");
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const language = cookieStore.get('language');
  const response = NextResponse.next();
  response.cookies.set('language', `${language}`);
  const responseData = {
    data: wordData
  }
  return new Response(JSON.stringify(responseData))
}
