import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  /* ConverterEmString.verificaSeTem2CharSenaoColocaUm0aEsquerda.SeparaOsCharEmArray */
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {/* Botão desabilitado que mostrar que o ciclo encerrou caso hasFinished for true */}
      {hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
          onClick={resetCountdown}
        >
          Ciclo encerrado
        </button>
      ) : (
        <>
          {" "}
          {/*Elemento vazio, não aparece no html na página, serve para resolver o problema do react 
            que pede para englobar essa parte do código*/}
          {/* Muda o botão dependendo do isActive */}
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
