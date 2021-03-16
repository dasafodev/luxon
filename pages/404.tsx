import styles from '../app/styles/404.module.css';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        404 - Opps! la página que buscas esta fuera de lugar! <br />
        <a href='/'>Continua agendando tus partidos preferidos </a>
      </h1>
    </div>
  );
}
