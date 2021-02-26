import '../styles/global.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';
 
function MyApp({ Component, pageProps }) {
  return (
    /* 
      Todos os elementos dentro do Provider aos dados daquele contexto
      Ou seja, como o app é algo que ficar por volta de toda a aplicação, quer dizer que toda a aplicação vai ter acesso
      aos dados do ChallengesContext
     */
    <ChallengesProvider>
      {/* A ordem de englobação depende de qual componente depende de qual, no caso Countdown depende de Challenges, 
      então ele vai depois. Comentei o Countdown aqui porque não preciso que todos os componentes saibam dele, apenas o componente
      que vai precisar, então englobei a section que precisa dele no index.tsx */}
      {/* <CountdownProvider>  */}
        <Component {...pageProps} />
      {/* </CountdownProvider> */}
    </ChallengesProvider>
  )
}

export default MyApp
