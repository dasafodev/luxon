import React from 'react';
import { useAppContext } from 'app/context/state';
import NavBar from '@components/navbar';
import styles from '../../../app/styles/index.module.css';
import stylesTable from '../standings/standings.module.css';
import TableBody from '@components/table_body';
import Row from '@components/row';

const Scorers = () => {
  const { scorers, positions } = useAppContext();
  const rows = [];
  let count = 0;

  return (
    <React.Fragment>
      <NavBar />
      <section className={styles.main}>
        <div className={stylesTable.container}>
          {scorers.map((item) => {
            const emblem = positions.filter((position) => position.team.id === item.team.id);
            rows.push(
              <Row
                goalsTable={true}
                key={item.player.id}
                position={(count = count + 1)}
                crestURI={emblem[0].team.crestUrl}
                teamName={item.player.name}
                points={item.numberOfGoals}
              />,
            );
          })}
        </div>
        <TableBody goalsTable>{rows}</TableBody>
      </section>
    </React.Fragment>
  );
};

export default Scorers;
