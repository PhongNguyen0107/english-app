'use client';
import React from "react";
import {QueryClient, QueryClientProvider} from 'react-query';
import {Analytics} from '@vercel/analytics/react';
import './globals.css'
import '@/shared/styles/navbar.style.scss'
import "@/app/review/Review.style.scss"
import {Roboto} from '@next/font/google';
import Script from "next/script";

const roboto = Roboto({
  // Specifying weight is only required for non-variable fonts.
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const queryClient = new QueryClient();

type RootLayoutPropType = {
  children: React.ReactNode
}

export default function RootLayout(props: RootLayoutPropType) {
  return (
    <html lang="en" className={roboto.className}>
    <QueryClientProvider client={queryClient}>
      <body>
        {props.children}
        <Script id={"posthog-tracking"}>
          {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('phc_WQ7XNt8tDGm44UUFqQEMPA969vG2bFd4Ou2wt8CYIP8',{api_host:'https://app.posthog.com'})`}
        </Script>
        <Analytics/>
      </body>
    </QueryClientProvider>
    </html>
  )
}
