import React, { useEffect, useState } from 'react';
import Navbar from '@components/navbar';
import Footer from '@components/footer';
import { currentUser } from '@fire-client';
import 'firebase/auth';

import styles from './live.module.css';

import useDimensions from '../../app/hooks/useDimensions';
import { Jutsu } from 'react-jutsu';
import { useRouter } from 'next/router';

const Live = (): JSX.Element => {
  const router = useRouter();
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { width } = useDimensions();

  useEffect(() => {
    setName(currentUser()?.displayName);
    setRoom(router.query.id as string);
    setPassword(router.query.id as string);
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <main className={styles.main}>
        <h2 className={styles.title}>¡Todos unidos por un equipo!</h2>
        <section className={styles.content}>
          {width >= 768 ? (
            <div className={styles.stream}>
              <Jutsu
                containerStyles={{ width: '500px', height: '80vh' }}
                roomName={room}
                displayName={name}
                password={password}
                onMeetingEnd={() => console.warn('Meeting has ended')}
                loadingComponent={<p>loading ...</p>}
                errorComponent={<p>Oops, something went wrong</p>}
              />
            </div>
          ) : null}
          <div className={styles.chat}>
            <div className={styles.chat_conversation}></div>
            <div className={styles.chat_box}>
              <textarea />
              <button type='button' className={styles.chat_button}>
                Send
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </React.Fragment>
  );
};
export default Live;
