const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const perguntar = mensagem => new Promise(resolve => {
  rl.question(mensagem, resposta => resolve(resposta.trim()));
});

async function lerTexto(mensagem) {
  while (true) {
    const resposta = await perguntar(mensagem);
    if (resposta !== "") return resposta;
    console.log("Este campo é obrigatório.");
  }
}

async function lerNumero(mensagem, minimo, maximo) {
  while (true) {
    const resposta = await perguntar(mensagem);
    if (resposta === "") {
      console.log("Este campo é obrigatório.");
      continue;
    }

    const numero = Number(resposta.replace(",", "."));
    if (Number.isFinite(numero) && numero >= minimo && numero <= maximo) return numero;
    console.log(`Digite um valor entre ${minimo} e ${maximo}.`);
  }
}

function verificarSituacao(frequencia, media) {
  if (frequencia < 75) return "Reprovado por frequência";
  if (media >= 7) return "Aprovado";
  if (media >= 5) return "Recuperação";
  return "Reprovado por nota";
}

async function main() {
  console.log("\nQUESTÃO 2 - SITUAÇÃO ACADÊMICA\n");
  const nome = await lerTexto("Nome do aluno: ");
  const primeiraNota = await lerNumero("Primeira nota: ", 0, 10);
  const segundaNota = await lerNumero("Segunda nota: ", 0, 10);
  const frequencia = await lerNumero("Percentual de frequência: ", 0, 100);
  const media = (primeiraNota + segundaNota) / 2;
  const situacao = verificarSituacao(frequencia, media);

  console.log("\nRESULTADO ACADÊMICO");
  console.log(`Aluno: ${nome}`);
  console.log(`Primeira nota: ${primeiraNota.toFixed(1)}`);
  console.log(`Segunda nota: ${segundaNota.toFixed(1)}`);
  console.log(`Média: ${media.toFixed(2)}`);
  console.log(`Frequência: ${frequencia}%`);
  console.log(`Situação: ${situacao}`);
  rl.close();
}

main();
