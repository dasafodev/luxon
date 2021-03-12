import React from 'react';
import Navbar from '@components/navbar';
import Footer from '@components/footer';
import '../../firebase/client';
import styles from './live.module.css';

import useDimensions from '../../app/hooks/useDimensions';

const Live = (): JSX.Element => {
  const { width } = useDimensions();

  return (
    <React.Fragment>
      <Navbar />
      <main className={styles.main}>
        <h2 className={styles.title}>¡Todos unidos por un equipo!</h2>
        <section className={styles.content}>
          {width >= 768 ? (
            <div className={styles.stream}>
              <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/Y-NeVAOkMlI'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
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
