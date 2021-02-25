import React from 'react'
import styles from "./match_card.module.css";
const MatchCard = ({hour}) => {
    return (
        <div className={styles.card} >
            <p className="bold">{hour}</p>
            Card Works
        </div>
    )
}

export default MatchCard
