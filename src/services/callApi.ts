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
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      data: null,
      error: get(axiosError, "response.data.message") || axiosError.message,
    };
  }
}

export {callApi}
