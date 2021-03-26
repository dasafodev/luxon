import React from 'react';
import styles from '@components/standings/standings.module.css';

const TableBody = (props) => {
  return (
    <table className={styles.standings}>
      <tbody>
        <tr className={styles.tableHead}>
          <td className={styles.teamPosition}>#</td>
          {props.goalsTable ? <td className={styles.teamName}>Goleador</td> : <td className={styles.teamName}>Club</td>}
          {props.goalsTable ? <td></td> : <td title='Matches played'>PJ</td>}
          {props.goalsTable ? <td></td> : <td title='Wins'>G</td>}
          {props.goalsTable ? <td></td> : <td title='Draws'>E</td>}
          {props.goalsTable ? <td></td> : <td title='Losses'>P</td>}
          {props.goalsTable ? <td></td> : <td title='Goals for'>GF</td>}
          {props.goalsTable ? <td></td> : <td title='Goals against'>GC</td>}
          {props.goalsTable ? <td></td> : <td title='Goals difference'>DG</td>}
          {props.goalsTable ? <td title='Team points'>Goles</td> : <td title='Team points'>Pts</td>}
        </tr>
        {props.children}
      </tbody>
    </table>
  );
};

export default TableBody;
