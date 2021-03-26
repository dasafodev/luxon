import React from 'react';
//import stylesTable from '../standings/standings.module.css';
import TableBody from '@components/table_body';
import stylesScorers from './scorers.module.css';
import Row from '@components/row';

const Scorers = ({ scorers, positions }) => {
  // const { scorers, positions } = useAppContext();
  const rows = [];
  let count = 0;

  return (
    <React.Fragment>
      {/* <NavBar /> */}
      {/* <section className={styles.main}> */}
      <div className={stylesScorers.container}>
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
              PlayedGames={null}
              wins={null}
              draws={null}
              losses={null}
              goalsFor={null}
              goalsAgainst={null}
              goalDifference={null}
            />,
          );
        })}
      </div>
      <div className={stylesScorers.container}>
        <TableBody goalsTable>{rows}</TableBody>
      </div>
      {/* </section> */}
    </React.Fragment>
  );
};

export default Scorers;
