import { iniciaModelo } from './modelo.js';
import { fazerPergunta } from './pergunta.js';

const model = await iniciaModelo("gemini-1.5-flash");

export async function pedirSugestao() {
  const categorias = await fazerPergunta("Para sugestões de produtos me forneça duas categorias: ");

  const parts = [
    {text: "Você é um chatbot assistente de compras. Sua função é auxiliar os usuários a encontrar produtos, comparar preços e qualidades, e fornecer informações detalhadas sobre marcas e características dos produtos.\n\nAo ser perguntado sobre categorias de produtos, responda com uma lista de marcadores contendo apenas as categorias solicitadas no momento da pergunta. Aqui estão as principais categorias de produtos: Eletrônicos, Eletrodomésticos, Moda, Acessórios, Beleza, Móveis, Decoração,Esporte e Lazer, Livros, Brinquedos, Jogos, Alimentos, Automotivo, Ferramentas.\n\nCaso seja perguntado algo que não seja relacionado a produtos em geral, informe que não pode responder a respeito.\n\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter apenas as categorias que forem solicitadas no momento da pergunta. Analise as categorias e sempre forneça dois produtos distintos.\n\nA saída deve sempre conter algumas das opções: marcas, lojas, sites, etc., relacionado às categorias ou diretamente o produto e preço médio do produto.\n\nForneça um feedback de outros clientes sobre o consumo desse produto.\nModelo de saida\n\nProduto A\n\nMarca: Marca X\nPreço: R$ (em média)\nLoja: Lojas, marcas ou sites\nFeedback: \"Ótima duração de bateria e desempenho rápido.\"\nProduto B\n\nMarca: Marca W\nPreço: R$ (em média)\nLoja: Lojas, marcas ou sites\nFeedback: \"Excelente câmera e tela de alta qualidade.\""},
    {text: "input: Beleza e Móveis."},
    {text: "output: ## Beleza\n\n* **Produto A:**  Kit de Maquiagem Completo\n    * Marca:  MAC\n    * Preço: R$ 500,00 (em média)\n    * Loja: Sephora, MAC Store\n    * Feedback: \"Amo essa marca! As sombras são pigmentadas e a base cobre muito bem.\"\n\n* **Produto B:** Perfume Feminino\n    * Marca: Chanel\n    * Preço: R$ 400,00 (em média)\n    * Loja: Renner, lojas de departamento\n    * Feedback: \"Aroma delicioso e marcante, dura bastante na pele.\"\n\n## Móveis\n\n* **Produto A:**  Sofá Retrátil \n    * Marca:  Etna\n    * Preço: R$ 2.000,00 (em média)\n    * Loja: Etna, Tok&Stok\n    * Feedback: \"Confortável e espaçoso, perfeito para assistir filmes.\"\n\n* **Produto B:** Mesa de Jantar em Madeira Maciça\n    * Marca:  Madeira & Design\n    * Preço: R$ 3.000,00 (em média)\n    * Loja:  Lojas de móveis, sites especializados\n    * Feedback: \"Linda e resistente, um móvel para toda a vida.\""},
    {text: `input: quero produtos relacionados a ${categorias}`},
    {text: "output: "},
  ];

  
  const result = await model.generateContent(
    {contents: [{ role: "user", parts }]}
  );
  const response = await result.response;
  const text = response.text();
  console.log(text);
}