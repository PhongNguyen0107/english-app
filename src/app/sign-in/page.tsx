"use client"
import React from 'react';
import GoogleSignInProvider from "@/components/GoogleSignInProvider";
import {useRouter} from "next/navigation";
import {ROUTE_NAME} from "@/configuration/Application.config";

type IProps = {}
const GoogleSignIn = (props: IProps) => {
  const router = useRouter()
  const onLoginHandle = (user: any, token: string) => {
    if(token && user ){
      return router.push(ROUTE_NAME.REVIEW)
    }
  }

  return (
    <div className={"page"}>
      <GoogleSignInProvider onLogin={onLoginHandle}/>
    </div>
  );
};

GoogleSignIn.propTypes = {};

export default GoogleSignIn;