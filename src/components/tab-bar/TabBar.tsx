'use client';
import React, {useEffect, useState} from 'react';
import {Badge} from 'antd-mobile';
import {File, Gear, House, Student} from "phosphor-react"
import {ROUTE_NAME} from "@/configuration/Application.config";
import Link from "next/link";

type TabBarPropType = {
  active: string;
}
const TabBarCustomization = (props: TabBarPropType) => {
  const tabs = [
    {
      key: 'home',
      title: 'Home',
      url: '/',
      icon: <House size={32}/>,
      badge: Badge.dot,
    },
    {
      key: ROUTE_NAME.WORDS,
      title: 'words',
      url: `/${ROUTE_NAME.WORDS}`,
      icon: <File size={32}/>,
      badge: '5',
    },
    {
      key: ROUTE_NAME.SENTENCES,
      title: 'Sentences',
      url: `/${ROUTE_NAME.SENTENCES}`,
      icon: <Student size={32}/>,
      badge: '1',
    },
    {
      key: ROUTE_NAME.REVIEW,
      title: 'Review',
      url: `/${ROUTE_NAME.REVIEW}`,
      icon: <Student size={32}/>,
      badge: '1',
    },
    {
      key: ROUTE_NAME.SETTINGS,
      url: `/${ROUTE_NAME.SETTINGS}`,
      title: 'Settings',
      icon: <Gear size={32}/>,
    },
  ]

  const [activeKey, setActiveKey] = useState(props.active)

  useEffect(() => {
    setActiveKey(activeKey)
  }, [props.active])

  return (
    <div className={"en-tab-bar"}>

      <div className={"tab-bar-container"}>
        {tabs.map(item => (
          <React.Fragment key={item.key}>
            <Link
              onClick={() => setActiveKey(item.key)}
              href={item.url}>
              <div className={`tab-menu-item ${item.key === activeKey && "active"}`}>
                {item.icon}
                <div className={"tab-menu-title"}>{item.title}</div>
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TabBarCustomization;
