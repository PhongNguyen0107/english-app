'use client';
import React, {useEffect, useState} from 'react';
import {Badge, TabBar} from 'antd-mobile';
import {File, Gear, House, Student} from "phosphor-react"
import {useRouter} from 'next/navigation'
import {ROUTE_NAME} from "@/configuration/Application.config";

type TabBarPropType = {
  active: string;
}
const TabBarCustomization = (props: TabBarPropType) => {
  const router = useRouter()
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
      key: ROUTE_NAME.LEARNING,
      title: 'Learning',
      url: `/${ROUTE_NAME.LEARNING}`,
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
    <div>
      <TabBar activeKey={activeKey} onChange={(keyActive) => {
        setActiveKey(keyActive)
        const menu = tabs.find(x => x.key === keyActive);
        if (menu) router.push(menu.url)
      }}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
        ))}
      </TabBar>
    </div>
  );
};

export default TabBarCustomization;
