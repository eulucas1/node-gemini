import { fazerPergunta } from './pergunta.js';
import { perguntar } from './perguntaLivre.js';
import { pedirSugestao } from './sugestaoProdutos.js';
import { analisaImagem } from './analisaImagem.js';
import { analisaArquivoAvaliacao } from './analisaAvaliacoes.js';

async function principal() {
  const escolha = await fazerPergunta(`Escolha uma das opções abaixo: \n
  1. Fazer uma pergunta livre sobre um produto;
  2. Sugestão de produtos por categorias;
  3. Ver informações com base em uma imagem;
  4. Fazer a análise de sentimentos baseado em arquivo texto
  \nOpção desejada: `);

  if (escolha === '1') {
    await perguntar();
  } else if (escolha === '2') {
    await pedirSugestao();
  } else if (escolha === '3') {
    const imagem = await fazerPergunta("\nMe informe o caminho completo e nome da imagem: ")
    await analisaImagem(imagem);
  } else if (escolha === '4') {
    await analisaArquivoAvaliacao();
  } else {
    console.log('Escolha inválida.');
  }
}

principal();

