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

async function lerNumero(mensagem, minimo = 0) {
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

async function lerQuantidade() {
  while (true) {
    const resposta = await perguntar(
      "Digite a quantidade comprada (somente número inteiro): "
    );
    if (resposta === "") {
      console.log("Este campo é obrigatório.");
      continue;
    }

    const quantidade = Number(resposta);
    if (Number.isInteger(quantidade) && quantidade >= 1) return quantidade;
    console.log("Digite uma quantidade inteira maior ou igual a 1.");
  }
}

async function lerFormaPagamento() {
  const formasPagamento = {
    1: "pix",
    2: "cartao",
    3: "dinheiro"
  };

  while (true) {
    console.log("\nFORMAS DE PAGAMENTO\n");
    console.log("1 - Pix\n2 - Cartão\n3 - Dinheiro\n");

    const opcao = await perguntar("Digite o número da opção: ");
    if (formasPagamento[opcao]) return formasPagamento[opcao];
    console.log("Opção inválida. Digite 1, 2 ou 3.");
  }
}

function calcularCompra(nomeProduto, precoUnitario, quantidade, formaPagamento) {
  const valorBruto = precoUnitario * quantidade;
  let percentualDesconto = 0;

  // Cada desconto é calculado sobre o valor bruto, permitindo o acúmulo.
  if (valorBruto >= 200) percentualDesconto += 10;
  if (formaPagamento === "pix") percentualDesconto += 5;

  const valorDesconto = valorBruto * (percentualDesconto / 100);
  return {
    nomeProduto,
    precoUnitario,
    quantidade,
    formaPagamento,
    valorBruto,
    percentualDesconto,
    valorDesconto,
    valorFinal: valorBruto - valorDesconto
  };
}

const moeda = valor => valor.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
});

async function main() {
  console.log("\nQUESTÃO 1 - CALCULADORA DE COMPRA\n");
  const nomeProduto = await lerTexto("Digite o nome do produto: ");
  const precoUnitario = await lerNumero(
    "Digite o preço unitário do produto em reais (exemplo: 49,90): R$ ",
    0.01
  );
  const quantidade = await lerQuantidade();
  const formaPagamento = await lerFormaPagamento();
  const compra = calcularCompra(nomeProduto, precoUnitario, quantidade, formaPagamento);

  console.log("\nRESULTADO DA COMPRA");
  console.log(`Produto: ${compra.nomeProduto}`);
  console.log(`Preço unitário: ${moeda(compra.precoUnitario)}`);
  console.log(`Quantidade: ${compra.quantidade}`);
  console.log(`Forma de pagamento: ${compra.formaPagamento}`);
  console.log(`Valor bruto: ${moeda(compra.valorBruto)}`);
  console.log(`Percentual de desconto: ${compra.percentualDesconto}%`);
  console.log(`Valor do desconto: ${moeda(compra.valorDesconto)}`);
  console.log(`Valor final: ${moeda(compra.valorFinal)}`);
  rl.close();
}

main();
