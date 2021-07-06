import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from '../lib/gtag';

export const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('Changing to: ', url);
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};
