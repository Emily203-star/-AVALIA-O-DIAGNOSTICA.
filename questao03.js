const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const perguntar = mensagem => new Promise(resolve => {
  rl.question(mensagem, resposta => resolve(resposta.trim()));
});

async function lerNumero(mensagem, valorPadrao) {
  while (true) {
    const resposta = await perguntar(mensagem);
    if (resposta === "") return valorPadrao;
    const numero = Number(resposta.replace(",", "."));
    if (Number.isFinite(numero) && numero > 0) return numero;
    console.log("Digite um número maior que zero.");
  }
}

async function main() {
  console.log("\nQUESTÃO 3 - SIMULAÇÃO DO CONSUMO DE BATERIA\n");
  let nivelBateria = await lerNumero("Nível inicial da bateria [100]: ", 100);
  const consumoPorCiclo = await lerNumero("Consumo por ciclo [15]: ", 15);

  console.log("\nSIMULAÇÃO");
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
