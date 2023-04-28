import axios, {AxiosError, AxiosResponse} from 'axios';
import {v4 as uuidv4} from "uuid";
import {get} from "lodash";
import {APP} from "@/configuration/Application.config";

export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "access-control-request-origin": "*",
  "Access-Control-Allow-Origin": "*"
};

type ApiResponse<T> = {
  status: number;
  data: T;
  error?: string;
};

async function callApi(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any): Promise<ApiResponse<any>> {
  try {
    const access_token = "updating..."
    const url = APP.HOST_API + '/v1/' + endpoint;
    const response: AxiosResponse<any> = await axios({
      url,
      headers: {
        ...headers,
        Authorization: 'Bearer ' + access_token,
        "x-request-id": uuidv4()
      },
      method,
      data,
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      status: 500,
      data: null,
      error: get(axiosError, "response.data.message") || axiosError.message,
    };
  }
}


export const callApiExternal = (url: string, method: string, body: any) => {
  return axios({
    url,
    method: method ? method : "GET",
    headers: {
      ...headers,
      "origin": "http://localhost"
      // "X-Client-Id": "JS-2NPRQuLtWo6TS1nHnet6ARJo2iO",
      // "X-Client-Access-Token": "2NPRQwf19998zjeRusO3R1VLqt9",
    },
    data: body,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}



export const callApiOpenAI = (url: string, method: string, body: any) => {
  return axios({
    url,
    method: method ? method : "GET",
    headers: {
      ...headers,
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_AI_KEY
    },
    data: body,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}


export {callApi}
