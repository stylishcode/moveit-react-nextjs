import { useState, useEffect } from "react";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
  const [time, setTime] = useState(25 * 60); /* 25 * 60 é 25min em segundos */
  const [active, setActive] = useState(false); /* Verifica se o contador está parado ou em execução */

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  /* ConverterEmString.verificaSeTem2CharSenaoColocaUm0aEsquerda.SeparaOsCharEmArray */
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setActive(true);
  }

  /* useEffect é uma função para disparar efeitos colaterais, ou seja, quando algo mudar ou algo acontecer
    eu quero executar alguma função, eu quero disparar algum efeito colateral
    1º parâmetro: sempre uma função
    2º parâmetro: quando que a função deve ser executada, que é passada dentro de um array, chamado array de
    dependências do useEffect
  */

  useEffect(() => {
    if (active && time > 0) { /* Se contador ativo e o tempo for maior que 0*/
      setTimeout(() => { /* De 1 (1000ms) em 1 (1000ms) segundo, diminuir time em 1 */
        setTime(time - 1);
      }, 1000);
    }
  }, [active, time]) /* active faz a função executar uma vez, time faz a função executar enquanto o if for verdade*/

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

      <button 
        type="button" 
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </div>
  );
}