import styles from "../styles/components/Profile.module.css";

export function Profile() {
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/matheus3t.png" alt="Matheus Enrique"/>
      <div>
        <strong>Matheus Enrique</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  );
}