const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const perguntar = mensagem => new Promise(resolve => {
  rl.question(mensagem, resposta => resolve(resposta.trim()));
});

async function lerAvaliacoes() {
  while (true) {
    const resposta = await perguntar(
      "Digite as avaliações separadas por vírgula [5, 8, 7, 10, 6, 9, 4]: "
    );
    if (resposta === "") return [5, 8, 7, 10, 6, 9, 4];

    const avaliacoes = resposta.split(",").map(valor => Number(valor.trim()));
    const saoValidas = avaliacoes.length > 0 && avaliacoes.every(nota => (
      Number.isFinite(nota) && nota >= 0 && nota <= 10
    ));

    if (saoValidas) return avaliacoes;
    console.log("Digite notas de 0 a 10 separadas por vírgula.");
  }
}

async function main() {
  console.log("\nQUESTÃO 6 - ANÁLISE DE AVALIAÇÕES\n");
  const avaliacoes = await lerAvaliacoes();
  let soma = 0;
  let negativas = 0;
  let regulares = 0;
  let positivas = 0;
  let maiorAvaliacao = avaliacoes[0];
  let menorAvaliacao = avaliacoes[0];

  console.log("\nAVALIAÇÕES");

  // O mesmo laço exibe os detalhes e reúne os dados usados no resumo.
  for (let posicao = 0; posicao < avaliacoes.length; posicao++) {
    const nota = avaliacoes[posicao];
    let classificacao;

    if (nota < 5) {
      classificacao = "Avaliação negativa";
      negativas++;
    } else if (nota <= 7) {
      classificacao = "Avaliação regular";
      regulares++;
    } else {
      classificacao = "Avaliação positiva";
      positivas++;
    }

    soma += nota;
    if (nota > maiorAvaliacao) maiorAvaliacao = nota;
    if (nota < menorAvaliacao) menorAvaliacao = nota;
    console.log(`Posição: ${posicao} | Nota: ${nota} | Classificação: ${classificacao}`);
  }

  const media = soma / avaliacoes.length;

  console.log("\nRESUMO DAS AVALIAÇÕES");
  console.log(`Quantidade de avaliações: ${avaliacoes.length}`);
  console.log(`Soma das avaliações: ${soma}`);
  console.log(`Média das avaliações: ${media.toFixed(2)}`);
  console.log(`Avaliações negativas: ${negativas}`);
  console.log(`Avaliações regulares: ${regulares}`);
  console.log(`Avaliações positivas: ${positivas}`);
  console.log(`Maior avaliação: ${maiorAvaliacao}`);
  console.log(`Menor avaliação: ${menorAvaliacao}`);
  rl.close();
}

main();
