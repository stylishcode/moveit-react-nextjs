import { createContext, useState, ReactNode } from "react";
import challenges from "../../challenges.json"; /* Array de objetos */

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
}

interface ChallengesProviderProps {
  /* Aceita qualquer elemento filho como children: componentes, textos, tag HTML... etc */
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children } : ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2); /* Calculo usado para RPG's, procurado na internet */

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
  /* floor porque ele pode retornar numeros quebrados */
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length); 
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider 
      value={ { 
        level, 
        currentExperience,
        experienceToNextLevel,
        challengesCompleted, 
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge
      }}
    >
      { children }
    </ChallengesContext.Provider>
  )
}
