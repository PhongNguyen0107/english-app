'use client'
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {provider, auth} from "@/configuration/firebase.config";
import {Button, Result} from "antd";
import {LockKey} from "@phosphor-icons/react";
import {AppColors} from "@/shared/AppColors";

type IProps = {
  onLogin: (user: any, token: string) => void;
}
const GoogleSignInProvider = (props: IProps) => {

  // refs: https://firebase.google.com/docs/auth/web/google-signin
  const onSignInWithGGAccount = (e: any) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // @ts-ignore
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("log::19 signInWithPopup user", user, token);
        if (user && token) {
          // on redirect to homepage
          props.onLogin(user, token)
        }
      }).catch((error) => {
      // Handle Errors here.
      console.log("log::22 signInWithPopup: error case: ", error);
    });
  };

  return (
    <Result
      icon={<LockKey size={68} color={AppColors.green60}/>}
      title={(
        <div>
          <p>Now, to using all feature, you need to login to save data on your account.</p>
          <p>We using <strong>firebase service</strong> to storage data. Sure about security problem.</p>
          <p>Trust me ^.^!</p>
        </div>
      )}
      extra={(
        <Button
          onClick={onSignInWithGGAccount}
          style={{background: AppColors.green60}}
          type={"primary"}>
          Sign in with google
        </Button>
      )}
    />
  )
}

export default GoogleSignInProvider;