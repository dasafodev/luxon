import React from 'react'
import styles from "./button.module.css"

const Button = ({children, secondary=false}) => {

    return (
        <button className={`${styles.button} ${(secondary)&&styles.secondary}`}>
            {children}
        </button>
    )
}

export default Button
