import Image from "next/image";
import React from "react";
import styles from "./match_card.module.css";
import { useAppActions, useAppContext } from "app/context/state";

const dislikeIcon = "/images/icons/dislike.png";
const likeIcon = "/images/icons/like.png";

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
