// 'use client';
import TabBar from "@/components/tab-bar/TabBar";
import {ROUTE_NAME} from "@/configuration/Application.config";

export default function Settings() {
  return (
    <main className="page">
      <div className="page-body">
      
      </div>
      <TabBar active={ROUTE_NAME.SETTINGS}/>
    </main>
  )
}
