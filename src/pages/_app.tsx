import '../styles/global.css';

import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';
 
function MyApp({ Component, pageProps }) {
  return (
    /* 
      Todos os elementos dentro do Provider aos dados daquele contexto
      Ou seja, como o app é algo que ficar por volta de toda a aplicação, quer dizer que toda a aplicação vai ter acesso
      aos dados do ChallengesContext
     */
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp
