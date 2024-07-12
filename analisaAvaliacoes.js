import { iniciaModelo } from './modelo.js';
import { fazerPergunta } from './pergunta.js';
import { promises as fs} from "fs";

const model = await iniciaModelo("gemini-1.5-flash");

export async function analisaArquivoAvaliacao() {
  const arquivo = await fazerPergunta("\nMe informe o caminho e nome do arquivo: ");
  const dados = await fs.readFile(arquivo, 'utf8');

  const prompt = `Analise as opiniões descritas em sequência e resuma por favor os pontos positivos 
   e negativos citados pelos clientes sobre esses produtos. Depois categorize o percentual de respostas em satisfeito, 
   insatisfeitos ou neutros e a média das notas que classifica o produto como Péssimo (0 a 1 estrela), Ruim (1,1 a 2 estrelas), Médio (2,1 a 3 estrelas), Bom(3,1 a 4 estrelas) Ótimo (4,1 a 5 estrelas), colocando no seguinte formato por exemplo:  
   Satisfeitos: 20% - 20 respostas 
   Insatisfeitos: 50% - 50 respostas
   Neutros: 30% - 30 respostas 
   Média das notas: X
   O total de respostas deve coincidir com o total de opiniões lidas. 
   Opiniões: ${dados}`;

   const result = await model.generateContent(prompt);
   const response = await result.response;
   const text = response.text();
   console.log(text);
}