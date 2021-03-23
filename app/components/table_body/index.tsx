import React from 'react';
import styles from '../../../pages/competition/standings/standings.module.css';

const TableBody = (props) => {
  return (
    <table className={styles.standings}>
      <tbody>
        <tr className={styles.tableHead}>
          <td className={styles.teamPosition}>#</td>
          {props.goalsTable ? <td className={styles.teamName}>Goleador</td> : <td className={styles.teamName}>Team</td>}
          {props.goalsTable ? <td></td> : <td title='Matches played'>MP</td>}
          {props.goalsTable ? <td></td> : <td title='Wins'>W</td>}
          {props.goalsTable ? <td></td> : <td title='Draws'>D</td>}
          {props.goalsTable ? <td></td> : <td title='Losses'>L</td>}
          {props.goalsTable ? <td></td> : <td title='Goals for'>GF</td>}
          {props.goalsTable ? <td></td> : <td title='Goals against'>GA</td>}
          {props.goalsTable ? <td></td> : <td title='Goals difference'>GD</td>}
          {props.goalsTable ? <td title='Team points'>Goles</td> : <td title='Team points'>Pts</td>}
        </tr>
        {props.children}
      </tbody>
    </table>
  );
};

export default TableBody;
