import { Inngest } from "inngest";
import {callApiExternal} from "@/services/callApi";
import { serve } from "inngest/next";

const inngest = new Inngest({ name: "English Study"});
const ENDPOINT = "https://english-app-sigma.vercel.app/api/v1/words/review/mail"
const sendEmailEveryDayFunction =  inngest.createFunction(
  { name: "Top 10 words to review every day" },
  { cron: "TZ=Asia/Ho_Chi_Minh */5 * * * *" },
  async ({ event }) => {
    const res = await callApiExternal(ENDPOINT, "POST", null)
    return {
      success: res.status === 200,
    };
  }
);

// Create an API that hosts zero functions
export default serve(inngest, [sendEmailEveryDayFunction]);