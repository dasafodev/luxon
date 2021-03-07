import Image from "next/image";
import React from "react";
import styles from "./match_card.module.css";
import { useAppActions, useAppContext } from "app/context/state";
import axios from "axios";

const dislikeIcon = "/images/icons/dislike.png";
const likeIcon = "/images/icons/like.png";

const createEvent = (homeTeamName,awayTeamName, fullHour) => {
  console.log('homeTeamName :>> ', homeTeamName);
  console.log('awayTeamName :>> ', awayTeamName);
  console.log('fullHour :>> ', fullHour);
  // window.fetch('/api/calendar')
  axios({
    url: 'http://localhost:3000/api/calendar', //your url
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
     const url = window.URL.createObjectURL(new Blob([response.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', 'file.pdf'); //or any other extension
     document.body.appendChild(link);
     link.click();
  });
  // axios.post('http://localhost:3000/api/calendar',
  // { 
  //   "start":fullHour,
  //   "title":`${homeTeamName} vs ${awayTeamName}`
  //  },)
  // .then(console.log)
}


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
  const { addMatchToFavorites } = useAppActions();

  return (
    <div className={styles.card}>
      <button
        className={styles.like_icon}
        onClick={() => {
          if (!favorites.some((match) => match.id == id)) {
            createEvent(homeTeamName,awayTeamName,fullHour)
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
            // TODO: Remove from List
            console.log("TODO: Remove match from favorites.");
          }
        }}
      >
        {favorites.some((match) => match.id == id) ? (
          <img src={likeIcon} alt="Filled heart" />
        ) : (
          <img src={dislikeIcon} alt="Unfilled heart" />
        )}
      </button>

      <div className={styles.info_container}>
        <p className="bold">{hour}</p>
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
        <Image src={imageUrl} alt="Team Logo" width={50} height={50} />
      </div>
      <p className={styles.team_name}>{name}</p>
    </div>
  );
};
