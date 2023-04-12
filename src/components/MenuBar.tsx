'use client';
import React from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/configuration/firebase.config";
import {get} from "lodash";
import {Avatar, Popover} from "antd";

type IProps = {}
const MenuBar = (props: IProps) => {
  const [user] = useAuthState(auth);

  if (!user?.email) return <React.Fragment/>
  return (
    <div className={"page-head"}>
      <div className={"en-nav-bar"}>
        <div></div>

        <Popover
          content={(
            <div className={"profile-wrapper"}>
              Sign-out
            </div>
          )}
          title={get(user, "displayName", user?.email || "")}
        >

          {/*@ts-ignore*/}
          <Avatar src={<img src={get(user, "photoURL", "")} alt="avatar"/>}/>
        </Popover>

      </div>
    </div>
  );
};

MenuBar.propTypes = {};

export default MenuBar;