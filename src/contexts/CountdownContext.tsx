import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinished: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

/* variável de tipagem global para saber que é um tipo Timeout, é opcional */
let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: ChallengesProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60); /* 25 * 60 é 25min em segundos */
  /* Verifica se o contador está parado ou em execução */
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    /* impede que o setTimeOut execute mais uma vez mesmo depois de ser parado */
    clearTimeout(countdownTimeout);
    setIsActive(true);
  }

  function resetCountdown() {
    setIsActive(false);
    setHasFinished(false);
    setTime(25 * 60); /* Volta ao valor inicial do useState */
  }

  /* useEffect é uma função para disparar efeitos colaterais, ou seja, 
    quando algo mudar ou algo acontecer, eu quero executar alguma função, 
    eu quero disparar algum efeito colateral
    1º parâmetro: sempre uma função
    2º parâmetro: quando que a função deve ser executada, 
    que é passada dentro de um array, chamado array de dependências do useEffect
  */
  useEffect(() => {
    if (isActive && time > 0) {
      /* Se contador ativo e o tempo for maior que 0*/
      countdownTimeout = setTimeout(() => {
        /* De 1 (1000ms) em 1 (1000ms) segundo, diminuir time em 1 */
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true); /* Finalizou o tempo */
      setIsActive(false);
      startNewChallenge();
    }
  }, [
    isActive,
    time,
  ]); /* 
        isActive faz a função executar uma vez, time faz a função executar, 
        enquanto o if for verdade
      */

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
