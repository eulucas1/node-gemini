import { iniciaModelo } from './modelo.js';
import { fazerPergunta } from './pergunta.js';

const model = await iniciaModelo("gemini-1.5-pro-latest");

export async function perguntar() {
  const prompt = await fazerPergunta("Me faça uma pergunta sobre qualquer produto: ");

  const parts = [
    {text: "Você é um chatbot assistente de compras. Sua função é auxiliar os usuários a encontrar produtos, comparar preços e qualidades, e fornecer informações detalhadas sobre marcas e características dos produtos.." },
    {text: `input: ${prompt}`},
    {text: "output: "},
  ];

  const requisicao = (
    {contents: [{ role: "user", parts }]}
  );
  
  const result = await model.generateContent(requisicao);
  
  const totalTokensEntrada = await model.countTokens(requisicao);
  console.log(`\nTotal tokens de entrada:  ${totalTokensEntrada.totalTokens}\n`)
  
  const response = await result.response;
  const text = response.text();
  console.log(text);

  const totalTokensSaida = await model.countTokens(text);
  console.log(`\nTotal tokens de saída:  ${totalTokensSaida.totalTokens}\n`)
  
}