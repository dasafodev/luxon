import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '@components/navbar';
import Footer from '@components/footer';
import firebase, { currentUser } from '@fire-client';
import 'firebase/auth';

import styles from './live.module.css';

import useDimensions from '../../app/hooks/useDimensions';
import { Jutsu } from 'react-jutsu';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';

const Live = (): JSX.Element => {
  const db = firebase.firestore();

  const router = useRouter();

  const [room, setRoom] = useState('Test');
  // const [name, setName] = useState('');
  const [password, setPassword] = useState('Pass');
  const [showMeet, setShowMeet] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const { width } = useDimensions();

  useEffect(() => {
    setTimeout(() => setShowMeet(true), 1000);

    const unlisten = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.replace('/login');
      }
    });

    // setName(currentUser()?.displayName);
    if (router.query.id !== undefined) {
      setRoom(router.query.id as string);
      setPassword(router.query.id as string);

      db.collection('lives')
        .doc(`${router.query.id}`)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .onSnapshot(
          (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (!doc.metadata.hasPendingWrites) {
                setMessages((prevState) => [...prevState, { id: doc.id, ...doc.data() }]);
              }
            });
          },
          (error) => {
            console.error(error);
          },
        );
    }
    return () => {
      unlisten();
    };
  }, [router.query.id]);

  const handleChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = currentMessage.trim();
    if (trimmedMessage) {
      db.collection('lives').doc(`${router.query.id}`).collection('messages').add({
        text: trimmedMessage,
        author: currentUser()?.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setCurrentMessage('');
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Luxxon - Live</title>
      </Head>
      <Navbar />
      <main className={styles.main}>
        <h2 className={styles.title}>¡Todos unidos por un equipo!</h2>
        <section className={styles.content}>
          {width >= 768 ? (
            <div className={styles.stream}>
              {currentUser() != undefined && showMeet ? (
                <Jutsu
                  containerStyles={{ width: '100%', height: '70vh' }}
                  roomName={room}
                  displayName={currentUser().displayName}
                  password={password}
                  onMeetingEnd={() => console.warn('Meeting has ended')}
                  loadingComponent={<Skeleton width={'100%'} height={'80vh'} />}
                  errorComponent={<Skeleton width={'100%'} height={'80vh'} />}
                />
              ) : (
                <Skeleton width={'100%'} height={'80vh'} />
              )}
            </div>
          ) : null}
          <div className={styles.chat}>
            <div className={styles.chat_conversation}>
              <ul className={styles.chat_list}>
                {messages.map((message) => (
                  <li key={message.id}>
                    <p className={styles.chat_message}>
                      <span className={styles.chat_author}>{message.author}: </span>
                      {message.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.chat_box}>
              <form onSubmit={handleOnSubmit}>
                <textarea placeholder='Escribe tu mensaje...' value={currentMessage} onChange={handleChange} />
                <button type='submit' className={styles.chat_button}>
                  Send
                </button>
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </React.Fragment>
  );
};
export default Live;
