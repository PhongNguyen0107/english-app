import {ArgsProps} from "antd/es/message/interface";

export const nError = (m: string): ArgsProps => {
  return {
    type: "error",
    content: m
  }
}

export const nSuccess = (m: string): ArgsProps => {
  return {
    type: "success",
    content: m
  }
}