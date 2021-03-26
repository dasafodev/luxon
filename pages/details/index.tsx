import Footer from '@components/footer';
import Head from 'next/head';
import Navbar from '@components/navbar';
import MatchDetails from '@components/match_details_layout';
import React from 'react';
import styles from './details.module.css';

const Details = () => {
  return (
    <div className={styles.details}>
      <Head>
        <title>Luxxon - Detalles</title>
      </Head>
      <Navbar />
      <MatchDetails />
      <Footer />
    </div>
  );
};

export default Details;
