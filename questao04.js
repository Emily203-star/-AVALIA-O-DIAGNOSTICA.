const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const perguntar = mensagem => new Promise(resolve => {
  rl.question(mensagem, resposta => resolve(resposta.trim()));
});

async function lerNumero(mensagem, minimo) {
  while (true) {
    const resposta = await perguntar(mensagem);
    if (resposta === "") {
      console.log("Este campo é obrigatório.");
      continue;
    }

    const numero = Number(resposta.replace(",", "."));
    if (Number.isFinite(numero) && numero >= minimo) return numero;
    console.log(`Digite um número maior ou igual a ${minimo}.`);
  }
}

function calcularInternetRestante(totalContratado, totalUtilizado) {
  return Math.max(0, totalContratado - totalUtilizado);
}

const classificarConsumo = (totalContratado, quantidadeRestante) => {
  const percentualRestante = (quantidadeRestante / totalContratado) * 100;

  // O caso de plano esgotado precisa ser testado antes das demais faixas.
  if (quantidadeRestante === 0) return "Plano esgotado";
  if (percentualRestante > 50) return "Consumo normal";
  if (percentualRestante >= 20) return "Atenção ao consumo";
  return "Limite próximo do fim";
};

async function main() {
  console.log("\nQUESTÃO 4 - CONTROLE DE CONSUMO DE INTERNET\n");
  const totalContratado = await lerNumero("Internet contratada em GB: ", 0.01);
  const totalUtilizado = await lerNumero("Internet utilizada em GB: ", 0);
  const quantidadeRestante = calcularInternetRestante(totalContratado, totalUtilizado);
  const percentualRestante = (quantidadeRestante / totalContratado) * 100;
  const situacao = classificarConsumo(totalContratado, quantidadeRestante);

  console.log("\nRESULTADO DO CONSUMO");
  console.log(`Internet contratada: ${totalContratado} GB`);
  console.log(`Internet utilizada: ${totalUtilizado} GB`);
  console.log(`Internet restante: ${quantidadeRestante} GB`);
  console.log(`Percentual restante: ${percentualRestante.toFixed(2)}%`);
  console.log(`Situação: ${situacao}`);
  rl.close();
}

main();
