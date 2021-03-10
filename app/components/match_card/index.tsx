import Image from 'next/image';
import React from 'react';
import styles from './match_card.module.css';
import { useAppActions, useAppContext } from 'app/context/state';
import firebase, { currentUser } from '@fire-client';
import 'firebase/firestore';
import axios from 'axios';

const dislikeIcon = '/images/icons/dislike.png';
const likeIcon = '/images/icons/like.png';

const createEvent = (homeTeamName, awayTeamName, fullHour) => {
  const url = window.location.hostname == 'localhost' ? 'http://localhost:3000' : `https://${window.location.hostname}`;
  axios({
    url: `${url}/api/calendar`, //your url
    method: 'POST',
    responseType: 'blob', // important
    data: {
      start: fullHour,
      title: `${homeTeamName} vs ${awayTeamName}`,
    },
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'calendar.ics'); //or any other extension
    document.body.appendChild(link);
    link.click();
  });
};

const MatchCard = ({
  id,
  hour,
  fullHour,
  competition,
  homeTeamImageUrl,
  homeTeamName,
  awayTeamImageUrl,
  awayTeamName,
  status,
}) => {
  const { favorites } = useAppContext();
  const { addMatchToFavorites, deleteMatchToFavorites } = useAppActions();

  return (
    <div className={styles.card}>
      <button
        className={styles.like_icon}
        onClick={() => {
          clickInHeart(
            favorites,
            id,
            homeTeamName,
            awayTeamName,
            fullHour,
            addMatchToFavorites,
            hour,
            competition,
            homeTeamImageUrl,
            awayTeamImageUrl,
            status,
            deleteMatchToFavorites,
          );
        }}
      >
        {favorites.some((match) => match.id == id) ? (
          <img src={likeIcon} alt='Filled heart' />
        ) : (
          <img src={dislikeIcon} alt='Unfilled heart' />
        )}
      </button>

      <div className={styles.info_container}>
        <p className='bold'>{hour}</p>
        <p className={styles.competition}>{competition}</p>
      </div>
      <div className={styles.teams_container}>
        <Team imageUrl={homeTeamImageUrl} name={homeTeamName} />
        <p>VS</p>
        <Team imageUrl={awayTeamImageUrl} name={awayTeamName} />
      </div>
      <p className={styles.competition}>{status}</p>
    </div>
  );
};

export default MatchCard;

const Team = ({ imageUrl, name }) => {
  return (
    <div className={styles.team_item}>
      <div className={styles.logo_container}>
        <Image src={imageUrl} alt='Team Logo' width={50} height={50} />
      </div>
      <p className={styles.team_name}>{name}</p>
    </div>
  );
};

function clickInHeart(
  favorites: any,
  id: any,
  homeTeamName: any,
  awayTeamName: any,
  fullHour: any,
  addMatchToFavorites: any,
  hour: any,
  competition: any,
  homeTeamImageUrl: any,
  awayTeamImageUrl: any,
  status: any,
  deleteMatchToFavorites: any,
) {
  if (!favorites.some((match) => match.id == id)) {
    const user: firebase.User = currentUser();
    const db = firebase.firestore();
    db.collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        console.warn(doc.data());
        const favoritesMatches = doc.data()['favorite'];
        console.warn(favoritesMatches);
        db.collection('users')
          .doc(user.uid)
          .set({
            favorite: [...(favoritesMatches as Array<number>), id],
          })
          .then(() => console.warn('ID Guardado'));
      });

    createEvent(homeTeamName, awayTeamName, fullHour);
    addMatchToFavorites({
      id,
      hour,
      competition,
      homeTeamImageUrl,
      homeTeamName,
      awayTeamImageUrl,
      awayTeamName,
      status,
    });
  } else {
    deleteMatchToFavorites(id);
  }
}
