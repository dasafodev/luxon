import React, { useState } from 'react';
import Navbar from '@components/navbar';
import Footer from '@components/footer';
import '../../firebase/client';
import styles from './live.module.css';

import useDimensions from '../../app/hooks/useDimensions';
import { Jutsu } from 'react-jutsu';

const Live = (): JSX.Element => {
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [call, setCall] = useState(false);
  const [password, setPassword] = useState('');
  const { width } = useDimensions();

  const handleClick = (event) => {
    event.preventDefault();
    if (room && name) setCall(true);
  };

  return (
    <React.Fragment>
      <Navbar />
      <main className={styles.main}>
        <h2 className={styles.title}>¡Todos unidos por un equipo!</h2>
        <section className={styles.content}>
          {width >= 768 ? (
            <div className={styles.stream}>
              {call ? (
                <Jutsu
                  containerStyles={{ width: '500px', height: '800px' }}
                  roomName={room}
                  displayName={name}
                  password={password}
                  onMeetingEnd={() => console.warn('Meeting has ended')}
                  loadingComponent={<p>loading ...</p>}
                  errorComponent={<p>Oops, something went wrong</p>}
                />
              ) : (
                <form>
                  <input
                    id='room'
                    type='text'
                    placeholder='Room'
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                  <input
                    id='name'
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    id='password'
                    type='text'
                    placeholder='Password (optional)'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button onClick={handleClick} type='submit'>
                    Start / Join
                  </button>
                </form>
              )}
              {/* <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/Y-NeVAOkMlI'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe> */}
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
