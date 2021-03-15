import React from 'react';
import styles from '../../../pages/competition/standings/standings.module.css';

const Row = ({
  position,
  crestURI,
  teamName,
  PlayedGames,
  wins,
  draws,
  losses,
  goalsFor,
  goalsAgainst,
  goalDifference,
  points,
  goalsTable,
}) => {
  return (
    <tr>
      <td className={styles.teamPosition}>{position}</td>
      <td className={styles.teamName}>
        <div className={styles.crest}>
          <img src={crestURI} alt='' />
        </div>
        <span>{teamName}</span>
      </td>
      {goalsTable ? <td></td> : <td>{PlayedGames}</td>}
      {goalsTable ? <td></td> : <td>{wins}</td>}
      {goalsTable ? <td></td> : <td>{draws}</td>}
      {goalsTable ? <td></td> : <td>{losses}</td>}
      {goalsTable ? <td></td> : <td>{goalsFor}</td>}
      {goalsTable ? <td></td> : <td>{goalsAgainst}</td>}
      {goalsTable ? <td></td> : <td>{goalDifference}</td>}
      <td className={styles.teamPoints}>{points}</td>
    </tr>
  );
};

export default Row;
