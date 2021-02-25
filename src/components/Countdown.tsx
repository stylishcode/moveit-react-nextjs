import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Countdown.module.css";

/* variável de tipagem global para saber que é um tipo Timeout, é opcional */
let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60); /* 25 * 60 é 25min em segundos */
  const [isActive, setIsActive] = useState(false); /* Verifica se o contador está parado ou em execução */
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  /* ConverterEmString.verificaSeTem2CharSenaoColocaUm0aEsquerda.SeparaOsCharEmArray */
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    /* impede que o setTimeOut execute mais uma vez mesmo depois de ser parado */
    clearTimeout(countdownTimeout);
    setIsActive(true);
  }

  function resetCountdown() {
    setIsActive(false);
    setTime(25 * 60); /* Volta ao valor inicial do useState */
  }

  /* useEffect é uma função para disparar efeitos colaterais, ou seja, quando algo mudar ou algo acontecer
    eu quero executar alguma função, eu quero disparar algum efeito colateral
    1º parâmetro: sempre uma função
    2º parâmetro: quando que a função deve ser executada, que é passada dentro de um array, chamado array de
    dependências do useEffect
  */

  useEffect(() => {
    if (isActive && time > 0) { /* Se contador ativo e o tempo for maior que 0*/
      countdownTimeout = setTimeout(() => { /* De 1 (1000ms) em 1 (1000ms) segundo, diminuir time em 1 */
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true); /* Finalizou o tempo */
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]) /* isActive faz a função executar uma vez, time faz a função executar enquanto o if for verdade*/

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{ minuteLeft }</span>
          <span>{ minuteRight }</span>
        </div>

        <span>:</span>
        <div>

          <span>{ secondLeft }</span>
          <span>{ secondRight }</span>
        </div>
      </div>

      {/* Botão desabilitado que mostrar que o ciclo encerrou caso hasFinished for true */}
      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
          onClick={resetCountdown}
        >
          Ciclo encerrado
        </button>
      ) : (
        <> {/*Elemento vazio, não aparece no html na página, serve para resolver o problema do react 
            que pede para englobar essa parte do código*/}
          {/* Muda o botão dependendo do isActive */}
          { isActive ? (
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