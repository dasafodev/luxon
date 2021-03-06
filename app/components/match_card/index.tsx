import Image from "next/image";
import React from "react";
import styles from "./match_card.module.css";

const dislikeIcon = "/images/icons/dislike.png"
const likeIcon = "/images/icons/like.png"

const MatchCard = ({
  hour,
  competition,
  homeTeamImageUrl,
  homeTeamName,
  awayTeamImageUrl,
  awayTeamName,
  status,
  like
}) => {
  return (
    <div className={styles.card}>
        <div className={styles.like_icon}>
        <Image 
            src={like?likeIcon:dislikeIcon} alt="Like icon" width={24} height={24} 
        />
        </div>
        
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
