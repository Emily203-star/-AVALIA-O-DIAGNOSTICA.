const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const perguntar = mensagem => new Promise(resolve => {
  rl.question(mensagem, resposta => resolve(resposta.trim()));
});

async function lerDownloads() {
  while (true) {
    const resposta = await perguntar("Quantidade de downloads [1500]: ");
    if (resposta === "") return 1500;
    const numero = Number(resposta);
    if (Number.isInteger(numero) && numero >= 0) return numero;
    console.log("Digite uma quantidade inteira maior ou igual a zero.");
  }
}

async function lerGratuito() {
  while (true) {
    console.log("\nO aplicativo é gratuito?");
    console.log("1 - Sim");
    console.log("2 - Não");

    const opcao = await perguntar("Escolha uma opção [1]: ");
    if (opcao === "" || opcao === "1") return true;
    if (opcao === "2") return false;
    console.log("Opção inválida. Digite 1 ou 2.");
  }
}

async function main() {
  console.log("\nQUESTÃO 5 - CADASTRO DE APLICATIVO\n");
  const aplicativo = {
    nome: await perguntar("Nome do aplicativo [Vida Pet]: ") || "Vida Pet",
    categoria: await perguntar("Categoria [Cuidados com animais]: ") || "Cuidados com animais",
    versao: await perguntar("Versão [1.0.0]: ") || "1.0.0",
    gratuito: await lerGratuito(),
    quantidadeDownloads: await lerDownloads()
  };

  const { nome, categoria, versao, gratuito, quantidadeDownloads } = aplicativo;
  const tipoAcesso = gratuito ? "Gratuito" : "Pago";
  let popularidade;

  if (quantidadeDownloads < 1000) {
    popularidade = "Pouco conhecido";
  } else if (quantidadeDownloads < 10000) {
    popularidade = "Em crescimento";
  } else {
    popularidade = "Popular";
  }

  console.log("\nDADOS DO APLICATIVO");
  console.log(`Aplicativo: ${nome}`);
  console.log(`Categoria: ${categoria}`);
  console.log(`Versão: ${versao}`);
  console.log(`Quantidade de downloads: ${quantidadeDownloads}`);
  console.log(`Tipo de acesso: ${tipoAcesso}`);
  console.log(`Classificação: ${popularidade}`);
  rl.close();
}

main();
