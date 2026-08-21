const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const perguntar = mensagem => new Promise(resolve => {
  rl.question(mensagem, resposta => resolve(resposta.trim()));
});

async function lerNivelInicial() {
  while (true) {
    const resposta = await perguntar(
      "Digite o nível inicial da bateria em porcentagem (1 a 100) [padrão: 100]: "
    );

    if (resposta === "") return 100;
    const nivel = Number(resposta.replace(",", "."));
    if (Number.isFinite(nivel) && nivel >= 1 && nivel <= 100) return nivel;
    console.log("Valor inválido. Digite um número entre 1 e 100.");
  }
}

async function lerConsumoPorCiclo() {
  while (true) {
    const resposta = await perguntar(
      "Digite o percentual consumido a cada ciclo [padrão: 15]: "
    );

    if (resposta === "") return 15;
    const consumo = Number(resposta.replace(",", "."));
    if (Number.isFinite(consumo) && consumo > 0) return consumo;
    console.log("Valor inválido. Digite um número maior que zero.");
  }
}

async function main() {
  console.log("\nQUESTÃO 3 - SIMULAÇÃO DO CONSUMO DE BATERIA\n");

  let nivelBateria = await lerNivelInicial();
  const consumoPorCiclo = await lerConsumoPorCiclo();

  console.log("\nRESULTADO DA SIMULAÇÃO");

  while (nivelBateria > 0) {
    // Math.max impede que o último ciclo deixe a bateria negativa.
    nivelBateria = Math.max(0, nivelBateria - consumoPorCiclo);
    console.log(`Nível da bateria: ${nivelBateria}%`);

    if (nivelBateria === 0) {
      console.log("Bateria descarregada.");
    } else if (nivelBateria <= 20) {
      console.log("Aviso: bateria baixa!");
    }
  }

  rl.close();
}

main();
