import React from 'react';
// import { useAppContext } from 'app/context/state';
import TableBody from '@components/table_body';
import Row from '@components/row';
import stylesTable from './standings.module.css';

const Standings = ({ positions }) => {
  // const { positions } = useAppContext();
  const rows = [];

  return (
    <React.Fragment>
      <div className={stylesTable.container}>
        {positions.map((item) => {
          rows.push(
            <Row
              goalsTable={false}
              key={item.position}
              position={item.position}
              crestURI={item.team.crestUrl}
              teamName={item.team.name}
              PlayedGames={item.playedGames}
              wins={item.won}
              draws={item.draw}
              losses={item.lost}
              goalsFor={item.goalsFor}
              goalsAgainst={item.goalsAgainst}
              goalDifference={item.goalDifference}
              points={item.points}
            />,
          );
        })}
        <TableBody goalsTable={false}>{rows}</TableBody>
      </div>
    </React.Fragment>
  );
};

export default Standings;
