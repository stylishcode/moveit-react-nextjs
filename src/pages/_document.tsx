/* Essa página serve para colocar tudo o que se repete nas páginas e ela só carrega uma vez na aplicação*/
/* Cabeçalhos, Rodapés, Menus laterais.... coisas que se repetem em todas as páginas de uma aplicação */
/* Esse _document é parecido com o public/index.html que o react sem o next.js usa */

import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return(
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
        </Head>

        <body>
          <Main />
          {/* Alguns scripts que o next.js injeta automaticamente na aplicação */}
          <NextScript />
        </body>
      </Html>
    );
  }
}