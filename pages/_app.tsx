import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from '../app/context/state';
import './../app/styles/globlal.css';
import Loader from './../app/components/loader';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const noLoad = ['/favorites', '/profile', '/login', '/signup'];

  useEffect(() => {
    const handleStart = (url) => {
      if (!noLoad.includes(url)) setLoading(true);
    };

    const handleComplete = (url) => {
      if (url == '/') {
        setTimeout(function () {
          return setLoading(false);
        }, 100);
      } else {
        setLoading(false);
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return (
    <Provider>
      {/* <Loader/> */}
      {loading ? <Loader /> : <Component {...pageProps} />}
    </Provider>
  );
}
